<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

PHASE A — PUBLIC
│
├── Landing
├── Get Started
├── Merchant onboarding
└── Customer onboarding

PHASE B — MERCHANT
│
├── Pages 01–15
└── completed

PHASE C — CUSTOMER
│
├── Pages 16–23
└── completed

PHASE D — ARCHITECTURE
│
├── Domain
├── Application
├── Repository
├── Infrastructure services
├── API
└── UI/API client boundaries

PHASE E — INTEGRATION
│
├── real merchant data
├── real customer data
├── real subscriptions
├── real billing
├── permissions
├── webhooks
├── notifications
└── activity

PHASE F — PRODUCTION HARDENING
│
├── authentication
├── authorization
├── API keys
├── rate limits
├── validation
├── audit logging
├── error model
└── observability

1. Get this public/onboarding UI rendering cleanly
2. Establish application/domain/infrastructure boundaries
3. Move current API calls behind those boundaries
4. Connect real merchant/customer data
5. Connect real subscription/billing/permission flows
6. Replace placeholders progressively


The API should primarily handle:

HTTP
authentication
authorization
request validation
response serialization
status codes

It should then call the existing business/application logic.

So:

POST /api/v1/customers
        ↓
validate HTTP input
        ↓
register customer use case
        ↓
backend business logic
        ↓
response

The API itself should not become the business logic.


PHASE A — PUBLIC
│
├── Landing
├── Get Started
├── Merchant onboarding
└── Customer onboarding
        ✓

PHASE B — MERCHANT UI
│
└── Pages 01–15
        ✓

PHASE C — CUSTOMER UI
│
└── Pages 16–23
        ✓

PHASE D — FRONTEND INTEGRATION ARCHITECTURE
│
├── SDK adapters
├── API adapters
├── shared types
├── hooks
├── authentication/session boundary
├── loading/error normalization
└── server/client boundaries

PHASE E — INTEGRATION
│
├── Merchant onboarding → existing API
├── Customer onboarding → existing API/SDK
├── Customer lookup → getByWallet
├── Merchant data
├── Customer data
├── Plans
├── Subscriptions
├── Billing
├── Permissions
├── Webhooks
├── Notifications
└── Activity

PHASE F — BACKEND ARCHITECTURE REFINEMENT
│
├── Domain
├── Application
├── Repository
├── Infrastructure
└── API transport

PHASE G — PRODUCTION HARDENING
│
├── Authentication
├── Authorization
├── API keys
├── Rate limiting
├── Validation
├── Audit logging
├── Error model
└── Observability