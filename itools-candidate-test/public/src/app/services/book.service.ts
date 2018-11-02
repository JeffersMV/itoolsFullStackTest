import {Injectable} from '@angular/core';
import {BaseApiService} from "./configuration/base-api.service";
import {BookFilterModel} from "../models/filter-models/book-filter.model";


@Injectable()
export class BookService extends BaseApiService {
    private apiBooksUrl = `/api/books/`;

    getBooks() {
        return this.get(this.apiBooksUrl);
    }

    getBookById(bookId: number) {
        return this.get(this.apiBooksUrl+ bookId);
    }

    updateBook(bookId: number, book: object) {
        return this.put(this.apiBooksUrl+ bookId, book);
    }

    createBook(book: object) {
        return this.post(this.apiBooksUrl, book);
    }

    deleteBook(bookId: number) {
        return this.delete(this.apiBooksUrl+ bookId);
    }

    getBookSearch(page: number, size: number, customFilters: BookFilterModel, sortField: string, sortOrder: number) {
        return this.getPerPage(this.apiBooksUrl+`search`, page, size, customFilters, null, sortField, sortOrder);
    }
}