"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import { toast } from "sonner";

import type {
  BillingPlan,
  Customer,
  DashboardStats,
  Merchant,
  Subscription,
} from "@/types/dashboard";

import type { WalletBalance } from "@/services/customerDashboard";

import {
  getCurrentCustomer,
  getFeaturedMerchants,
  getActiveSubscriptions,
  getMerchantPlans,
  getWalletBalances,
  subscribe,
} from "@/services/customerDashboard";
import { getCustomerByWallet } from "@/services/customer";

export function useCustomerDashboard() {
  const { address } = useAccount();

  const publicClient = usePublicClient();

  const { data: walletClient } = useWalletClient();

  /*
    --------------------------------------------------------------------------
    Loading State
    --------------------------------------------------------------------------
    */

  const [loading, setLoading] = useState(true);

  const [subscribing, setSubscribing] = useState(false);

  /*
    --------------------------------------------------------------------------
    Customer
    --------------------------------------------------------------------------
    */

  const [customer, setCustomer] = useState<Customer | null>(null);

  /*
    --------------------------------------------------------------------------
    Merchants
    --------------------------------------------------------------------------
    */

  const [merchants, setMerchants] = useState<Merchant[]>([]);

  /*
    --------------------------------------------------------------------------
    Active Subscriptions
    --------------------------------------------------------------------------
    */

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  /*
    --------------------------------------------------------------------------
    Merchant Plans
    --------------------------------------------------------------------------
    */

  const [merchantPlans, setMerchantPlans] = useState<
    Record<number, BillingPlan[]>
  >({});

  /*
    --------------------------------------------------------------------------
    Wallet Balances
    --------------------------------------------------------------------------
    */

  const [walletBalances, setWalletBalances] = useState<WalletBalance[]>([]);

  /*
    --------------------------------------------------------------------------
    UI State
    --------------------------------------------------------------------------
    */

  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null,
  );

  const [search, setSearch] = useState("");

  /*
    --------------------------------------------------------------------------
    Load Dashboard
    --------------------------------------------------------------------------
    */

  const refresh = useCallback(async () => {
    if (!address || !publicClient) {
      return;
    }

    try {
      setLoading(true);

      /*
                --------------------------------------------------------------
                Customer
                --------------------------------------------------------------
                */

      const currentCustomer = await getCustomerByWallet(address);

      console.log("currentCustomer: ", currentCustomer);

      if (!currentCustomer) {
        setCustomer(null);

        setMerchants([]);

        setSubscriptions([]);

        setMerchantPlans({});

        setWalletBalances([]);

        return;
      }

      console.log("currentCustomer received: ", currentCustomer);
      setCustomer(currentCustomer);

      /*
                --------------------------------------------------------------
                Merchants
                --------------------------------------------------------------
                */

     
      const merchantList = await getFeaturedMerchants();

      setMerchants(merchantList);

      /*
                --------------------------------------------------------------
                Customer Subscriptions
                --------------------------------------------------------------
                */

      const activeSubscriptions = await getActiveSubscriptions(
        currentCustomer.customerId,
      );

      setSubscriptions(activeSubscriptions);

      /*
                --------------------------------------------------------------
                Merchant Plans
                --------------------------------------------------------------
                */

      const plansByMerchant: Record<number, BillingPlan[]> = {};

      const allPlans: BillingPlan[] = [];

      await Promise.all(
        merchantList.map(async (merchant) => {
          const plans = await getMerchantPlans(merchant.merchantId);

          plansByMerchant[merchant.merchantId] = plans;

          allPlans.push(...plans);
        }),
      );

      setMerchantPlans(plansByMerchant);

      /*
                --------------------------------------------------------------
                Wallet Balances
                --------------------------------------------------------------
                */

      const balances = await getWalletBalances(
        address,

        allPlans,

        publicClient,
      );

      setWalletBalances(balances);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load customer dashboard.",

        {
          description: error instanceof Error ? error.message : undefined,
        },
      );
    } finally {
      setLoading(false);
    }
  }, [address, publicClient]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /*
    --------------------------------------------------------------------------
    Subscribe
    --------------------------------------------------------------------------
    */

  async function subscribeToPlan(plan: BillingPlan) {
    if (!walletClient || !publicClient || !customer) {
      toast.error("Connect your wallet first.");

      return;
    }

    console.log("plan@subscribeToPlan: ", plan);

    try {
      setSubscribing(true);

      await subscribe({
        walletClient,

        publicClient,

        customerId: customer.customerId,

        plan,
      });

      toast.success(
        "Subscription successfully created.",

        {
          description: `${plan.name} is now active.`,
        },
      );

      await refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Subscription failed.",

        {
          description: error instanceof Error ? error.message : undefined,
        },
      );
    } finally {
      setSubscribing(false);
    }
  }

  /*
    --------------------------------------------------------------------------
    Merchant Search
    --------------------------------------------------------------------------
    */

  const filteredMerchants = useMemo(() => {
    if (!search.trim()) {
      return merchants;
    }

    return merchants.filter((merchant) =>
      merchant.name

        .toLowerCase()

        .includes(search.toLowerCase()),
    );
  }, [merchants, search]);

  /*
    --------------------------------------------------------------------------
    Featured Merchants
    --------------------------------------------------------------------------
    */

  const featuredMerchants = useMemo(
    () =>
      merchants.slice(
        0,

        6,
      ),

    [merchants],
  );

  /*
    --------------------------------------------------------------------------
    Dashboard Statistics
    --------------------------------------------------------------------------
    */

  const dashboardStats: DashboardStats = useMemo(
    () => ({
      totalMerchants: featuredMerchants.length,

      totalPlans: Object.values(merchantPlans).reduce(
        (
          total,

          plans,
        ) => total + plans.length,

        0,
      ),

      activePlans: Object.values(merchantPlans)

        .flat()

        .filter((plan) => plan.status === "ACTIVE").length,

      totalCustomers: 1,

      totalSubscriptions: subscriptions.length,

      activeSubscriptions: subscriptions.filter(
        (subscription) => subscription.status === "ACTIVE",
      ).length,

      monthlyRevenue: 0,

      totalRevenue: 0,

      successfulBillings: 0,

      failedBillings: 0,
    }),

    [merchantPlans, subscriptions],
  );
  /*
    --------------------------------------------------------------------------
    Return
    --------------------------------------------------------------------------
    */

    console.log("Merchants:", merchants);
    console.log("Featured:", featuredMerchants);
    console.log("Plans:", merchantPlans);

  return {
    /*
        --------------------------------------------------------------
        State
        --------------------------------------------------------------
        */

    loading,

    subscribing,

    customer,

    /*
        --------------------------------------------------------------
        Dashboard
        --------------------------------------------------------------
        */

    dashboardStats,

    featuredMerchants,

    merchants: merchants,

    merchantPlans,

    subscriptions,

    walletBalances,

    /*
        --------------------------------------------------------------
        Selection
        --------------------------------------------------------------
        */

    selectedMerchant,

    setSelectedMerchant,

    /*
        --------------------------------------------------------------
        Search
        --------------------------------------------------------------
        */

    search,

    setSearch,

    /*
        --------------------------------------------------------------
        Actions
        --------------------------------------------------------------
        */

    subscribeToPlan,

    refresh,
  };
}
