const fs = require("fs");
const path = require("path");

// ======================================================
// CONFIGURATION
// ======================================================

const RESULTS_FILE = path.resolve("test-results/results.json");
const OUTPUT_FILE = path.resolve("Executive_Report.html");

// ======================================================
// CHECK RESULTS FILE
// ======================================================

if (!fs.existsSync(RESULTS_FILE)) {
  console.error("❌ results.json was not found!");
  console.error(`Expected location: ${RESULTS_FILE}`);
  console.error(
    "\nFirst run your Playwright tests, for example:\n" +
      "npx playwright test Main_tests/tests/checkout.spec.js",
  );
  process.exit(1);
}

// ======================================================
// READ PLAYWRIGHT JSON
// ======================================================

const data = JSON.parse(fs.readFileSync(RESULTS_FILE, "utf-8"));

// ======================================================
// HELPER FUNCTIONS
// ======================================================

function formatDuration(ms) {
  if (!ms) return "0s";

  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

function escapeHtml(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ======================================================
// EXTRACT TEST RESULTS
// ======================================================

const tests = [];

function processSuite(suite, parentTitle = "") {
  const currentTitle = parentTitle
    ? `${parentTitle} › ${suite.title}`
    : suite.title;

  // Process tests
  if (suite.specs) {
    for (const spec of suite.specs) {
      const testTitle = spec.title;

      for (const test of spec.tests || []) {
        const results = test.results || [];

        // Get the last result because retries can create multiple results
        const lastResult = results[results.length - 1];

        let status = test.status || lastResult?.status || "unknown";

        // Playwright can use "unexpected" for a failed test
        if (status === "unexpected") {
          status = "failed";
        }

        if (status === "expected") {
          status = "passed";
        }

        if (status === "skipped") {
          status = "skipped";
        }

        tests.push({
          title: testTitle,
          suite: currentTitle,
          status,
          duration: lastResult?.duration || 0,
          error: lastResult?.error?.message || "",
          attachments: lastResult?.attachments || [],
        });
      }
    }
  }

  // Process nested suites
  if (suite.suites) {
    for (const childSuite of suite.suites) {
      processSuite(childSuite, currentTitle);
    }
  }
}

for (const suite of data.suites || []) {
  processSuite(suite);
}

// ======================================================
// CALCULATE SUMMARY
// ======================================================

const totalTests = tests.length;

const passedTests = tests.filter((test) => test.status === "passed").length;

const failedTests = tests.filter((test) => test.status === "failed").length;

const skippedTests = tests.filter((test) => test.status === "skipped").length;

const passPercentage =
  totalTests === 0 ? 0 : ((passedTests / totalTests) * 100).toFixed(1);

const totalDuration = tests.reduce((total, test) => total + test.duration, 0);

// ======================================================
// EXECUTION STATUS
// ======================================================

let overallStatus = "PASSED";
let statusClass = "passed";

if (failedTests > 0) {
  overallStatus = "FAILED";
  statusClass = "failed";
} else if (skippedTests > 0) {
  overallStatus = "PASSED WITH SKIPPED TESTS";
  statusClass = "warning";
}

// ======================================================
// CREATE TEST ROWS
// ======================================================

const testRows = tests
  .map((test, index) => {
    let statusText = test.status.toUpperCase();
    let statusClass = test.status;

    if (test.status === "passed") {
      statusText = "PASSED";
    }

    if (test.status === "failed") {
      statusText = "FAILED";
    }

    if (test.status === "skipped") {
      statusText = "SKIPPED";
    }

    // -----------------------------------------------
    // Attachments
    // -----------------------------------------------

    let attachmentHtml = "—";

    if (test.attachments && test.attachments.length > 0) {
      const links = [];

      for (const attachment of test.attachments) {
        if (!attachment.path) {
          continue;
        }

        const fileName = path.basename(attachment.path);

        const attachmentPath = path
          .relative(path.dirname(OUTPUT_FILE), attachment.path)
          .replace(/\\/g, "/");

        let label = "Attachment";

        if (
          attachment.name?.toLowerCase().includes("screenshot") ||
          attachment.contentType === "image/png"
        ) {
          label = "📸 Screenshot";
        } else if (
          attachment.name?.toLowerCase().includes("video") ||
          attachment.contentType === "video/webm"
        ) {
          label = "🎥 Video";
        } else if (
          attachment.name?.toLowerCase().includes("trace") ||
          fileName.includes("trace")
        ) {
          label = "🔍 Trace";
        }

        links.push(`<a href="${attachmentPath}" target="_blank">${label}</a>`);
      }

      if (links.length > 0) {
        attachmentHtml = links.join("<br>");
      }
    }

    // -----------------------------------------------
    // Error
    // -----------------------------------------------

    let errorHtml = "—";

    if (test.error) {
      errorHtml = `
        <details>
          <summary>View Error</summary>
          <pre>${escapeHtml(test.error)}</pre>
        </details>
      `;
    }

    return `
      <tr>
        <td>${index + 1}</td>

        <td>
          <strong>${escapeHtml(test.title)}</strong>
          <br>
          <small>${escapeHtml(test.suite)}</small>
        </td>

        <td>
          <span class="status ${statusClass}">
            ${statusText}
          </span>
        </td>

        <td>
          ${formatDuration(test.duration)}
        </td>

        <td>
          ${attachmentHtml}
        </td>

        <td>
          ${errorHtml}
        </td>
      </tr>
    `;
  })
  .join("");

// ======================================================
// GENERATE HTML REPORT
// ======================================================

const executionDate = new Date().toLocaleString();

const html = `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>Playwright Executive Report</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  background: #f5f7fa;
  color: #1f2937;
}

.container {
  max-width: 1400px;

  margin: 0 auto;

  padding: 30px;
}

.header {
  background: white;

  border-radius: 12px;

  padding: 30px;

  margin-bottom: 25px;

  box-shadow:
    0 2px 8px rgba(0,0,0,0.08);
}

.header h1 {
  margin: 0 0 10px 0;
}

.header p {
  margin: 5px 0;

  color: #6b7280;
}

.overall-status {
  display: inline-block;

  margin-top: 15px;

  padding: 8px 18px;

  border-radius: 20px;

  font-weight: bold;
}

.overall-status.passed {
  background: #dcfce7;
  color: #166534;
}

.overall-status.failed {
  background: #fee2e2;
  color: #991b1b;
}

.overall-status.warning {
  background: #fef3c7;
  color: #92400e;
}

.summary {
  display: grid;

  grid-template-columns:
    repeat(5, 1fr);

  gap: 15px;

  margin-bottom: 25px;
}

.card {
  background: white;

  padding: 22px;

  border-radius: 12px;

  box-shadow:
    0 2px 8px rgba(0,0,0,0.08);

  text-align: center;
}

.card h3 {
  margin: 0;

  font-size: 14px;

  color: #6b7280;
}

.card .number {
  font-size: 30px;

  font-weight: bold;

  margin-top: 10px;
}

.card.passed .number {
  color: #16a34a;
}

.card.failed .number {
  color: #dc2626;
}

.card.skipped .number {
  color: #d97706;
}

.card.pass-rate .number {
  color: #2563eb;
}

.card.duration .number {
  color: #7c3aed;
}

.section {
  background: white;

  border-radius: 12px;

  padding: 25px;

  margin-bottom: 25px;

  box-shadow:
    0 2px 8px rgba(0,0,0,0.08);
}

.section h2 {
  margin-top: 0;
}

table {
  width: 100%;

  border-collapse: collapse;
}

th,
td {
  padding: 14px;

  border-bottom:
    1px solid #e5e7eb;

  text-align: left;

  vertical-align: top;
}

th {
  background: #f9fafb;
}

tr:hover {
  background: #f9fafb;
}

.status {
  display: inline-block;

  padding: 5px 10px;

  border-radius: 15px;

  font-size: 12px;

  font-weight: bold;
}

.status.passed {
  background: #dcfce7;
  color: #166534;
}

.status.failed {
  background: #fee2e2;
  color: #991b1b;
}

.status.skipped {
  background: #fef3c7;
  color: #92400e;
}

a {
  color: #2563eb;

  text-decoration: none;

  font-size: 13px;
}

a:hover {
  text-decoration: underline;
}

small {
  color: #6b7280;
}

pre {
  max-width: 500px;

  overflow-x: auto;

  background: #111827;

  color: #f9fafb;

  padding: 12px;

  border-radius: 6px;

  font-size: 12px;
}

details summary {
  cursor: pointer;

  color: #dc2626;

  font-weight: bold;
}

.footer {
  text-align: center;

  color: #6b7280;

  font-size: 12px;

  margin-top: 30px;
}

@media(max-width: 900px) {

  .summary {
    grid-template-columns:
      repeat(2, 1fr);
  }

}

@media(max-width: 600px) {

  .summary {
    grid-template-columns:
      1fr;
  }

  .container {
    padding: 15px;
  }

  table {
    font-size: 12px;
  }

}

</style>

</head>

<body>

<div class="container">

  <!-- ============================================ -->
  <!-- HEADER -->
  <!-- ============================================ -->

  <div class="header">

    <h1>
      Playwright Automation Executive Report
    </h1>

    <p>
      <strong>Project:</strong>
      Automation Exercise
    </p>

    <p>
      <strong>Test Suite:</strong>
      Regression Flow Checkout
    </p>

    <p>
      <strong>Execution Date:</strong>
      ${escapeHtml(executionDate)}
    </p>

    <p>
      <strong>Automation Tool:</strong>
      Playwright
    </p>

    <span class="overall-status ${statusClass}">
      Overall Status: ${overallStatus}
    </span>

  </div>


  <!-- ============================================ -->
  <!-- SUMMARY CARDS -->
  <!-- ============================================ -->

  <div class="summary">

    <div class="card">
      <h3>Total Tests</h3>

      <div class="number">
        ${totalTests}
      </div>
    </div>


    <div class="card passed">
      <h3>Passed</h3>

      <div class="number">
        ${passedTests}
      </div>
    </div>


    <div class="card failed">
      <h3>Failed</h3>

      <div class="number">
        ${failedTests}
      </div>
    </div>


    <div class="card skipped">
      <h3>Skipped</h3>

      <div class="number">
        ${skippedTests}
      </div>
    </div>


    <div class="card pass-rate">
      <h3>Pass Rate</h3>

      <div class="number">
        ${passPercentage}%
      </div>
    </div>

  </div>


  <!-- ============================================ -->
  <!-- EXECUTION INFORMATION -->
  <!-- ============================================ -->

  <div class="section">

    <h2>
      Execution Information
    </h2>

    <p>
      <strong>Total Execution Duration:</strong>
      ${formatDuration(totalDuration)}
    </p>

    <p>
      <strong>Total Test Cases:</strong>
      ${totalTests}
    </p>

    <p>
      <strong>Passed:</strong>
      ${passedTests}
    </p>

    <p>
      <strong>Failed:</strong>
      ${failedTests}
    </p>

    <p>
      <strong>Skipped:</strong>
      ${skippedTests}
    </p>

  </div>


  <!-- ============================================ -->
  <!-- TEST DETAILS -->
  <!-- ============================================ -->

  <div class="section">

    <h2>
      Test Execution Details
    </h2>

    <table>

      <thead>

        <tr>

          <th>
            #
          </th>

          <th>
            Test Case
          </th>

          <th>
            Status
          </th>

          <th>
            Duration
          </th>

          <th>
            Evidence
          </th>

          <th>
            Error
          </th>

        </tr>

      </thead>

      <tbody>

        ${testRows}

      </tbody>

    </table>

  </div>


  <!-- ============================================ -->
  <!-- FAILED TEST SUMMARY -->
  <!-- ============================================ -->

  ${
    failedTests > 0
      ? `
  <div class="section">

    <h2>
      Failed Test Summary
    </h2>

    <p>
      ${failedTests} test case(s) failed during this execution.
    </p>

    <p>
      Review the attached screenshot, video and Playwright
      trace for detailed investigation.
    </p>

  </div>
  `
      : `
  <div class="section">

    <h2>
      Execution Summary
    </h2>

    <p>
      All executed test cases passed successfully.
    </p>

  </div>
  `
  }


  <!-- ============================================ -->
  <!-- FOOTER -->
  <!-- ============================================ -->

  <div class="footer">

    Generated automatically by Playwright
    Automation Framework

  </div>

</div>

</body>

</html>
`;

// ======================================================
// WRITE REPORT
// ======================================================

fs.writeFileSync(OUTPUT_FILE, html, "utf-8");

console.log("\n======================================");
console.log("      EXECUTIVE REPORT GENERATED");
console.log("======================================");

console.log(`Total Tests : ${totalTests}`);
console.log(`Passed      : ${passedTests}`);
console.log(`Failed      : ${failedTests}`);
console.log(`Skipped     : ${skippedTests}`);
console.log(`Pass Rate   : ${passPercentage}%`);
console.log(`Duration    : ${formatDuration(totalDuration)}`);

console.log("\nReport:");

console.log(OUTPUT_FILE);

console.log("======================================\n");
