# 🛒 E-Commerce UI & API End-to-End Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.63.0-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Faker.js](https://img.shields.io/badge/Faker.js-Dynamic_Data-8B5CF6?style=for-the-badge&logo=data:image/svg+xml;base64,&logoColor=white)
![REST API](https://img.shields.io/badge/API_Testing-Playwright_APIRequestContext-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

An enterprise-ready hybrid **UI & API Test Automation Framework** built with **Playwright** and **JavaScript**, designed using the **Page Object Model (POM)** and **Service Object Model** patterns. It automates critical user journeys and REST API endpoints on the [Automation Exercise](https://automationexercise.com) platform, featuring custom dependency injection fixtures, dynamic test data generation, and an automated **Executive Reporting Dashboard** with failure diagnostics.

---

## 📌 Key Highlights

- **Hybrid UI & API Coverage**: Complete end-to-end coverage combining browser UI testing with direct REST API validation (GET, POST, PUT, DELETE).
- **Page Object Model (POM) & API Service Layer**: Strict separation of UI locators/actions and API endpoint clients from test specifications for maximum maintainability and reusability.
- **Custom Playwright Fixtures (`test.extend`)**: All UI page objects and API service clients are registered as custom fixtures in `Utils/fixtures.js`. Tests receive pre-initialized page and API instances directly via test arguments, eliminating manual boilerplate across every spec file.
- **Dynamic Test Data Generation (`@faker-js/faker`)**: User profiles (name, email, password, company, address) are generated dynamically at runtime via `Utils/testData.js`, preventing duplicate-account collisions and enabling independent, parallel test execution.
- **Contract & Schema Assertions**: Validates HTTP status codes, response codes, error messaging, and schema structures (e.g. using `expect.objectContaining` with dynamic property types).
- **Custom Executive Dashboard (`Executive_Report.html`)**: A standalone, stakeholder-friendly HTML report built in Node.js that parses execution JSON to provide pass rates, test duration, collapsible error logs, and direct links to diagnostic evidence.
- **Deep Failure Diagnostics**:
  - 🔍 **Playwright Traces**: `retain-on-failure` for DOM snapshots and network timeline inspection.
  - 🎥 **Video Recordings**: `retain-on-failure` for step-by-step playback of failed runs.
  - 📸 **Screenshots**: `only-on-failure` capturing exact application state at failure.
- **CI/CD Integration**: Pre-configured GitHub Actions workflow (`playwright.yml`) executing tests in headless mode with automated report artifact archiving.

---

## 📁 Project Architecture

```text
Automation_Demo_Website/
│
├── .github/
│   └── workflows/
│       └── playwright.yml              # GitHub Actions CI workflow
│
├── Main_tests/
│   ├── api/
│   │   ├── Pages/                      # API Client / Service Objects
│   │   │   ├── brandAPI.js             # Brand list API endpoints
│   │   │   ├── deleteApi.js            # User account deletion API
│   │   │   ├── getUserDetails.js       # User profile retrieval API
│   │   │   ├── loginAPI.js             # Login verification & method checks
│   │   │   ├── ProductsApi.js          # Product catalog API endpoints
│   │   │   ├── putUpdateUser.js        # Account update via PUT API
│   │   │   ├── searchProductApi.js     # Product search API
│   │   │   └── signUpAPI.js            # User registration API
│   │   │
│   │   └── Tests/                      # API Test Specifications
│   │       ├── brandAPIpage.spec.js    # Brands retrieval & method checks
│   │       ├── end2End.spec.js         # User Lifecycle End-to-End Regression flow (@regressionE2EApi)
│   │       ├── getAllProduct.spec.js   # Products list & schema assertions
│   │       ├── getUserByEmail.spec.js  # User details retrieval specs
│   │       ├── loginApiPage.spec.js    # Login verification (positive & negative)
│   │       ├── searchProduct.spec.js   # Product search (positive & negative)
│   │       ├── signUp.spec.js          # Dynamic signup, deletion & conflict tests
│   │       └── updateUserPut.spec.js   # End-to-end account update via PUT
│   │
│   ├── data/
│   │   └── sample.pdf                  # Test assets (file upload testing)
│   │
│   ├── pages/                          # UI Page Object Model classes
│   │   ├── contectUs_Page.js           # Contact form & dialog handling
│   │   ├── loginpage.js                # Login and session termination
│   │   ├── product_Page.js             # Product catalog & search filters
│   │   ├── productQuantitypage.js      # Cart quantity, checkout & payment
│   │   ├── signup_Page.js              # User registration & account deletion
│   │   └── verifySubscription_Page.js  # Email newsletter subscriptions
│   │
│   ├── tests/                          # UI Test Specifications
│   │   ├── contectUs.spec.js           # Contact Us form & attachment tests
│   │   ├── loginpage.spec.js           # Positive and negative login specs
│   │   ├── product.spec.js             # Catalog navigation and search tests
│   │   ├── productQuantity.spec.js     # E2E purchase & checkout workflows
│   │   ├── signup.spec.js              # Dynamic registration & collision tests
│   │   └── VerifySubscription.spec.js  # Homepage and cart subscriptions
│   │
│   └── Utils/                          # Shared Utilities & Configuration
│       ├── fixtures.js                 # Custom Playwright fixtures (test.extend)
│       └── testData.js                 # Dynamic test data generator (@faker-js/faker)
│
├── ExecutiveReport.js                  # Custom Executive HTML report generator
├── Executive_Report.html               # Generated executive dashboard
├── playwright.config.js                # Playwright configuration & browser settings
├── package.json                        # Dependencies and npm execution scripts
└── .gitignore
```

---

## 🧪 Automated Test Scenarios

### 🌐 UI Test Suites

| Test Suite | Spec File | Scenarios Covered |
| :--- | :--- | :--- |
| **Authentication** | `loginpage.spec.js` | • Valid user login<br>• Invalid credentials validation<br>• User logout flow |
| **User Registration** | `signup.spec.js` | • Dynamic new user registration & account deletion<br>• Duplicate email conflict validation |
| **Product Discovery** | `product.spec.js` | • Product listing navigation & detail inspection<br>• Product keyword search<br>• Add product to cart from catalog |
| **End-to-End Checkout** | `productQuantity.spec.js` | • Add product with custom quantity<br>• E2E: Register $\to$ Checkout $\to$ Payment $\to$ Invoice download<br>• Login $\to$ Add to cart $\to$ Place order $\to$ Logout<br>• Cart item removal & empty cart verification |
| **Customer Support** | `contectUs.spec.js` | • Contact form submission with file attachment (`sample.pdf`)<br>• Browser dialog (alert) handling |
| **Subscriptions** | `VerifySubscription.spec.js` | • Homepage footer subscription verification<br>• Cart page subscription verification |

### ⚡ REST API Test Suites

| API Suite | Spec File | HTTP Method | Scenarios Covered |
| :--- | :--- | :---: | :--- |
| **Product Catalog** | `getAllProduct.spec.js` | `GET` | • Retrieve all products list<br>• HTTP 200 & response body validation<br>• Schema & contract checking (`id`, `name`, `price`, `brand`) |
| **Brand Management** | `brandAPIpage.spec.js` | `GET` / `PUT` | • Retrieve all brand lists<br>• Negative test: Unsupported `PUT` request returns 405 Method Not Allowed |
| **Product Search** | `searchProduct.spec.js` | `POST` | • Search product by keyword (`tshirt`)<br>• Negative test: Search without parameter returns 400 Bad Request |
| **Login Verification** | `loginApiPage.spec.js` | `POST` / `DELETE` | • Verify login with valid credentials (200 User exists)<br>• Missing email / missing password validation (404/400)<br>• Negative test: Unsupported `DELETE` method returns 405 |
| **User Registration & Deletion** | `signUp.spec.js` | `POST` / `DELETE` | • Create dynamic user with dynamic Faker payload (201)<br>• Delete newly created user (200 Account deleted)<br>• Negative test: Duplicate email signup (400 Email already exists)<br>• Negative test: Missing parameters (400 Bad Request) |
| **Update Account** | `updateUserPut.spec.js` | `PUT` | • Create user $\to$ Generate updated profile $\to$ Update account via `PUT`<br>• Validate response code 200 & "User updated!" message |
| **User Details Retrieval** | `getUserByEmail.spec.js` | `GET` | • Fetch user profile details by email<br>• Validate status code 200 & user account schema |
| **User Lifecycle E2E Chain** | `end2End.spec.js` | `POST` $\to$ `PUT` $\to$ `DELETE` | • Sequential End-to-End API regression (`@regressionE2EApi`)<br>• Dynamic User Signup $\to$ Verify Login $\to$ PUT Profile Update $\to$ Account Deletion |

---

## 🧩 Custom Fixtures (`test.extend`)

All UI Page Objects and API Service Clients are centralized in [`Utils/fixtures.js`](Main_tests/Utils/fixtures.js). Test files never need to manually instantiate classes.

### Registered Fixtures

| Fixture Name | Type | Target Class | Injected Capabilities |
| :--- | :---: | :--- | :--- |
| `signupPage` | UI | `signup_Page` | Registration, form filling & account deletion |
| `productQuantityPage` | UI | `productQantity` | Cart management, quantity updates, checkout & payment |
| `loginPage` | UI | `loginpage` | UI login & logout flows |
| `contactUsPage` | UI | `ContactUs` | Contact form & file uploads |
| `productpage` | UI | `product` | Product catalog navigation & search |
| `subscriptionPage` | UI | `VerifySubscription` | Email subscription verifications |
| `ProductApi` | API | `ProductsAPI` | Catalog product endpoints (`/api/productsList`) |
| `brandPageApi` | API | `brandAPI` | Brand list endpoints (`/api/brandsList`) |
| `SearchProductApi` | API | `searchProductApi` | Search product endpoint (`/api/searchProduct`) |
| `loginPageApi` | API | `loginAPI` | Login verification endpoint (`/api/verifyLogin`) |
| `signUpPageApi` | API | `signUpApi` | Registration endpoint (`/api/createAccount`) |
| `deletePageApi` | API | `deleteApi` | Account deletion endpoint (`/api/deleteAccount`) |
| `getUserByEmail` | API | `getUserDetailsApi` | Profile query endpoint (`/api/getUserDetailByEmail`) |
| `putUserApi` | API | `putUpdateUser` | Profile update endpoint (`/api/updateAccount`) |

#### Example Usage in Tests:
```javascript
import { test, expect } from "../../Utils/fixtures";
import { genrateuser } from "../../Utils/testData";

test("API: Create and Delete User Flow", async ({ signUpPageApi, deletePageApi }) => {
    const user = genrateuser();
    
    // Create User via API
    const response = await signUpPageApi.createUser(user);
    expect(response.status()).toBe(200);

    // Delete User via API
    const deleteResponse = await deletePageApi.deleteUser({ EMAIL: user.email, PASSWORD: user.password });
    expect(deleteResponse.status()).toBe(200);
});
```

---

## 🎲 Dynamic Test Data (`@faker-js/faker`)

User profiles are generated dynamically at runtime via [`Utils/testData.js`](Main_tests/Utils/testData.js) using `@faker-js/faker`. Each test creates fresh, isolated data:

```javascript
import { genrateuser } from "../Utils/testData";

const user = genrateuser();
// user.firstName     → "Sofia"
// user.lastName      → "Mitchell"
// user.fullName      → "Sofia Mitchell"
// user.email         → "sofia.mitchell@gmail.com"
// user.password      → "test.sofia.mitchell.xkqwrm@123"
// user.company       → "Acme Corp"
// user.address1      → "742 Evergreen Terrace"
// user.mobile_number → "9876543210"
```

For negative testing or update scenarios, individual properties can be overridden cleanly:
```javascript
// Negative testing override
const invalidUser = { ...genrateuser(), email: "invalid-format" };

// Dynamic update payload
const updatedUser = { ...genrateuser(), email: existingUser.email, password: existingUser.password };
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shryansh16/Automation_Demo_Website.git
   cd Automation_Demo_Website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

---

## 💻 Running Tests

### 1. Run Entire Test Suite (UI + API)
```bash
npm run test:all
```

### 2. Run API Tests Only
```bash
# Run all API tests:
npm run test:api

# Run User Lifecycle End-to-End Regression flow:
npm run test:e2e:api

# Or run specific specs directly:
npx playwright test Main_tests/api/Tests/end2End.spec.js
npx playwright test Main_tests/api/Tests/updateUserPut.spec.js
npx playwright test Main_tests/api/Tests/signUp.spec.js
```

### 3. Run UI Tests Only
```bash
npm test
# Run in headed mode (watch browser):
npm run test:headed
# Run in parallel with 4 workers:
npm run test:parallel
```

### 4. Run by Tag
```bash
# Run End-to-End API regression suite
npx playwright test --grep "@regressionE2EApi"

# Run regression tagged tests
npx playwright test --grep "@regression"

# Run authentication tagged tests
npx playwright test --grep "@login"
```

---

## 📊 Test Reports & Diagnostics

### Playwright HTML Report
```bash
npx playwright show-report
```

### Custom Executive HTML Dashboard
Generate a clean, stakeholder-ready executive summary after any test run:

```bash
node ExecutiveReport.js
```

This parses `test-results/results.json` and outputs `Executive_Report.html`:
- **KPI Metrics**: Pass Rate %, Total Executions, Failures, and Execution Duration.
- **Detailed Test Matrix**: Step-by-step breakdown across UI and API specs.
- **Embedded Diagnostic Links**: Direct access to captured screenshots, WebM videos, and Playwright trace archives.

### Inspecting Traces
To investigate network requests, DOM snapshots, and console outputs for failed tests:
```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## 🔄 CI/CD Pipeline

Continuous Integration is automated via **GitHub Actions** ([`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)):
- Triggers on every `push` and `pull_request` to `main` and `master`.
- Sets up Node.js environment and installs dependencies (`npm ci`).
- Installs Playwright browser binaries with system dependencies.
- Executes the automated test suite in headless mode.
- Automatically captures and uploads `playwright-report` artifacts with a 30-day retention policy.

---

## 🗺️ Roadmap

- [x] **Page Object Model (POM)**: ~~Modular UI architecture separating locators and actions.~~ ✅ Implemented.
- [x] **Custom Playwright Fixtures (`test.extend`)**: ~~Dependency injection for UI and API clients.~~ ✅ Implemented.
- [x] **Dynamic Test Data (`@faker-js/faker`)**: ~~Dynamic profile generation to avoid state collisions.~~ ✅ Implemented.
- [x] **REST API Test Automation**: ~~Comprehensive API suite for GET, POST, PUT, DELETE with negative validation.~~ ✅ Implemented.
- [x] **Executive HTML Reporting**: ~~Custom dashboard parsing execution JSON for executive reviews.~~ ✅ Implemented.
- [ ] **Schema Contract Validation (Zod / Ajv)**: Automated JSON schema validation for all API endpoints.
- [ ] **Visual Regression Testing**: Automated UI snapshot comparisons using `toHaveScreenshot()`.
- [ ] **Automated GitHub Pages Deployment**: Publish `Executive_Report.html` to GitHub Pages automatically on CI completion.

---

## 👤 Author

**Shryansh**
- GitHub: [@Shryansh16](https://github.com/Shryansh16)
