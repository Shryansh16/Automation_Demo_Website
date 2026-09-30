# 🛒 E-Commerce End-to-End Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.63.0-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

An enterprise-ready UI test automation framework built with **Playwright** and **JavaScript**, designed using the **Page Object Model (POM)** pattern. It automates critical user journeys on the [Automation Exercise](https://automationexercise.com) e-commerce platform and features a custom **Executive Reporting Dashboard** alongside automated failure diagnostics (traces, videos, screenshots).

---

## 📌 Key Highlights

- **Page Object Model (POM)**: Strict separation of locators and business actions from test assertions for maximum reusability and low maintenance overhead.
- **Custom Executive Dashboard (`Executive_Report.html`)**: A standalone, stakeholder-friendly HTML report built in Node.js that parses execution JSON to provide pass rates, test duration, collapsible error logs, and direct links to diagnostic evidence.
- **Deep Failure Diagnostics**:
  - 🔍 **Playwright Traces**: `retain-on-failure` for DOM snapshots and network timeline inspection.
  - 🎥 **Video Recordings**: `retain-on-failure` for step-by-step playback of failed runs.
  - 📸 **Screenshots**: `only-on-failure` capturing exact application state at failure.
- **Parallel & Tagged Execution**: Configured for multi-worker parallel execution and tagged test suites (`@regression`, `@login`, `@signup`).
- **CI/CD Integration**: Pre-configured GitHub Actions workflow (`playwright.yml`) executing tests and archiving reports.

---

## 📁 Project Architecture

```text
Automation_Demo_Website/
│
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI workflow
│
├── Main_tests/
│   ├── data/
│   │   └── sample.pdf              # Test assets (file upload testing)
│   │
│   ├── pages/                      # Page Object Model classes
│   │   ├── contectUs_Page.js       # Contact form & dialog handling
│   │   ├── loginpage.js            # Login and session termination
│   │   ├── product_Page.js         # Product catalog & search filters
│   │   ├── productQuantitypage.js  # Cart quantity, checkout & payment
│   │   ├── signup_Page.js          # User registration & account deletion
│   │   └── verifySubscription_Page.js # Email newsletter subscriptions
│   │
│   ├── tests/                      # Test specifications
│   │   ├── contectUs.spec.js       # Contact Us form & attachment tests
│   │   ├── loginpage.spec.js       # Positive and negative login specs
│   │   ├── product.spec.js         # Catalog navigation and search tests
│   │   ├── productQuantity.spec.js # E2E purchase & checkout workflows
│   │   ├── signup.spec.js          # Dynamic registration & collision tests
│   │   └── VerifySubscription.spec.js # Homepage and cart subscriptions
│   │
│   └── Utils/                      # Helpers and test fixtures
│
├── ExecutiveReport.js              # Custom Executive HTML report generator
├── Executive_Report.html           # Generated executive dashboard
├── playwright.config.js            # Framework and browser settings
├── package.json                    # Dependencies and run scripts
└── .gitignore
```

---

## 🧪 Automated Test Scenarios

| Test Suite | Spec File | Scenarios Covered |
| :--- | :--- | :--- |
| **Authentication** | `loginpage.spec.js` | • Valid user login<br>• Invalid credentials validation<br>• User logout flow |
| **User Registration** | `signup.spec.js` | • Dynamic new user registration & account deletion<br>• Duplicate email conflict validation |
| **Product Discovery** | `product.spec.js` | • Product listing navigation & detail inspection<br>• Product keyword search<br>• Add product to cart from catalog |
| **End-to-End Checkout** | `productQuantity.spec.js` | • Add product with custom quantity<br>• E2E: Register $\to$ Checkout $\to$ Payment $\to$ Invoice download<br>• Login $\to$ Add to cart $\to$ Place order $\to$ Logout<br>• Cart item removal & empty cart verification |
| **Customer Support** | `contectUs.spec.js` | • Contact form submission with file attachment (`sample.pdf`)<br>• Browser dialog (alert) handling |
| **Subscriptions** | `VerifySubscription.spec.js` | • Homepage footer subscription verification<br>• Cart page subscription verification |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shryansh16/Automation_Demo_Website.git
   cd Automation_Demo_Website
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers and system dependencies:**
   ```bash
   npx playwright install --with-deps
   ```

---

## 💻 Running Tests

### 1. Default Headless Run (All Tests)
```bash
npm test
```

### 2. Headed Mode (View Browser in Real-Time)
```bash
npm run test:headed
```

### 3. Parallel Execution (4 Workers)
```bash
npm run test:parallel
```

### 4. Run by Tag
```bash
# Run regression tests only
npx playwright test --grep "@regression"

# Run authentication tests only
npx playwright test --grep "@login"
```

### 5. Run a Specific Test File
```bash
npx playwright test Main_tests/tests/productQuantity.spec.js
```

---

## 📊 Test Reports & Debugging

### Playwright Standard Report
```bash
npx playwright show-report
```

### Custom Executive HTML Dashboard
To generate the stakeholder executive summary report after running your test suite:

```bash
node ExecutiveReport.js
```

This parses `test-results/results.json` and outputs `Executive_Report.html`, featuring:
- **High-level KPI Cards**: Total tests, Pass rate %, Skipped, and Total execution time.
- **Test Matrix**: Detailed step outcomes and duration.
- **Failure Artifacts**: Direct links to captured screenshots, WebM videos, and Playwright trace files.
- **Collapsible Stack Traces**: Quick inline error triage.

### Inspecting Playwright Traces
To deep-dive into DOM states, console logs, and network calls for any failed test:
```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## 🔄 CI/CD Pipeline

The project includes continuous integration via **GitHub Actions** ([`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)):
- Automatically triggers on every `push` and `pull_request` to `main` and `master`.
- Installs dependencies and Playwright browser binaries.
- Executes tests in headless mode.
- Archives `playwright-report` artifacts for 30 days.

---

## 🗺️ Future Roadmap

- [ ] **API Testing Integration**: Leverage Playwright's `APIRequestContext` for hybrid testing (e.g., API user creation & session preparation before UI checkout).
- [ ] **Auth Storage State (`storageState`)**: Cache login state to bypass repeated UI logins and accelerate execution.
- [ ] **Custom Fixtures (`test.extend`)**: Eliminate manual page object instantiation inside spec files.
- [ ] **Visual Regression**: Integrate `toHaveScreenshot()` for automated UI visual regression testing.
- [ ] **Automated GitHub Pages Deployment**: Automatically host `Executive_Report.html` on GitHub Pages after each CI run.

---

## 👤 Author

**Shryansh**
- GitHub: [@Shryansh16](https://github.com/Shryansh16)
