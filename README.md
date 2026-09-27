# QA Assignment 02 — Playwright Automation & API Testing

## Project Overview

This project contains automated end-to-end test scenarios for the [Tricentis Demo Web Shop](https://demowebshop.tricentis.com/), built using Playwright with the Page Object Model (POM) design pattern (Part A), along with API test scenarios built using Postman/Newman (Part C). Each scenario is implemented as an independent, runnable test, and all scenarios can also be executed together as a full suite.

## Tech Stack

- **Language:** JavaScript
- **UI Test Framework:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **API Test Framework:** Postman / Newman
- **Reporting:** Playwright HTML Reporter + Allure Report
- **Runtime:** Node.js

## Test Scenarios

### Part A — UI Tests (Playwright)

- **Q1 - Invalid Login:** Attempts login with an invalid email/password combination, verifies an error message is displayed and the user is not logged in.
- **Q2 - Register + Add Product to Cart:** Registers a new customer with a unique email, logs in, navigates to the Books category, selects a product, adds it to the cart, and verifies the correct product and quantity appear in the cart.
- **Q3 - Search, Checkout and Confirm Order:** Registers a new customer, logs in, searches for a product, adds it to the cart with a specific quantity, completes the full checkout flow (billing address, in-store pickup, payment method, payment information, order confirmation), verifies the order is successfully processed, and attaches an order confirmation screenshot to the report.

### Part C — API Tests (Postman / Newman)

- **Get All Users:** Sends a `GET` request to `https://jsonplaceholder.typicode.com/users`, verifies the response status is 200, confirms the response is a non-empty array, and checks that each user object contains `id`, `name`, and `email`. Saves a `userId` from the response for use in the next request.
- **Update User:** Sends a `PUT` request to `https://jsonplaceholder.typicode.com/users/{{userId}}` with an updated name, email, phone, and company name. Verifies the response status is 200, the response body is not empty, the returned `id` matches the saved `userId`, the `phone` field is present, and the returned `name` matches the updated name sent in the request.

## Project Structure

```
assignment-02/
├── pages/                          # Page Object Model classes (Part A)
│   ├── BasePage.js
│   ├── Register.js
│   ├── LoginPage.js
│   ├── SearchPage.js
│   ├── OrderPage.js
│   └── CheckoutPage.js
├── tests/                          # UI test scenarios (Part A)
│   ├── invalidLogin.test.js        (Q1)
│   ├── registerAndOrder.test.js    (Q2)
│   └── searchAndCheckout.test.js   (Q3)
├── api-tests/                      # API test collection (Part C)
│   ├── API-Assignment-02.postman_collection.json
│   └── api-env.postman_environment.json
├── playwright.config.js
├── package.json
└── README.md
```

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

3. **Install Playwright browsers** (required for Part A)
```bash
   npx playwright install
```

4. **Install Newman** (required for Part C, if not already installed globally)
```bash
   npm install -g newman
```

## Running the UI Tests (Part A)

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

## Running the API Tests (Part C)

The API test collection lives in `api-tests/` and covers `GET` (get all users) and `PUT` (update user) requests against [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/).

### Option 1: Run with Newman (CLI)

```bash
newman run api-tests/API-Assignment-02.postman_collection.json -e api-tests/api-env.postman_environment.json
```

### Option 2: Run with Postman (GUI)

1. Open Postman.
2. Import `api-tests/API-Assignment-02.postman_collection.json` as a collection.
3. Import `api-tests/api-env.postman_environment.json` as an environment.
4. Select the imported environment from the environment dropdown (top right).
5. Open the collection, click **Run**, then run the requests in order (Get All Users → Update User).

## Generating and Viewing Reports

### Playwright HTML Report

Generated automatically after each UI test run. To view the last report:

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

- Each UI test creates a new customer account with a unique, timestamp-based email to avoid conflicts between runs.
- Screenshots are attached to both the Playwright HTML report and the Allure report on key steps (e.g., login failure, order confirmation).
- API tests use dynamic values (e.g., timestamp-based names/emails) in the request body to avoid stale-data conflicts between runs.