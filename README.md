
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