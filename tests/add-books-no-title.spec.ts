// Test case: verifies that an user cannot a add a book without title

import { test, expect } from '@playwright/test';
import { loginAndWaitForBooksPage } from '../src/helpers/auth.helper';
import { BooksPage } from '../src/pages/BooksPage';
import {invalidBooks} from '../src/data/inValidbooks';

test.setTimeout(60_000);

test.beforeEach(async ({ page }) => {
      await loginAndWaitForBooksPage(page);

   });

test ('User cannot add a book without title', async({page})=>{

const booksPage=new BooksPage(page);
await booksPage.addBookNavButton.click();

//Get the first record from the invalidbooks object
const book=invalidBooks[0]

await booksPage.titleInput.fill(book.title);
await booksPage.authorInput.fill(book.author);
await booksPage.genreSelect.selectOption({label: book.genre});
await booksPage.isbnInput.fill(book.isbn);
await booksPage.publicationDateInput.fill(book.publicationDate);
await booksPage.priceInput.fill(book.price);

await booksPage.addBooksSubmitButton.click();

await expect(page).toHaveURL(/\/add-book/);

await expect(page.locator('#title-error')).toBeVisible();


})