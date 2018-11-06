import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SelectItem} from 'primeng/api';
import {AuthorService} from "../../../services/author.service";
import {OptionsService} from "../../../services/options.service";
import {SelectItemModel} from "../../../models/view-models/select-item.model";

@Component({
    selector: 'app-details-author',
    templateUrl: './details-author.component.html',
    styleUrls: ['./details-author.component.css']
})
export class DetailsAuthorComponent implements OnInit {
    displayDialog: boolean;
    selectedBook: SelectItemModel<string>;

    public authorInfo: any = {};
    public allBooks: SelectItem[];
    cols: any[] = [
        {field: 'label', header: 'ID'},
        {field: 'value', header: 'Name'},
    ];

    constructor(private authorService: AuthorService, private optionsService: OptionsService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let authorId = this.activatedRoute.snapshot.params['id'];
        this.authorService.getAuthorById(authorId).subscribe((data: any) => {
            this.authorInfo = data.author;
            this.optionsService.getBookItems().subscribe((data: any) => {
                console.log(data);
                this.allBooks = data.bookItems;
            });
        });
    }

    delete() {

    }

    save() {

    }

    showDialogToAdd() {
        this.displayDialog = true;
    }
}
