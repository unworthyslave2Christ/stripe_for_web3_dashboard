GET /api/v1/health

GET /api/v1/auth/challenge

POST /api/v1/auth/register

POST /api/v1/auth/login

POST /api/v1/auth/login

GET /api/v1/auth/session

GET /api/v1/auth/api-keys

DELETE /api/v1/auth/api-keys/{keyId}

POST /api/v1/merchants

GET /api/v1/merchants

GET /api/v1/merchants/me

GET /api/v1/merchants/{merchantId}

PATCH /api/v1/merchants/{merchantId}

DELETE /api/v1/merchants/{merchantId}

GET /api/v1/merchants/wallet/{wallet}

POST /api/v1/customers

GET /api/v1/customers

GET /api/v1/customers/me

GET    /api/v1/customers/{customerId}

PATCH /api/v1/customers/{customerId}

DELETE /api/v1/customers/{customerId}

GET /api/v1/customers/wallet/{wallet}

POST /api/v1/plans

GET /api/v1/plans

GET    /api/v1/plans/{planId}

PATCH /api/v1/plans/{planId}

DELETE /api/v1/plans/{planId}

GET /api/v1/plans/merchant/{merchantId}

POST /api/v1/plans/{planId}/pause

POST /api/v1/plans/{planId}/resume

POST /api/v1/plans/{planId}/archive

POST /api/v1/subscriptions

GET  /api/v1/subscriptions

GET    /api/v1/subscriptions/{subscriptionId}

PATCH  /api/v1/subscriptions/{subscriptionId}

DELETE /api/v1/subscriptions/{subscriptionId}

GET /api/v1/subscriptions/customer/{customerId}

GET /api/v1/subscriptions/merchant/{merchantId}

POST /api/v1/subscriptions/{subscriptionId}/pause

POST /api/v1/subscriptions/{subscriptionId}/resume

POST /api/v1/subscriptions/{subscriptionId}/cancel

POST /api/v1/permissions

GET  /api/v1/permissions

GET    /api/v1/permissions/{permissionId}

PATCH  /api/v1/permissions/{permissionId}

DELETE /api/v1/permissions/{permissionId}

POST /api/v1/user-operations

GET  /api/v1/user-operations

GET /api/v1/user-operations/{userOperationId}

GET /api/v1/user-operations/hash/{userOperationHash}

POST /api/v1/user-operations/{userOperationId}/retry

POST /api/v1/billing/run

POST /api/v1/billing/{subscriptionId}/charge

GET /api/v1/billing/logs

GET /api/v1/billing/logs/{billingLogId}

GET /api/v1/billing/subscription/{subscriptionId}

POST /api/v1/webhooks

GET  /api/v1/webhooks

GET    /api/v1/webhooks/{webhookId}

PATCH /api/v1/webhooks/{webhookId}

DELETE /api/v1/webhooks/{webhookId}

POST /api/v1/webhooks/{webhookId}/test

GET /api/v1/events

GET /api/v1/events/{eventId}

GET /api/v1/events/type/{eventType}

GET /api/v1/events/resource/{resourceType}/{resourceId}

POST /api/v1/events/replay

GET /api/v1/analytics/overview

GET /api/v1/analytics/revenue?from=2026-01-01&to=2026-12-31

GET /api/v1/analytics/subscriptions

GET /api/v1/analytics/customers

GET /api/v1/analytics/plans

POST /api/v1/reports

GET /api/v1/reports

GET    /api/v1/reports/{reportId}

DELETE /api/v1/reports/{reportId}

GET /api/v1/reports/{reportId}/download

POST /api/v1/reports/{reportId}/regenerate

POST /api/v1/notifications

GET  /api/v1/notifications

GET /api/v1/notifications/{notificationId}

POST /api/v1/notifications/{notificationId}/retry

POST /api/v1/notifications/{notificationId}/cancel

GET /api/v1/notifications/recipient/{recipientType}/{recipientId}

GET /api/v1/admin/health

GET /api/v1/admin/system

GET /api/v1/admin/stats

GET /api/v1/admin/workers

POST /api/v1/admin/workers/{workerId}/restart

GET /api/v1/admin/queues

POST /api/v1/admin/queues/{queueName}/flush