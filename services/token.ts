// services/token.ts

"use client";

import {
  erc20Abi,
  formatUnits,
  parseUnits,
  type Address,
  type PublicClient,
  type WalletClient,
} from "viem";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface TokenMetadata {
  token: Address;

  symbol: string;

  decimals: number;
}

export interface WalletBalance extends TokenMetadata {
  balance: bigint;

  formatted: string;
}

export interface ApproveTokenParams {
  walletClient: WalletClient;

  publicClient: PublicClient;

  token: Address;

  owner: Address;

  spender: Address;

  amount: bigint;
}

export interface WalletBalanceParams {
  wallet: Address;

  tokens: Address[];

  publicClient: PublicClient;
}

/* -------------------------------------------------------------------------- */
/* Approve Token If Needed                                                     */
/* -------------------------------------------------------------------------- */

export async function approveTokenIfNeeded({
  walletClient,

  publicClient,

  token,

  owner,

  spender,

  amount,
}: ApproveTokenParams): Promise<void> {
  /*
    --------------------------------------------------------------------------
    Current Allowance
    --------------------------------------------------------------------------
    */

  const allowance = await publicClient.readContract({
    address: token,

    abi: erc20Abi,

    functionName: "allowance",

    args: [owner, spender],
  });

  /*
    --------------------------------------------------------------------------
    Already Approved
    --------------------------------------------------------------------------
    */

  if (allowance >= amount) {
    return;
  }

  /*
    --------------------------------------------------------------------------
    Approve
    --------------------------------------------------------------------------
    */

  const { request } = await publicClient.simulateContract({
    account: walletClient.account!,

    address: token,

    abi: erc20Abi,

    functionName: "approve",

    args: [spender, amount],
  });

  const hash = await walletClient.writeContract(request);
  /*
    --------------------------------------------------------------------------
    Wait For Confirmation
    --------------------------------------------------------------------------
    */

  await publicClient.waitForTransactionReceipt({
    hash,
  });
}

/* -------------------------------------------------------------------------- */
/* Token Metadata                                                              */
/* -------------------------------------------------------------------------- */

export async function getTokenMetadata(
  token: Address,

  publicClient: PublicClient,
): Promise<TokenMetadata> {
  /*
    --------------------------------------------------------------------------
    Read Symbol
    --------------------------------------------------------------------------
    */

  const symbol = await publicClient.readContract({
    address: token,

    abi: erc20Abi,

    functionName: "symbol",
  });

  /*
    --------------------------------------------------------------------------
    Read Decimals
    --------------------------------------------------------------------------
    */

  const decimals = await publicClient.readContract({
    address: token,

    abi: erc20Abi,

    functionName: "decimals",
  });

  return {
    token,

    symbol,

    decimals,
  };
}

/* -------------------------------------------------------------------------- */
/* Single Wallet Balance                                                       */
/* -------------------------------------------------------------------------- */

export async function getWalletBalance(
  wallet: Address,

  token: Address,

  publicClient: PublicClient,
): Promise<WalletBalance> {
  const metadata = await getTokenMetadata(
    token,

    publicClient,
  );

  const balance = await publicClient.readContract({
    address: token,

    abi: erc20Abi,

    functionName: "balanceOf",

    args: [wallet],
  });

  return {
    ...metadata,

    balance,

    formatted: formatUnits(
      balance,

      metadata.decimals,
    ),
  };
}

/* -------------------------------------------------------------------------- */
/* Multiple Wallet Balances                                                    */
/* -------------------------------------------------------------------------- */

export async function getWalletBalances({
  wallet,

  tokens,

  publicClient,
}: WalletBalanceParams): Promise<WalletBalance[]> {
  /*
    --------------------------------------------------------------------------
    Remove duplicate token addresses
    --------------------------------------------------------------------------
    */

  const uniqueTokens = [
    ...new Set(tokens.map((token) => token.toLowerCase())),
  ] as Address[];

  /*
    --------------------------------------------------------------------------
    Read balances concurrently
    --------------------------------------------------------------------------
    */

  const balances = await Promise.all(
    uniqueTokens.map((token) =>
      getWalletBalance(
        wallet,

        token,

        publicClient,
      ),
    ),
  );

  /*
    --------------------------------------------------------------------------
    Highest balance first
    --------------------------------------------------------------------------
    */

  balances.sort((a, b) => Number(b.balance - a.balance));

  return balances;
}

/* -------------------------------------------------------------------------- */
/* Utility                                                                     */
/* -------------------------------------------------------------------------- */

export function toTokenAmount(
  amount: string | number,

  decimals: number,
): bigint {
  return parseUnits(
    amount.toString(),

    decimals,
  );
}
