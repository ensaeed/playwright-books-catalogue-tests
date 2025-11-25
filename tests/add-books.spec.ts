// Test case: verifies that an user can add a book successfully

import {test, expect} from '../src/fixtures/Login.fixture';
import { BooksPage } from '../src/pages/BooksPage';
import { validBooks } from '../src/data/bookData';


for (const bookdata of validBooks){


test ('User can add a book' + bookdata.title ,  async ({page}) =>{
    const booksPage=new BooksPage(page);

    const unique =Date.now().toString();

    const book={
        title:bookdata.title+' '+unique,
        author:bookdata.author,
        isbn:bookdata.author+' '+unique,
        genre:bookdata.genre,
        publicationDate:bookdata.publicationDate,
        price:bookdata.price

    };
    await booksPage.openAddBookForm();

    await booksPage.addBook(book);

    const row = page.getByRole('row',{name:book.title});

    await expect(row).toBeVisible();
    await expect(row).toContainText(book.author);

})
}