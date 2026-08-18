import type { Address } from "viem";

////////////////////////////////////////////////////////////
// APPLICATION CONFIGURATION
////////////////////////////////////////////////////////////

export const appConfig = {
    name:
        "Stripe for Web3",

    // description:
    //     "Intelligent workflow automation for modern teams.",

    apiUrl:
        process.env.NEXT_PUBLIC_API_URL as string,

    billingContractAddress:
        process.env.NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS as Address
};

////////////////////////////////////////////////////////////
// CONFIGURATION VALIDATION
////////////////////////////////////////////////////////////

export function validateAppConfig() {
    if (!appConfig.apiUrl) {
        throw new Error(
            "API_URL is not configured.",
        );
    }

    if (
        !appConfig.billingContractAddress
    ) {
        throw new Error(
            "BILLING_CONTRACT_ADDRESS is not configured.",
        );
    }
}