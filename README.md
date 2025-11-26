
Playwright Test scripts for libarary management system/Books Inventory system

The tests are written in Typesscript and Playwright following page-object model (POM) and environment-based configuration.

This repository demonstrates:

- Playwright testing framework with TypeScript
- Page Object Model (POM) architecture
- Positive and negative test scenarios
- Book management workflows
  - Add book
  - Delete book
  - Validation for mandatory fields (e.g., missing title)
- Use of fixtures for authenticated sessions
- Use of `.env` for managing test credential
- Use of data file for data-driven testing

```txt
playwright-library-catalogue-tests/
├─ src/
│  ├─ pages/
│  │  ├─ LoginPage.ts
│  │  └─ BooksPage.ts
│  │
│  └─ data/
│     ├─ bookData.ts
│     └─ invalidBooks.ts
│
├─ fixtures/
│  └─ authTest.ts          # your login fixture
│
├─ tests/
│  ├─ login/
│  │  ├─ login-positive.spec.ts
│  │  └─ login-negative.spec.ts
│  │
│  ├─ add-book.spec.ts
│  ├─ add-book-negative.spec.ts      # cannot add book without title
│  ├─ delete-book.spec.ts
│  └─ edit-book-price.spec.ts
│
├─ .env                     # credentials + baseURL
├─ package.json
├─ playwright.config.ts
└─ README.md
```
