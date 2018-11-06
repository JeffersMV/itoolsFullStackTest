import {Component, OnInit} from '@angular/core';
import {SortOrderEnum} from "../../constants";
import {SettingsService} from "../../services/configuration/settings.service";
import {PagingResultModel} from "../../models/paging-result.model";
import {LazyLoadEvent} from "primeng/api";
import {BookModel} from "../../models/view-models/book.model";
import {BookFilterModel} from "../../models/filter-models/book-filter.model";
import {BookService} from "../../services/book.service";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
    public books: BookModel[];
    public customFilters: BookFilterModel = new BookFilterModel;
    public sortOrderEnum = SortOrderEnum;
    public totalRecords: number = 0;
    public displayDialogAddBook: boolean = false;
    private page: number;
    private size: number;
    private sortField?: string;
    private sortOrder?: number;
    private subscription: any = null;

    constructor(private bookService: BookService, public settingsService: SettingsService) {
    }

    ngOnInit() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.bookService.getBooks().subscribe(
            (data: PagingResultModel<BookModel>) => {
                this.books = data['books'];
            },
            (err: any) => {
                console.error(err);
            }
        );
    }

    lazyLoadBooks(event: LazyLoadEvent) {
        this.page = event.first / event.rows;
        this.size = event.rows;
        this.sortField = event.sortField;
        this.sortOrder = event.sortOrder;
        this.loadData();
    }

    loadData() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.bookService.getBookSearch(this.page, this.size, this.customFilters, this.sortField, this.sortOrder).subscribe(
            (data: PagingResultModel<BookModel>) => {
                this.totalRecords = data.total;
                this.books = data.items;
            },
            (err: any) => {
                console.error(err);
            }
        );
    }

    create(event: any) {
        // let books = [...this.books];
        // this.bookService.createBook(this.book).subscribe(book => {
        //     this.book = book[0];
        //     books.push(this.book);
        //     this.books = books;
        //     this.book = null;
        //     this.displayDialogAddBook = false;
        // });
    }

}
