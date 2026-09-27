# QA Assignment 02 — Playwright Automation

## Project Overview

This project contains automated end-to-end test scenarios for the [Tricentis Demo Web Shop](https://demowebshop.tricentis.com/), built using Playwright with the Page Object Model (POM) design pattern. Each scenario is implemented as an independent, runnable test, and all scenarios can also be executed together as a full suite.

## Tech Stack

- **Language:** JavaScript
- **Test Framework:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Reporting:** Playwright HTML Reporter + Allure Report
- **Runtime:** Node.js

## Test Scenarios

- **Q1 - Invalid Login:** Attempts login with an invalid email/password combination, verifies an error message is displayed and the user is not logged in.
- **Q2 - Register + Add Product to Cart:** Registers a new customer with a unique email, logs in, navigates to the Books category, selects a product, adds it to the cart, and verifies the correct product and quantity appear in the cart.
- **Q3 - Search, Checkout and Confirm Order:** Registers a new customer, logs in, searches for a product, adds it to the cart with a specific quantity, completes the full checkout flow (billing address, in-store pickup, payment method, payment information, order confirmation), verifies the order is successfully processed, and attaches an order confirmation screenshot to the report.

## Project Structure
assignment-02/
├── pages/ # Page Object Model classes
│ ├── BasePage.js
│ ├── Register.js
│ ├── LoginPage.js
│ ├── SearchPage.js
│ ├── OrderPage.js
│ └── CheckoutPage.js
├── tests/ # Test scenarios
│ ├── invalidLogin.test.js (Q1)
│ ├── registerAndOrder.test.js (Q2)
│ └── searchAndCheckout.test.js (Q3)
├── playwright.config.js
├── package.json
└── README.md

## Setup Instructions

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd assignment-02
```

2. **Install dependencies**
```bash
   npm install
```

3. **Install Playwright browsers**
```bash
   npx playwright install
```

## Running the Tests

### Run a single scenario

```bash
# Q1 - Invalid Login
npx playwright test tests/invalidLogin.test.js

# Q2 - Register + Add Product to Cart
npx playwright test tests/registerAndOrder.test.js

# Q3 - Search, Checkout and Confirm Order
npx playwright test tests/searchAndCheckout.test.js
```

### Run all scenarios together

```bash
npx playwright test
```

### Run in headed mode (see the browser)

```bash
npx playwright test --headed
```

## Generating and Viewing Reports

### Playwright HTML Report

Generated automatically after each test run. To view the last report:

```bash
npx playwright show-report
```

### Allure Report

Allure results are generated automatically after each run (configured via the `allure-playwright` reporter in `playwright.config.js`). To generate and open the report:

```bash
npx allure serve allure-results
```

This command generates a fresh Allure report from the latest results and opens it in the browser, showing test status, steps, and attached screenshots for each scenario.

## Notes

- Each test creates a new customer account with a unique, timestamp-based email to avoid conflicts between runs.
- Screenshots are attached to both the Playwright HTML report and the Allure report on key steps (e.g., login failure, order confirmation).