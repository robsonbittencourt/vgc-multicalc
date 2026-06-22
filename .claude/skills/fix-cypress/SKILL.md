---
name: fix-cypress
description: Diagnose and fix failing Cypress E2E tests in this project. Use when the user asks to fix a Cypress test, a flaky/timing-out spec, or a failing E2E spec. Runs specs headless (never in a browser UI), starts from the actual failure, and corrects one test at a time.
---

# /fix-cypress

Diagnoses and fixes Cypress test failures in this project. **Never open the browser UI** — always run headless via terminal.

## Core rules

- **Never run in the browser UI.** Always headless.
- Run a spec with the command below — **required** to use `nohup` + `unset ELECTRON_RUN_AS_NODE` + `--browser chrome`, otherwise Electron crashes with SIGILL in the Claude Code environment:
  ```bash
  rm -f /tmp/cy-done.txt /tmp/cy-results.json /tmp/cy-nohup.log
  nohup bash -c 'unset ELECTRON_RUN_AS_NODE; npx cypress run --browser chrome --spec <SPEC_PATH> --reporter json --reporter-options output=/tmp/cy-results.json; echo $? > /tmp/cy-done.txt' &>/tmp/cy-nohup.log &
  until [ -f /tmp/cy-done.txt ]; do sleep 2; done
  cat /tmp/cy-nohup.log | tail -40
  ```
  Then read `/tmp/cy-results.json` for details on failed tests.
- **Always start by running the test and understanding the failure** before changing anything.
- These tests are slow. **Fix one at a time.** Always add `.only` to the focused test (`it.only(...)`) to isolate and validate the fix. Never try to fix multiple things at once.
- **Remove `.only` when done** with each test.
- Use **page objects** whenever possible (`cypress/page-object/`). Do not duplicate selectors in the spec.

## Flow

### Step 1 — Run and diagnose

Run the spec in isolation and read the output.

**If the server is not running** (connection errors like `cy.visit()` failed / ECONNREFUSED / `Cypress failed to verify that your server is running`): **stop and tell the user to start the server.** Never try to start it yourself.

Classify the failure:

- **Logic error** (wrong assertion, selector changed, app flow changed)
- **Timeout / timing** (element did not appear in time, race condition)
- **Hard test** (intermittent failure or non-obvious cause)

### Step 2a — Logic error

Fix the logic in the test or page object. Use page objects to encapsulate interactions and selectors. If the failure indicates a real app bug, **warn the user** instead of masking it — never change the expected result of a test just to make it pass (see [[feedback-never-game-tests]]).

### Step 2b — Timeout / timing

**Start simple.** Add a wait at the key point and see if it resolves:

```ts
cy.wait(500)
```

If it resolves, timing is confirmed. **Then eliminate the fixed wait** by replacing it with a deterministic approach:

- `cy.get(...).should("be.visible")` / `should("exist")` / `should("contain", ...)`
- Assert on the expected state before proceeding
- `cy.intercept(...)` + `cy.wait("@alias")` to wait for requests

### Step 2c — Hard test

Go straight to **debug**. Add multiple debug points to understand the state:

```ts
cy.then(() => console.log(...))
cy.screenshot("debug-step-x")
cy.get(...).then($el => console.log($el.text()))
```

Narrow down the hypothesis until you find the root cause. Only then fix it. **Remove all debug code** afterwards.

### Step 3 — Validate

Run the spec again with `.only` until it passes consistently. Remove `.only` and debug code. Tell the user what the issue was and how it was fixed.

## Project reminders

- The **user runs the full Cypress E2E suite**; this skill is for diagnosing/fixing individual specs headless (see [[feedback-testing]]).
- A Cypress failure may be a test problem (waits/timing), not an app bug (see [[feedback-cypress-debug]]).
