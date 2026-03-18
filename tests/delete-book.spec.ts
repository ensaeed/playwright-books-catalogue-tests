// Test case: verifies that an user can delete a book successfully

import { test, expect } from '@playwright/test';
import { loginAndWaitForBooksPage } from '../src/helpers/auth.helper';
import { LoginPage } from '../src/pages/LoginPage';
import { BooksPage } from '../src/pages/BooksPage';
import { validBooks } from '../src/data/bookData';

test.beforeEach(async ({ page }) => {
  await loginAndWaitForBooksPage(page);
});

test('User can delete a book', async({page})=>{

    const booksPage=new BooksPage(page);
   // console.log('=== Current URL after login ===', page.url());
 //   console.log('=== Page title after login ===', await page.title());
  
   // await page.getByRole('button', { name: /add book/i }).first().waitFor({ state: 'visible', timeout: 30000 });
    

    const base=validBooks[0];

    const unique=Date.now().toString();

    const book={

        title:base.title+''+unique,
        author:base.author,
        genre:base.genre,
        isbn:base.isbn+''+unique,
        publicationDate:base.publicationDate,
        price:base.price
    }
    await booksPage.openAddBookForm();
    await booksPage.addBook(book);
    const row = booksPage.getBookRow(book.title);
    // 1) Make the locator first
const bookRows = page.getByRole('row');

// 2) Actually CALL count() and await it
const rowsBefore = await bookRows.count();


console.log('Number of books before deletion:', rowsBefore);



    await booksPage.getDeleteButtonForBook(book.title);
    await booksPage.deleteBook(book.title);
    const rowsAfter= await bookRows.count();
    console.log('Number of books before deletion:', rowsAfter);

    await expect (row).not.toBeVisible();

    await expect(booksPage.getBookRow(book.title)).toHaveCount(0);


    }

)