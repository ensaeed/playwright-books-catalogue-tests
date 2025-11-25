// Test case: verifies that an user cannot a add a book without title

import {test,expect} from '../src/fixtures/Login.fixture';
import { BooksPage } from '../src/pages/BooksPage';
import {invalidBooks} from '../src/data/inValidbooks';


test ('User cannot add a book without title', async({page})=>{

const booksPage=new BooksPage(page);
await booksPage.addBookNavButton.click();

//Get the first record from the invalidbooks object
const book=invalidBooks[0]

booksPage.titleInput.fill(book.title);
booksPage.authorInput.fill(book.author);
booksPage.genreSelect.selectOption({label: book.genre}),
booksPage.isbnInput.fill(book.isbn),
booksPage.publicationDateInput.fill(book.publicationDate),
booksPage.priceInput.fill(book.price);

await booksPage.addBooksSubmitButton.click();

await expect(page).toHaveURL(/\/add-book/);

await expect(page.locator('#title-error')).toBeVisible();


})