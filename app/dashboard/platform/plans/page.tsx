"use client";

import {
    Button,
} from "@/components/ui/button";

import {
    Container,
} from "@/components/layout/Container";

import {
    Divider,
} from "@/components/layout/Divider";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    Page,
} from "@/components/layout/Page";

import {
    PageHeader,
} from "@/components/layout/PageHeader";

import {
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    PlansOverview,
} from "@/components/dashboard/platform/plans/PlansOverview";

import {
    PlansPagination,
} from "@/components/dashboard/platform/plans/PlansPagination";

import {
    PlansTable,
} from "@/components/dashboard/platform/plans/PlansTable";

import {
    PlansToolbar,
} from "@/components/dashboard/platform/plans/PlansToolbar";

import {
    useMerchantPlansPage,
} from "@/hooks/pages/merchant/useMerchantPlansPage";


import Link from "next/link";
import { Plus } from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Label,
} from "@/components/ui/label";

import {
    Input,
} from "@/components/ui/input";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    useCreatePlan,
} from "@/hooks/usePlans";

import {
    useAccount,
    usePublicClient,
} from "wagmi";

import {
    getWalletBalance,
    type WalletBalance,
} from "@/services/token";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SUPPORTED_TOKENS: {
    label: string;
    symbol: string;
    address: string;
}[] = [

    {
        label:
            "USDC (Arbitrum Sepolia)",

        symbol:
            "USDC",

        address:
            "0xA6B0921999d8D862B87eaCb3DDA1eb8805a096cD",
    },

    {
        label:
            "Custom Token",

        symbol:
            "CUSTOM",

        address:
            "",
    },

];


const BILLING_PERIODS = [

    {
        value:
            "THREE_MINUTES",

        label:
            "3 Minutes (Testing)",

        seconds:
            180,
    },

    {
        value:
            "FIVE_MINUTES",

        label:
            "5 Minutes (Testing)",

        seconds:
            300,
    },

    {
        value:
            "DAILY",

        label:
            "Daily",

        seconds:
            86400,
    },

    {
        value:
            "WEEKLY",

        label:
            "Weekly",

        seconds:
            604800,
    },

    {
        value:
            "MONTHLY",

        label:
            "Monthly",

        seconds:
            2592000,
    },

    {
        value:
            "QUARTERLY",

        label:
            "Quarterly",

        seconds:
            7776000,
    },

    {
        value:
            "BIANNUAL",

        label:
            "Biannual",

        seconds:
            15552000,
    },

    {
        value:
            "ANNUAL",

        label:
            "Annual",

        seconds:
            31536000,
    },

];


const TRIAL_PERIODS = [

    {
        value:
            "NONE",

        label:
            "None",

        seconds:
            0,
    },

    {
        value:
            "THREE_MINUTES",

        label:
            "3 Minutes (Testing)",

        seconds:
            180,
    },

    {
        value:
            "FIVE_MINUTES",

        label:
            "5 Minutes (Testing)",

        seconds:
            300,
    },

    {
        value:
            "ONE_DAY",

        label:
            "1 Day",

        seconds:
            86400,
    },

    {
        value:
            "THREE_DAYS",

        label:
            "3 Days",

        seconds:
            259200,
    },

    {
        value:
            "SEVEN_DAYS",

        label:
            "7 Days",

        seconds:
            604800,
    },

    {
        value:
            "FOURTEEN_DAYS",

        label:
            "14 Days",

        seconds:
            1209600,
    },

    {
        value:
            "THIRTY_DAYS",

        label:
            "30 Days",

        seconds:
            2592000,
    },

];

function CreatePlanDialog({
    onCreated,
}: {
    onCreated?: () => void;
}) {

    const {
        address,
    } = useAccount();

    const publicClient =
        usePublicClient();

    const {
        createBillingPlan,
        error,
        loading,
    } = useCreatePlan();


    const [
        open,
        setOpen,
    ] = useState(false);


    const [
        name,
        setName,
    ] = useState("");


    const [
        selectedToken,
        setSelectedToken,
    ] = useState(
        SUPPORTED_TOKENS[0].address,
    );


    const [
        paymentToken,
        setPaymentToken,
    ] = useState(
        SUPPORTED_TOKENS[0].address,
    );


    const [
        walletBalance,
        setWalletBalance,
    ] = useState<
        WalletBalance | null
    >(null);


    const [
        tokenLoading,
        setTokenLoading,
    ] = useState(false);


    const [
        tokenError,
        setTokenError,
    ] = useState("");


    const [
        amount,
        setAmount,
    ] = useState("");


    const [
        billingPeriodNamed,
        setBillingPeriodNamed,
    ] = useState(
        "MONTHLY",
    );


    const [
        trialPeriodNamed,
        setTrialPeriodNamed,
    ] = useState(
        "NONE",
    );


    const [
        maxSubscribers,
        setMaxSubscribers,
    ] = useState("");


    const [
        metadataURI,
        setMetadataURI,
    ] = useState("");


    ////////////////////////////////////////////////////////////
    // TOKEN VERIFICATION
    ////////////////////////////////////////////////////////////

    useEffect(() => {

        let cancelled = false;


        async function loadToken() {

            if (
                !address ||
                !publicClient ||
                !paymentToken
            ) {
                setWalletBalance(null);
                return;
            }


            try {

                setTokenLoading(true);

                setTokenError("");

                const balance =
                    await getWalletBalance(
                        address,

                        paymentToken as `0x${string}`,

                        publicClient,
                    );


                if (!cancelled) {

                    setWalletBalance(
                        balance,
                    );

                }

            } catch {

                if (!cancelled) {

                    setWalletBalance(null);

                    setTokenError(
                        "Invalid ERC20 token.",
                    );

                }

            } finally {

                if (!cancelled) {

                    setTokenLoading(
                        false,
                    );

                }

            }

        }


        void loadToken();


        return () => {

            cancelled = true;

        };

    }, [
        address,
        paymentToken,
        publicClient,
    ]);


    ////////////////////////////////////////////////////////////
    // TOKEN SELECTION
    ////////////////////////////////////////////////////////////

    function handleTokenChange(
        value: string,
    ) {

        setSelectedToken(value);

        setPaymentToken(value);

        setWalletBalance(null);

        setTokenError("");

    }


    ////////////////////////////////////////////////////////////
    // CREATE
    ////////////////////////////////////////////////////////////

    async function handleSubmit(
        event:
            React.FormEvent<HTMLFormElement>,
    ) {

        event.preventDefault();


        const billingPeriod =
            BILLING_PERIODS.find(
                (period) =>
                    period.value ===
                    billingPeriodNamed,
            );


        const trialPeriod =
            TRIAL_PERIODS.find(
                (period) =>
                    period.value ===
                    trialPeriodNamed,
            );


        if (!billingPeriod) {

            return;

        }


        if (!trialPeriod) {

            return;

        }


        if (!paymentToken) {

            setTokenError(
                "Enter an ERC20 payment token.",
            );

            return;

        }


        if (!walletBalance) {

            setTokenError(
                "Verify the payment token before creating the plan.",
            );

            return;

        }


        try {

            await createBillingPlan({

                name:
                    name.trim(),

                paymentToken:
                    paymentToken as `0x${string}`,

                amount:
                    BigInt(amount),

                billingInterval:
                    BigInt(
                        billingPeriod.seconds,
                    ),

                trialPeriod:
                    BigInt(
                        trialPeriod.seconds,
                    ),

                billingPeriodNamed:
                    billingPeriod.value,

                trialPeriodNamed:
                    trialPeriod.value,

                maxSubscribers:
                    maxSubscribers === ""
                        ? null
                        : Number(
                            maxSubscribers,
                        ),

                metadataURI:
                    metadataURI.trim(),

            });


            setOpen(false);

            resetForm();

            onCreated?.();

        } catch (cause) {

            console.error(
                "Unable to create billing plan:",
                cause,
            );

        }

    }


    ////////////////////////////////////////////////////////////
    // RESET
    ////////////////////////////////////////////////////////////

    function resetForm() {

        setName("");

        setSelectedToken(
            SUPPORTED_TOKENS[0].address,
        );

        setPaymentToken(
            SUPPORTED_TOKENS[0].address,
        );

        setWalletBalance(null);

        setTokenError("");

        setAmount("");

        setBillingPeriodNamed(
            "MONTHLY",
        );

        setTrialPeriodNamed(
            "NONE",
        );

        setMaxSubscribers("");

        setMetadataURI("");

    }


    ////////////////////////////////////////////////////////////
    // DIALOG
    ////////////////////////////////////////////////////////////

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {

                setOpen(value);

                if (!value && !loading) {
                    resetForm();
                }

            }}
        >

            <DialogTrigger
                render={
                    <Button>
                        <Plus />
                        Create plan
                    </Button>
                }
            />

            <DialogContent
                className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
            >

                <DialogHeader>

                    <DialogTitle>
                        Create billing plan
                    </DialogTitle>

                    <DialogDescription>
                        Configure a recurring billing plan
                        for your customers.
                    </DialogDescription>

                </DialogHeader>


                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-6"
                >

                    {/* ================================================== */}
                    {/* PLAN DETAILS */}
                    {/* ================================================== */}

                    <section className="grid gap-5 md:grid-cols-2">

                        {/* NAME */}

                        <div className="space-y-2">

                            <Label htmlFor="plan-name">
                                Plan name
                            </Label>

                            <Input
                                id="plan-name"
                                required
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value,
                                    )
                                }
                                placeholder="Premium Plan"
                                disabled={loading}
                            />

                        </div>


                        {/* PAYMENT TOKEN */}

                        <div className="space-y-2">

                            <Label htmlFor="plan-token">
                                Payment token
                            </Label>

                            <select
                                id="plan-token"
                                value={
                                    selectedToken
                                }
                                onChange={(event) =>
                                    handleTokenChange(
                                        event.target.value,
                                    )
                                }
                                disabled={loading}
                                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                            >

                                {SUPPORTED_TOKENS.map(
                                    (token) => (
                                        <option
                                            key={
                                                token.label
                                            }
                                            value={
                                                token.address
                                            }
                                        >
                                            {
                                                token.label
                                            }
                                        </option>
                                    ),
                                )}

                            </select>

                        </div>


                        {/* CUSTOM TOKEN */}

                        {selectedToken === "" && (

                            <div className="space-y-2 md:col-span-2">

                                <Label htmlFor="custom-token">
                                    ERC20 contract address
                                </Label>

                                <Input
                                    id="custom-token"
                                    required
                                    value={
                                        paymentToken
                                    }
                                    onChange={(event) => {

                                        setPaymentToken(
                                            event.target.value,
                                        );

                                        setWalletBalance(
                                            null,
                                        );

                                        setTokenError("");

                                    }}
                                    placeholder="0x..."
                                    className="font-mono text-xs"
                                    disabled={loading}
                                />

                            </div>

                        )}


                        {/* TOKEN STATUS */}

                        {tokenLoading && (

                            <div className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground md:col-span-2">

                                Verifying payment token...

                            </div>

                        )}


                        {walletBalance && (

                            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 md:col-span-2">

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <p className="text-sm font-medium">

                                            {
                                                walletBalance.symbol
                                            }

                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">

                                            Decimals:{" "}
                                            {
                                                walletBalance.decimals
                                            }

                                        </p>

                                    </div>


                                    <div className="text-right">

                                        <p className="text-xs text-muted-foreground">

                                            Wallet balance

                                        </p>

                                        <p className="mt-1 font-mono text-sm font-medium">

                                            {
                                                walletBalance.formatted
                                            }

                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}


                        {tokenError && (

                            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive md:col-span-2">

                                {
                                    tokenError
                                }

                            </div>

                        )}


                        {/* AMOUNT */}

                        <div className="space-y-2">

                            <Label htmlFor="plan-amount">
                                Amount
                            </Label>

                            <Input
                                id="plan-amount"
                                required
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(
                                        event.target.value,
                                    )
                                }
                                placeholder="10"
                                disabled={loading}
                            />

                        </div>


                        {/* BILLING PERIOD */}

                        <div className="space-y-2">

                            <Label htmlFor="billing-period">
                                Billing frequency
                            </Label>

                            <select
                                id="billing-period"
                                value={
                                    billingPeriodNamed
                                }
                                onChange={(event) =>
                                    setBillingPeriodNamed(
                                        event.target.value,
                                    )
                                }
                                disabled={loading}
                                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                            >

                                {BILLING_PERIODS.map(
                                    (period) => (
                                        <option
                                            key={
                                                period.value
                                            }
                                            value={
                                                period.value
                                            }
                                        >
                                            {
                                                period.label
                                            }
                                        </option>
                                    ),
                                )}

                            </select>

                        </div>

                    </section>


                    {/* ================================================== */}
                    {/* OPTIONAL CONFIGURATION */}
                    {/* ================================================== */}

                    <section className="grid gap-5 md:grid-cols-2">

                        {/* TRIAL */}

                        <div className="space-y-2">

                            <Label htmlFor="trial-period">
                                Trial period
                            </Label>

                            <select
                                id="trial-period"
                                value={
                                    trialPeriodNamed
                                }
                                onChange={(event) =>
                                    setTrialPeriodNamed(
                                        event.target.value,
                                    )
                                }
                                disabled={loading}
                                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3px focus-visible:ring-ring/50"
                            >

                                {TRIAL_PERIODS.map(
                                    (period) => (
                                        <option
                                            key={
                                                period.value
                                            }
                                            value={
                                                period.value
                                            }
                                        >
                                            {
                                                period.label
                                            }
                                        </option>
                                    ),
                                )}

                            </select>

                        </div>


                        {/* MAX SUBSCRIBERS */}

                        <div className="space-y-2">

                            <Label htmlFor="max-subscribers">
                                Maximum subscribers
                            </Label>

                            <Input
                                id="max-subscribers"
                                type="number"
                                min="0"
                                value={
                                    maxSubscribers
                                }
                                onChange={(event) =>
                                    setMaxSubscribers(
                                        event.target.value,
                                    )
                                }
                                placeholder="Unlimited"
                                disabled={loading}
                            />

                        </div>


                        {/* METADATA */}

                        <div className="space-y-2 md:col-span-2">

                            <Label htmlFor="plan-metadata">
                                Metadata URI
                            </Label>

                            <Textarea
                                id="plan-metadata"
                                value={
                                    metadataURI
                                }
                                onChange={(event) =>
                                    setMetadataURI(
                                        event.target.value,
                                    )
                                }
                                placeholder="ipfs://..."
                                className="font-mono text-xs"
                                disabled={loading}
                            />

                        </div>

                    </section>


                    {/* ================================================== */}
                    {/* ACTIONS */}
                    {/* ================================================== */}

                    <DialogFooter>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setOpen(false)
                            }
                            disabled={loading}
                        >
                            Cancel
                        </Button>


                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                tokenLoading ||
                                !walletBalance ||
                                !name.trim() ||
                                !amount
                            }
                        >

                            {loading
                                ? "Creating plan..."
                                : "Create plan"}

                        </Button>

                    </DialogFooter>


                    {/* MUTATION ERROR */}

                    {error && (

                        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">

                            {
                                error.message
                            }

                        </div>

                    )}

                </form>

            </DialogContent>

        </Dialog>
    );
}

function PlansLoadingState() {
    return (
        <div className="space-y-4">

            {Array.from({
                length: 4,
            }).map((_, index) => (
                <div
                    key={index}
                    className="h-16 animate-pulse rounded-xl bg-muted"
                />
            ))}

        </div>
    );
}

function PlansErrorState({
    error,
    onRetry,
}: {
    error: Error;
    onRetry: () => void;
}) {
    return (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">

            <p className="font-medium">
                Unable to load plans
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
                {error.message}
            </p>

            <Button
                variant="outline"
                className="mt-4"
                onClick={onRetry}
            >
                Try again
            </Button>

        </div>
    );
}

export default function PlansPage() {
    const page =
        useMerchantPlansPage();

    console.log("Page GRACIOUSLY arrived at");

    ////////////////////////////////////////////////////////////
    // MERCHANT ACCOUNT STATES
    ////////////////////////////////////////////////////////////

    if (
        page.merchant.status ===
            "disconnected" ||
        page.merchant.status ===
            "waiting" ||
        page.merchant.status ===
            "loading"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PlansLoadingState />
                </Container>
            </Page>
        );
    }

    // GRACIOUS TODO: Disconnecting a  wallet..
    // 1. In the midst of onboarding, should result in the onboarding process halted(returned to user form so as to connect back to browser wallet)
    // 2. While in the dashboard, disconnecting the wallet, should cause the respective dashboard's page return its corresponding skeleton (for a fixed sufficiently short time) then a "Wallet Disconnected" error message ui

    // GRACIOUS TODO: 
    // There are yet sonner toast-messages to be included in every page for every response, 
    // GRACIOUS TODO: Graced Error handling

    // GRACIOUS TODO: A gracious todo involves including a chat feature into the app(rooms are identified by plan), the chat rooms are also monitored, for support across merchants, customers and the protocol, in-app chats are also considered.

    if (
        page.merchant.status ===
        "error"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">

                    <PlansErrorState
                        error={
                            page.merchant.error ??
                            new Error(
                                "Unable to load merchant.",
                            )
                        }
                        onRetry={
                            page.merchant.refresh
                        }
                    />

                </Container>
            </Page>
        );
    }

    if (
        page.merchant.status ===
        "not-created"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">

                    <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                        <p className="text-lg font-semibold">
                            Merchant account not found
                        </p>

                        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                            The connected wallet does not currently have a merchant record.
                        </p>

                        <Button
                            className="mt-5"
                            render={
                                <Link href="/merchant/onboarding">
                                    Complete onboarding
                                </Link>
                            }
                        />

                    </div>

                </Container>
            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // PAGE
    ////////////////////////////////////////////////////////////

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Plans"
                        title="Plans"
                        description={
                            `Create and manage the billing plans ${
                                page.merchant.data?.name ??
                                "your merchant"
                            } offers to customers.`
                        }
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    disabled
                                >
                                    Export
                                </Button>

                                <CreatePlanDialog
                                    onCreated={() => {
                                        void page.plans.refresh();
                                    }}
                                />

                            </Inline>
                        }             
                    />

                    <Divider />

                    <PlansOverview
                        summary={
                            page.summary
                        }
                    />

                    <Section
                        title="Plan management"
                        description="Search, filter, and manage the plans available to your customers."
                    >

                        <Stack gap={4}>

                            <PlansToolbar
                                search={
                                    page.filters.search
                                }

                                status={
                                    page.filters.status
                                }

                                interval={
                                    page.filters.interval
                                }

                                refreshing={
                                    page.plans.refreshing
                                }

                                onSearchChange={
                                    page.filters.setSearch
                                }

                                onStatusChange={
                                    page.filters.setStatus
                                }

                                onIntervalChange={
                                    page.filters.setInterval
                                }

                                onRefresh={
                                    () =>
                                        void page.plans.refresh()
                                }
                            />

                            {page.plans.loading &&
                            page.plans.data.length ===
                                0 ? (
                                <PlansLoadingState />
                            ) : page.plans.error &&
                              page.plans.data.length ===
                                0 ? (
                                <PlansErrorState
                                    error={
                                        page.plans.error
                                    }
                                    onRetry={
                                        page.plans.refresh
                                    }
                                />
                            ) : page.plans.filteredCount ===
                              0 ? (
                                <div className="rounded-xl border border-dashed bg-card p-10 text-center">

                                    <p className="font-medium">
                                        No plans match your filters
                                    </p>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Try changing your search or filters.
                                    </p>

                                </div>
                            ) : (
                                <>
                                    <PlansTable
                                        plans={page.plans.data}

                                        onPause={
                                            page.planActions.pause
                                        }

                                        onActivate={
                                            page.planActions.activate
                                        }

                                        onArchive={
                                            page.planActions.archive
                                        }
                                    />

                                    <PlansPagination
                                        total={
                                            page.plans.filteredCount
                                        }

                                        page={
                                            page.filters.page
                                        }

                                        pageSize={
                                            page.filters.pageSize
                                        }

                                        onPageChange={
                                            page.filters.setPage
                                        }
                                    />
                                </>
                            )}

                        </Stack>

                    </Section>

                    {page.plans.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing plans...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}