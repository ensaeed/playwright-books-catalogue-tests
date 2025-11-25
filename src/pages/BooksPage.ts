// Page Object Model for the Books Page- supports adding, editing, and deleting books.


import {Page, Locator} from '@playwright/test';
import { title } from 'process';



export class BooksPage {

    readonly page:Page;

    readonly addBookNavButton:Locator;
    readonly titleInput:Locator;
    readonly authorInput:Locator;
    readonly genreSelect: Locator;
    readonly isbnInput: Locator;
    readonly publicationDateInput: Locator;
    readonly priceInput:Locator;
    readonly addBooksSubmitButton: Locator;
    readonly saveChangesBookButton: Locator;
    readonly priceEdit:Locator;

    constructor(page:Page){
        this.page=page;

        this.addBookNavButton=page.getByRole('button',{name:'Add Book'}).first();
        this.titleInput=page.getByLabel(/title/i);
        this.authorInput=page.getByLabel(/author/i);
        this.genreSelect=page.getByLabel(/genre/i);
        this.isbnInput=page.getByLabel(/isbn/i);
        this.publicationDateInput=page.getByLabel(/publication date/i);
        this.priceInput=page.getByLabel(/price/i);
        this.priceEdit=this.page.locator('input[name="price"]');
        this.addBooksSubmitButton=page.getByRole('button',{name:/Submit Add New Book Form/i});
        this.saveChangesBookButton=page.getByRole('button',{name:/save changes/i});

    }
    async openAddBookForm(){
        await this.addBookNavButton.click();
    }

    async addBook(book:any)
        
    {
        await this.titleInput.fill(book.title);
        await this.authorInput.fill(book.author);
        await this.genreSelect.selectOption({label: book.genre});
        await this.isbnInput.fill(book.isbn);
        await this.publicationDateInput.fill(book.publicationDate);
        await this.priceInput.fill(book.price);

        await this.addBooksSubmitButton.click();


    }

    getBookRow(title:string):Locator{
        return this.page.getByRole('row',{name:title});

    }
    getDeleteButtonForBook(title:string):Locator{
        return this.getBookRow(title).getByRole('button',{name:/delete/i});
    }

    async deleteBook(title:string){
        await this.getDeleteButtonForBook(title).click();

    }

  }




