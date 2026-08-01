// services/customers.ts

import type { Address } from "viem";

import { parseCustomer, parseCustomers } from "./mappers/customer";

import type { Customer } from "@/types/dashboard";

// services/createCustomerKernel.ts

import { createKernelAccount, createKernelAccountClient } from "@zerodev/sdk";

import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";

import { walletClientToSmartAccountSigner } from "permissionless";

import { http, type PublicClient, type WalletClient } from "viem";


import {
  entryPoint,
  kernelVersion,
  chain,
  paymasterClient,
} from "./kernel.client";

import {
    privateKeyToAccount,
    generatePrivateKey,
} from "viem/accounts";
import { toECDSASigner } from "@zerodev/permissions/signers";
import { deserializePermissionAccount, serializePermissionAccount, toInitConfig, toPermissionValidator } from "@zerodev/permissions";
import { toSudoPolicy } from "@zerodev/permissions/policies";

export interface CreateCustomerParams {
  wallet: Address;

  smartAccount: Address;

  displayName: string;

  email: string;

  sessionPrivateKey: Address;

  serializedPermissionAccount: string;

}

/* -------------------------------------------------------------------------- */
/* Create Customer                                                             */
/* -------------------------------------------------------------------------- */

export async function createCustomer(
  params: CreateCustomerParams,
): Promise<void> {
  const response = await fetch(
    "/api/customers",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(params),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "Unable to create customer.");
  }
}

/* -------------------------------------------------------------------------- */
/* Get Customer By ID                                                          */
/* -------------------------------------------------------------------------- */

export async function getCustomerById(customerId: number): Promise<Customer> {
  const response = await fetch(
    `/api/customers?customerId=${customerId}`,

    {
      cache: "no-store",
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "Unable to load customer.");
  }

  return parseCustomer(json);
}

/* -------------------------------------------------------------------------- */
/* Get Customer By Wallet                                                      */
/* -------------------------------------------------------------------------- */

export async function getCustomerByWallet(wallet: Address): Promise<Customer> {
  const response = await fetch(
    `/api/customers?wallet=${wallet}`,

    {
      cache: "no-store",
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "Unable to load customer.");
  }

  return parseCustomer(json);
}

/* -------------------------------------------------------------------------- */
/* Get Customer By Smart Account                                               */
/* -------------------------------------------------------------------------- */

export async function getCustomerBySmartAccount(
  smartAccount: Address,
): Promise<Customer> {
  const response = await fetch(
    `/api/customers?smartAccount=${smartAccount}`,

    {
      cache: "no-store",
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "Unable to load customer.");
  }

  return parseCustomer(json);
}

/* -------------------------------------------------------------------------- */
/* Get All Customers                                                           */
/* -------------------------------------------------------------------------- */

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(
    "/api/customers",

    {
      cache: "no-store",
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "Unable to load customers.");
  }

  return parseCustomers(json);
}




export interface CreateCustomerKernelParams {
  ownerWalletClient: WalletClient;
  publicClient: PublicClient;
}

export interface CustomerKernelRegistration {
    smartAccount: `0x${string}`;
    sessionPrivateKey: `0x${string}`;
    serializedPermissionAccount: string;
}

export async function createCustomerKernel({
    ownerWalletClient,
    publicClient,
}: CreateCustomerKernelParams): Promise<CustomerKernelRegistration> {

    const ownerSigner =
        walletClientToSmartAccountSigner(ownerWalletClient as any);

    const ownerValidator =
        await signerToEcdsaValidator(publicClient, {
            signer: ownerSigner as any,
            entryPoint,
            kernelVersion,
        });

    /*
     * Generate ONE random session key
     */

    const sessionPrivateKey = generatePrivateKey();

    const sessionAccount =
        privateKeyToAccount(sessionPrivateKey);

    const sessionSigner =
        await toECDSASigner({
            signer: sessionAccount,
        });

    const permissionValidator =
        await toPermissionValidator(publicClient, {
            signer: sessionSigner,
            entryPoint,
            kernelVersion,
            policies: [
                toSudoPolicy({}),
            ],
        });

    const kernel =
        await createKernelAccount(publicClient, {

            entryPoint,

            kernelVersion,

            plugins: {
                sudo: ownerValidator,
            },

            initConfig:
                await toInitConfig(permissionValidator),
        });

    const serializedPermissionAccount =
        await serializePermissionAccount(
            kernel,
            undefined,
            undefined,
            undefined,
            permissionValidator,
        );

    return {

        smartAccount: kernel.address,

        sessionPrivateKey: sessionPrivateKey,

        serializedPermissionAccount,
    };
}

// export async function getCustomerKernel(
//   walletClient: WalletClient,
//   publicClient: PublicClient,
// ) {
//   const [ownerWallet] = await walletClient.getAddresses();

//   const customer = await getCustomerByWallet(ownerWallet);

//   const kernel = await createCustomerKernel({
//     ownerWalletClient: walletClient,
//     publicClient,
//   });

//   if (kernel.address.toLowerCase() !== customer.smartAccount!.toLowerCase()) {
//     throw new Error("Connected wallet does not own this merchant.");
//   }

//   return {
//     customer,
//     kernel,
//   };
// }


