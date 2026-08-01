// // services/customers.ts

// import type { Address } from "viem";

// import { parseCustomer, parseCustomers } from "./mappers/customer";

// import type { Customer } from "@/types/dashboard";

// // services/createCustomerKernel.ts

// import { createKernelAccount, createKernelAccountClient } from "@zerodev/sdk";

// import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";

// import { walletClientToSmartAccountSigner } from "permissionless";

// import { http, type PublicClient, type WalletClient } from "viem";

// import { EncryptedSession, encryptPrivateKey } from "@/utils/crypto";

// import {
//   entryPoint,
//   kernelVersion,
//   chain,
//   paymasterClient,
// } from "./kernel.client";

// import {
//     privateKeyToAccount,
//     generatePrivateKey,
// } from "viem/accounts";
// import { toECDSASigner } from "@zerodev/permissions/signers";
// import { deserializePermissionAccount, serializePermissionAccount, toInitConfig, toPermissionValidator } from "@zerodev/permissions";
// import { toSudoPolicy } from "@zerodev/permissions/policies";

// export interface CreateCustomerParams {
//   customerId: number;

//   merchantId: number;

//   wallet: Address;

//   smartAccount: Address;

//   displayName: string;

//   email: string;
// }

// /* -------------------------------------------------------------------------- */
// /* Create Customer                                                             */
// /* -------------------------------------------------------------------------- */

// export async function createCustomer(
//   params: CreateCustomerParams,
// ): Promise<void> {
//   const response = await fetch(
//     "/api/customers",

//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify(params),
//     },
//   );

//   const json = await response.json();

//   if (!response.ok) {
//     throw new Error(json.error ?? "Unable to create customer.");
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Get Customer By ID                                                          */
// /* -------------------------------------------------------------------------- */

// export async function getCustomerById(customerId: number): Promise<Customer> {
//   const response = await fetch(
//     `/api/customers?customerId=${customerId}`,

//     {
//       cache: "no-store",
//     },
//   );

//   const json = await response.json();

//   if (!response.ok) {
//     throw new Error(json.error ?? "Unable to load customer.");
//   }

//   return parseCustomer(json);
// }

// /* -------------------------------------------------------------------------- */
// /* Get Customer By Wallet                                                      */
// /* -------------------------------------------------------------------------- */

// export async function getCustomerByWallet(wallet: Address): Promise<Customer> {
//   const response = await fetch(
//     `/api/customers?wallet=${wallet}`,

//     {
//       cache: "no-store",
//     },
//   );

//   const json = await response.json();

//   if (!response.ok) {
//     throw new Error(json.error ?? "Unable to load customer.");
//   }

//   return parseCustomer(json);
// }

// /* -------------------------------------------------------------------------- */
// /* Get Customer By Smart Account                                               */
// /* -------------------------------------------------------------------------- */

// export async function getCustomerBySmartAccount(
//   smartAccount: Address,
// ): Promise<Customer> {
//   const response = await fetch(
//     `/api/customers?smartAccount=${smartAccount}`,

//     {
//       cache: "no-store",
//     },
//   );

//   const json = await response.json();

//   if (!response.ok) {
//     throw new Error(json.error ?? "Unable to load customer.");
//   }

//   return parseCustomer(json);
// }

// /* -------------------------------------------------------------------------- */
// /* Get All Customers                                                           */
// /* -------------------------------------------------------------------------- */

// export async function getCustomers(): Promise<Customer[]> {
//   const response = await fetch(
//     "/api/customers",

//     {
//       cache: "no-store",
//     },
//   );

//   const json = await response.json();

//   if (!response.ok) {
//     throw new Error(json.error ?? "Unable to load customers.");
//   }

//   return parseCustomers(json);
// }



// export interface CreateCustomerKernelParams {
//   ownerWalletClient: WalletClient;
//   publicClient: PublicClient;
// }


// export async function createCustomerKernel({
//   ownerWalletClient,
//   publicClient,
// }: CreateCustomerKernelParams) {

//      /*
//     --------------------------------------------------------------------------
//     Owner Signer
//     --------------------------------------------------------------------------
//     */

//     const ownerSigner = walletClientToSmartAccountSigner(
//         ownerWalletClient as any,
//     );

//     /*
//         --------------------------------------------------------------------------
//         Sudo Validator
//         --------------------------------------------------------------------------
//         */

//     const ownerValidator = await signerToEcdsaValidator(publicClient, {
//         signer: ownerSigner as any,

//         entryPoint,

//         kernelVersion,
//     });


//     const sessionPrivateKey =
//         generatePrivateKey();
    
//     const encryptedSession: EncryptedSession  =
//         encryptPrivateKey(
//             sessionPrivateKey,
//         );
    
//     let sessionKey =
//         privateKeyToAccount(sessionPrivateKey);

//     const sessionPublicAddress = sessionKey.address;

//     /*
//      * Session signer
//      */

//     const sessionSigner =
//         await toECDSASigner({
//             signer: sessionKey,
//         });


//     /*
//     * Permission validator
//     */

//     const permissionValidator =
//     await toPermissionValidator (
//         publicClient,
//         {
//             signer: sessionSigner,
//             entryPoint,
//             kernelVersion,
//             policies: [
//                 toSudoPolicy({}),
//             ],
//         },
//     );


    

 
//   /*
//     --------------------------------------------------------------------------
//     Kernel Account
//     --------------------------------------------------------------------------
//     */

//   const account = await createKernelAccount(
//         publicClient,
//         {
//             entryPoint,
//             kernelVersion,

//             plugins: {
//                 sudo: ownerValidator,
//             },

//             initConfig:
//                 await toInitConfig(
//                     permissionValidator,
//                 ),
//         },
//     );

//   /*
//     --------------------------------------------------------------------------
//     Kernel Client
//     --------------------------------------------------------------------------
//     */

//   const client = createKernelAccountClient({   // a client to 
//     account,
//     chain,
//     bundlerTransport: http(process.env.BUNDLER_RPC!),

//     paymaster: {
//       async getPaymasterData(userOperation) {
//         return paymasterClient.sponsorUserOperation({
//           userOperation,
//         });
//       },
//     },
//   });


//   const serializedPermissionAccount =
//     await serializePermissionAccount(
//         account,
//         undefined,
//         undefined,
//         undefined,
//         permissionValidator,
//     );


//     /*
//         * Recover serialized account to verify integrity.
//         */

//     // const recoveredAccount =
//     //     await deserializePermissionAccount(
//     //         publicClient,
//     //         entryPoint,
//     //         kernelVersion,
//     //         serializedPermissionAccount,
//     //         sessionSigner,
//     //     );


//     section("Creating Billing Permission");

//     const now =
//         new Date().toISOString();

//     const expiry =
//         new Date(
//             Date.now() + 365 * 24 * 60 * 60 * 1000,
//         ).toISOString();

//     /*
//      * -------------------------------------------------------------
//      * Persist permission.
//      * -------------------------------------------------------------
//      */



//     const { error } =
//         await supabase

//             .from("billing_permissions")

//             .insert({

//                 permission_id:
//                     ctx.permissionId,

//                 customer_id:
//                     ctx.customerId,

//                 session_public_key:
//                     ctx.sessionPublicKey,

//                 serialized_permission_account:
//                     serializedPermissionAccount,

//                 encrypted_session:
//                     encryptedSession,

//                 permission_expiry:
//                     expiry,

//                 revoked:
//                     false,

//                 created_at:
//                     now,

//                 updated_at:
//                     now,
//             });

//     if (error)
//         throw error;

//     success("Billing permission stored.");

    
//     interface DueSubscription {
    
//         subscription_id: number;
    
//         merchant_id: number;
    
//         plan_id: number;
    
//         customer_id: string;
    
//         smart_account: string;
    
//         permission_id: string | null;
    
//         status:
//             | "ACTIVE"
//             | "PAUSED"
//             | "CANCELLED";
    
//         next_billing_time: string;
    
//         last_charged_at: string | null;
    
//         cancelled_at: string | null;
    
//         created_at: string;
    
//         merchant: Merchant;
    
//         customer: Customer;
    
//         plan: BillingPlan;
    
//         permission: BillingPermission | null;
//     }
    

//     const encrypted =
//             subscription.permission!.encrypted_session;
    
//         const privateKey =
//             decryptPrivateKey(encrypted);
    
//             const signer =
//                     await toECDSASigner({
//                         signer: privateKeyToAccount(privateKey),
//                     });

//     await deserializePermissionAccount(
//         publicClient,
//         entryPoint,
//         kernelVersion,
//         subscription.permission!.serialized_permission_account,
//         signer,
//     );




//   /*
//     --------------------------------------------------------------------------
//     Return
//     --------------------------------------------------------------------------
//     */

//   return {
//     account,

//     client,

//     address: account.address,

//     ownerValidator,
//   };
// }

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


