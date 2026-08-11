
[See article:](https://medium.com/@righteousnessbyfaithinjesus/i-wanted-stripe-for-web3-so-i-started-building-it-42445e9ddabc)

# Stripe for Web3 Dashboard

Merchant dashboard for managing decentralized recurring subscriptions powered by Account Abstraction.

The dashboard provides an experience similar to Stripe while interacting entirely with on-chain subscription infrastructure.

---

## Features

### Merchant Dashboard

- Merchant overview
- Revenue statistics
- Billing analytics
- Worker status

---

### Billing Plans

- Create plans
- Edit plans
- View plans
- Pause plans
- Archive plans
- View subscribers

---

### Customers

- Customer directory
- Active subscriptions
- Billing status
- Subscription history

---

### Billing Activity

- Successful billings
- Failed billings
- Retry history
- Worker activity

---

## Tech Stack

Frontend

- Next.js
- React
- TypeScript
- TailwindCSS

Blockchain

- Viem
- Wagmi
- RainbowKit
- ERC-4337

Backend

- Supabase
- PostgreSQL

Authentication

- Wallet Authentication

---

## Project Structure


app/

dashboard/

merchant/

plans/

customers/

components/

hooks/

lib/

types/



---

## Main Pages

Dashboard

/dashboard/merchant/home


Plans

/dashboard/merchant/plans


Create Plan

/dashboard/merchant/plans/create


Plan Details

/dashboard/merchant/plans/[planId]


Subscribers

/dashboard/merchant/plans/[planId]/subscribers


Customers

/dashboard/merchant/customers


---

## Dashboard Capabilities

- Total Revenue
- Monthly Revenue
- Successful Billings
- Failed Billings
- Active Plans
- Active Subscriptions
- Customers
- Worker Health

---

## Merchant Workflow


Connect Wallet

↓

Register Merchant

↓

Create Billing Plan

↓

Customer Subscribes

↓

Worker Executes Billing

↓

Revenue Dashboard Updates


---

## Future SDK

The dashboard represents one consumer of the protocol.

Upcoming SDKs will allow third-party applications to integrate subscriptions without interacting directly with smart contracts.

Planned SDKs include

- JavaScript SDK
- React SDK
- Next.js SDK
- REST API
- Mobile SDK

---

## Roadmap

Current MVP

- Merchant dashboard
- Billing plans
- Customers
- Billing analytics
- Worker monitoring

Future

- Team management
- Invoice generation
- Subscription analytics
- Embedded checkout
- SDK documentation
- White-label merchant portal
- API Keys
- Webhooks
