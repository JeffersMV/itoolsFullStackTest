import {Injectable} from '@angular/core';
import {BaseApiService} from "./configuration/base-api.service";
import {AuthorFilterModel} from "../models/filter-models/author-filter.model";


@Injectable()
export class AuthorService extends BaseApiService {
    private apiAuthorsUrl = `/api/authors`;

    getAuthors() {
        return this.get(this.apiAuthorsUrl);
    }

    getAuthorById(authorId: number) {
        return this.get(this.apiAuthorsUrl + authorId);
    }

    updateAuthor(authorId: number, author: object) {
        return this.put(this.apiAuthorsUrl + authorId, author);
    }

    createAuthor(author: object) {
        return this.post(this.apiAuthorsUrl, author);
    }

    deleteAuthor(authorId: number) {
        return this.delete(this.apiAuthorsUrl + authorId);
    }

    getAuthorSearch(page: number, size: number, customFilters: AuthorFilterModel, sortField: string, sortOrder: number) {
        return this.getPerPage(this.apiAuthorsUrl+`search`, page, size, customFilters, null, sortField, sortOrder);
    }
}