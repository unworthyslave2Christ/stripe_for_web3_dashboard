import Link from "next/link";

import { Activity, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import type { CustomerTransactionRecord } from "@/types/customer-transaction";

export function CustomerTransactionHighlight({
  transaction,
}: {
  transaction: CustomerTransactionRecord | null;
}) {
  if (!transaction) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Activity className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">No recent transactions</p>

              <p className="mt-1 text-xs text-muted-foreground">
                No Smart Account transaction is currently available.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardContent className="p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Activity className="size-5 text-primary" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">Latest transaction</p>

                {transaction.status === "SUCCESS" && (
                  <Badge variant="secondary">
                    <CheckCircle2 />
                    Successful
                  </Badge>
                )}
              </div>

              <p className="mt-1 text-lg font-semibold">{transaction.title}</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {transaction.timestamp}
              </p>
            </div>
          </div>

          <div className="text-left lg:text-right">
            {transaction.amount && transaction.currency ? (
              <p className="text-2xl font-semibold">
                {transaction.amount} {transaction.currency}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">No asset amount</p>
            )}

            {transaction.explorerUrl && (
              <Button
                render={
                  <a
                    href={transaction.explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View transaction
                    <ArrowUpRight />
                  </a>
                }
                variant="outline"
                size="sm"
                className="mt-2"
              />
            )}

            {!transaction.explorerUrl && transaction.subscriptionId && (
              <Button
                render={
                  <Link
                    href={`/portal/subscriptions/${transaction.subscriptionId}`}
                  >
                    View subscription
                    <ArrowUpRight />
                  </Link>
                }
                variant="outline"
                size="sm"
                className="mt-2"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
