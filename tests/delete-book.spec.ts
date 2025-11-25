// Test case: verifies that an user can delete a book successfully

import {test,expect} from '../src/fixtures/Login.fixture';
import { BooksPage } from '../src/pages/BooksPage';
import { validBooks } from '../src/data/bookData';


test('User can delete a book', async({page})=>{

    const booksPage=new BooksPage(page);

    await booksPage.addBookNavButton;

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