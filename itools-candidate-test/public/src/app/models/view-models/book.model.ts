export class BookModel{
    public id: number;
    public name: string;
    public publishing: string;
    public ebook: boolean;
    public year: number;
    public isbn: string;
    public author: object;

    constructor();
    constructor(id: number, name: string, publishing: string, ebook: boolean, year: number, isbn: string, author: object);
    constructor(id?: number, name?: string, publishing?: string, ebook?: boolean, year?: number, isbn?: string, author?: object){
        this.id = id;
        this.name = name;
        this.publishing = publishing;
        this.ebook = ebook;
        this.year = year;
        this.isbn = isbn;
        this.author = author;
    }
}
