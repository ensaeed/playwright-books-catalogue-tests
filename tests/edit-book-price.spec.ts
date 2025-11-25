// The user can edit the price of the book


import {test,expect} from '../src/fixtures/Login.fixture';
import { LoginPage } from '../src/pages/LoginPage';
import { validBooks } from '../src/data/bookData';
import { BooksPage } from '../src/pages/BooksPage';
import { title } from 'process';

test('User can edit a book', async({page})=>{

    const booksPage= new BooksPage(page);

    const base =validBooks[0];
    const unique = Date.now().toString();

    const book ={
        title:base.title+''+unique,
        author:base.author,
        isbn:base.isbn+''+unique,
        genre:base.genre,
        publicationDate:base.publicationDate,
        price:base.price
    }
await booksPage.openAddBookForm();
await booksPage.addBook(book);

//Find the row where book is just added

const row =page.getByRole('row',{name:book.title});
await expect(row).toBeVisible();

await row.getByRole('button',{name:/edit/i}).click();

const newPrice='13.95';

await booksPage.priceEdit.fill('');
await booksPage.priceEdit.fill(newPrice);
await booksPage.saveChangesBookButton.click();

const updatedRow=page.getByRole('row',{name:book.title});
await expect(updatedRow).toContainText(newPrice);

    

})