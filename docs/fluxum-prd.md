# PRD — Fluxum
**Product Requirements Document**
**Version:** 1.0
**Author:** Anderson (Solo Developer)
**Last updated:** May 2026

---

## Table of Contents

1. [Overview](#1-overview)
2. [Scope](#2-scope)
3. [Personas](#3-personas)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [User Flow](#6-user-flow)
7. [Success Metrics](#7-success-metrics)
8. [Appendix & Notes](#8-appendix--notes)

---

## 1. Overview

**Fluxum** is a personal finance web application born from the real need to evolve an Excel budget spreadsheet. The product addresses the practical limitations of a spreadsheet — formula fragility, lack of history, poor visualizations, and usability issues — delivering a more agile, visual, and reliable experience.

**Core problem:** Budget spreadsheets are functional but fragile and limited. Manual edits carry the risk of formula errors, there is no consolidated history, the visual experience is poor, and collaboration between users is nonexistent. There is also no support for medium and long-term financial goal tracking.

**Product vision:** A web platform accessible to anyone who wants to plan, budget, and track personal finances clearly — potentially evolving to serve business contexts in the future. Within 6 to 12 months, Fluxum should cover at least all functionality currently provided by the spreadsheet, with authentication and independent multi-user support.

**Initial target audience:** The developer himself, his girlfriend, and his father — three real and immediate users, all accessing the tool via desktop/web. After initial validation, the product opens to anyone seeking financial organization.

### Main pain points Fluxum addresses

- Tedious and fragile process to edit budgets and income entries
- No history of budgeted vs. actual expenses
- No dynamic expense categorization
- No graphical visualizations (pie charts by expense and by category)
- No monthly savings goal tracking (% of income)
- No financial project view with reserve projections
- No dark mode
- No authentication (currently a local spreadsheet)

### Strategic directive

Fluxum is developed by a single developer and also serves as a **portfolio project for positioning in the European IT market** — specifically Italy, within a 12-month horizon. This makes technical quality, software architecture, engineering best practices, and documentation just as relevant as the product itself. The tech stack has been defined by the developer, and technical decisions should reflect standards valued in the European market.

---

## 2. Scope

### ✅ In — V1 (first usable version)

- Authentication with email/password and Google login
- Annual budget table with editable rows
- Bank panel with manual balance input
- Monthly income entries panel
- Navigation between budget years
- Independent multi-user support
- Monthly balance indicator (surplus / deficit)
- Currency binding on every monetary value

### 🔜 Out — V2 and beyond

- Dark mode
- Currency selector (e.g. switch to EUR)
- Financial projects view
- Budgeted vs. actual expense history
- Dynamic expense categories
- Charts (pie by expense and by category)
- Monthly savings goal (% of income)
- Copy previous year's entries to new year
- Internationalization (i18n) — Portuguese, Italian and English initially

### 🚫 Out of scope by conscious decision

- Bank API integration (Brazilian Open Finance System)
- Native mobile application (iOS / Android)
- Fiscal or accounting reports

---

## 3. Personas

### 👤 Persona 1 — Anderson *(developer / primary user)*

| Attribute | Detail |
|-----------|--------|
| **Profile** | Java developer, advanced technical background, continuous improvement mindset |
| **Usage** | Accesses mainly at month-end to plan current and future recurring/non-recurring expenses |
| **Pain points** | Manual and fragile process, no consolidated forward-looking view, no retrospective history |
| **Expectations** | Technically solid product that solves the real problem and serves as a professional showcase. High tolerance for advanced features. |

---

### 👤 Persona 2 — Ana *(young non-technical user)*

| Attribute | Detail |
|-----------|--------|
| **Profile** | Young adult, everyday technology user, no technical IT knowledge |
| **Usage** | Maintains her own spreadsheet replicated with help. Regular financial tracking usage. |
| **Pain points** | Must open banking app separately to check balance; has paid bills late due to forgotten due dates; difficulty replicating and maintaining the spreadsheet alone |
| **Expectations** | Simple, ready-to-use experience. Values proactive notifications and centralized financial information. |

> 📌 **Product insight:** Due date notifications (WhatsApp, email, or push) address a real pain point for Ana. The due date field must exist from V1 to enable this in V2.

---

### 👤 Persona 3 — Antonio *(experienced user, 62 years old)*

| Attribute | Detail |
|-----------|--------|
| **Profile** | 62 years old, autonomous desktop user, comfortable with everyday technology |
| **Usage** | Introduced the spreadsheet model. Independent professional use on desktop, no support needed. |
| **Pain points** | Formula fragility, no history, interface not sufficiently user-friendly |
| **Expectations** | **Reliability above all.** Does not tolerate bugs or data loss. Stability is the most critical factor for this persona. |

---

## 4. Functional Requirements

### RF01 — Authentication
- Login with email and password
- Google login (OAuth 2.0)
- Each user's data is completely isolated from others

### RF02 — Budget Year Management
- Users can create budgets for different years
- Users can navigate freely between registered years
- On login, the current year is displayed by default

### RF03 — Budget Table
- Each row represents a grouped expense / budget entry
- Users can freely add and remove rows
- Each entry contains:
  - **Row name** — required *(e.g. "Dog", "Food", "Rent")*
  - **Currency** — required
  - **Value per month** — optional; months without a value display `—`
  - **Cell description** — optional; provides context for that specific month's value *(e.g. "January = vaccine, February = pet shop (All related to the Dog's budget row, for instance)")*
  - **Due date** — optional
- Values are distributed across months (Jan–Dec), individually editable
- Each month's value can differ from other months

### RF04 — Bank Panel
- Displayed above the budget table
- Users can register their banks and manually input balances
- Users can freely add and remove banks

> 📌 **Technical decision:** Bank API integration (Open Finance) is out of V1 scope. The data model must be designed to accommodate future integration without restructuring.

### RF05 — Income Entries Panel
- Displayed below the budget table
- Users can register income sources (e.g. salary, bonus, rental income)
- Each source can have a value defined per month, but is not mandatory so if no value is informed, that month will be considered as 0 for that income source

### RF06 — Currency Binding
- Every monetary value must be linked to a currency (e.g. BRL, EUR, USD)
- The default currency is defined by the user in settings

> 📌 **Technical decision:** Currency must be bound to every monetary value from V1. This ensures a future currency switch (e.g. BRL → EUR) is a natural evolution without data migration.

### RF07 — Monthly Balance Indicator (Surplus / Deficit)
- Each month automatically displays the result of income minus expenses
- Displayed with visual feedback: **green** if positive (surplus), **red** if negative (deficit)
- Allows the user to quickly identify which months of the year will be in the red

---

## 5. Non-Functional Requirements

### RNF01 — Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Java + Spring Framework |
| **Frontend** | React |
| **Database** | MySQL |
| **Hosting** | TBD — deployment and infrastructure is an intentional learning milestone |

> 📌 **Portfolio note:** Java + Spring is well regarded in the European corporate IT market, particularly in Italy and Germany. React is the frontend industry standard. This stack demonstrates technical maturity.

### RNF02 — Security
- All communication must be via **HTTPS**
- Passwords stored with **secure hashing** (BCrypt via Spring Security)
- Authentication via **JWT** or Spring Security-managed sessions
- Social login via **OAuth 2.0** (Google)
- Financial data isolated per user — no cross-user data access

> 📌 **Technical note:** HTTPS in production is typically resolved by the hosting platform (e.g. Railway and Render provide automatic SSL) or via Nginx + Let's Encrypt on a VPS.

### RNF03 — Performance
- Not a critical concern in V1 given the low data and user volume
- **Attention threshold:** page loads exceeding **5 seconds** indicate an issue to investigate

### RNF04 — Availability
- **Ideal target:** 24/7 uptime
- **V1 tolerance:** planned maintenance windows are acceptable in the first year given the small user base

### RNF05 — Code Quality & Documentation
- Engineering best practices: clean code, separation of concerns
- Public repository with clear documentation (README, architecture decisions)
- Code and documentation written in **English** by default

---

## 6. User Flow

### Flow 1 — First Access

```
1. User accesses Fluxum
2. Chooses to sign up or log in with Google
3. If manual sign-up: provides name, email, and password
4. Redirected to onboarding wizard:
   ├── Step 1: Select default currency
   ├── Step 2: Register banks and initial balances (skippable)
   └── Step 3: Register income sources (skippable)
5. Redirected to the main screen with the current year loaded
6. Empty table ready to receive entries
```

### Flow 2 — Recurring Use

```
1. User logs in
2. Lands directly on the current year's budget table
3. Navigates between years via the year selector
4. Adds, edits, or removes entries in the table
5. Monthly balance indicator updates automatically
6. Updates bank balances and income entries as needed
```

### Flow 3 — Future Year Planning

```
1. User selects "create new year" in the year selector
2. System creates an empty table for the selected year
3. [V2] System offers option to copy entries from the previous year as a starting point
```

### Flow 4 — Cell Editing with Description

```
1. User clicks on a table cell (e.g. February column, "Dog" row)
2. Inline editor or simple modal opens
3. User enters the value and optionally a description for that month
4. Confirms — cell updates with the value (or "—" if empty)
```

---

## 7. Success Metrics

### Product — Adoption
- All 3 initial users (developer, girlfriend, father) have fully migrated from the spreadsheet to Fluxum
- None of the 3 returned to using the spreadsheet after 30 days of first access
- Zero data loss reported in the first 3 months
- System stable with no significant unplanned downtime in the first month of real use

### Product — Timeline

| Milestone | Date |
|-----------|------|
| V1 ideal target | December 2026 |
| V1 hard deadline | **February 2027** |

> The deadline is strategic: the portfolio must be consolidated before the planned relocation to Italy.

### Portfolio — Technical Quality
- Public GitHub repository with English README and architecture documentation
- Clean, well-structured code with minimum test coverage
- Project demonstrable in a technical interview within **15 minutes**

### Portfolio — Outcome
- Project presented in at least one European selection process
- Positive recruiter feedback on technical quality and project maturity

---

## 8. Appendix & Notes

### Visual References
Fluxum should not radically depart from the visual language of a spreadsheet — familiarity is an asset, especially for current users. The goal is to evolve that language into a more sophisticated, clean, and interactive interface, leveraging React's capabilities.

### Identified Risks

| Risk | Impact | Notes |
|------|--------|-------|
| React learning curve | Medium | Developer is experienced in Java but deepening frontend skills |
| Deployment & infrastructure | Medium | New area for the developer; real deadline risk but intentional learning |
| General technical gaps | Medium | Expected in a solo project; main risk is impact on the February 2027 deadline |

### Long-term Vision
Fluxum is conceived as a continuously evolving product — V1 is the starting point, not the destination. Commercial potential has been identified by the developer, though not yet confirmed. The product must be built with this possibility in mind: clean code, scalable architecture, and a user experience that justifies eventual monetization.

### Consolidated Technical Decisions & Insights

| # | Decision / Insight | Target |
|---|--------------------|--------|
| 1 | Every monetary value must be linked to a currency from V1 | V1 |
| 2 | Bank panel data model must be compatible with future API integration | V1 |
| 3 | Due date field must exist from V1 to enable notifications in V2 | V1 |
| 4 | i18n structure must be implemented in the frontend from the start — even with a single language in V1. Priority languages: PT-BR and Italian | V1 foundation |
| 5 | Copy previous year's entries when creating a new budget year | V2+ |
| 6 | Due date notifications (WhatsApp, email, or push) | V2+ |
| 7 | Mobile read-only table view | V3+ |

---

*This document was built collaboratively using ProductBuddy, an interactive PRD facilitation assistant.*
