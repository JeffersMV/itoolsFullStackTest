import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../../services/author.service";
import {LazyLoadEvent} from "primeng/api";
import {AuthorModel} from "../../models/view-models/author.model";
import {AuthorFilterModel} from "../../models/filter-models/author-filter.model";
import {SortOrderEnum} from '../../constants';
import {SettingsService} from "../../services/configuration/settings.service";
import {PagingResultModel} from "../../models/paging-result.model";


@Component({
    selector: 'app-autor',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
    public authors: AuthorModel[];
    public customFilters: AuthorFilterModel = new AuthorFilterModel;
    public sortOrderEnum = SortOrderEnum;
    public totalRecords: number = 0;
    public displayDialogAddAuthor: boolean = false;
    private page: number;
    private size: number;
    private sortField?: string;
    private sortOrder?: number;
    private subscription: any = null;

    constructor(private authorService: AuthorService, public settingsService: SettingsService) {
    }

    ngOnInit() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.authorService.getAuthors().subscribe(
            (data: AuthorModel) => {
                this.authors = data['authors'];
            },
            (err: any) => {
                console.error(err);
            }
        );
    }


    lazyLoadAuthors(event: LazyLoadEvent) {
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
        this.subscription = this.authorService.getAuthorSearch(this.page, this.size, this.customFilters, this.sortField, this.sortOrder).subscribe(
            (data: PagingResultModel<AuthorModel>) => {
                this.totalRecords = data.total;
                this.authors = data.items;
            },
            (err: any) => {
                console.error(err);
            }
        );
    }


    create(event: any) {
        // let books = [...this.books];
        // this.dataProviderService.addBook(this.book).subscribe(book => {
        //     this.book = book[0];
        //     books.push(this.book);
        //     this.books = books;
        //     this.book = null;
        //     this.displayDialogAdd = false;
        // });
    }
}
