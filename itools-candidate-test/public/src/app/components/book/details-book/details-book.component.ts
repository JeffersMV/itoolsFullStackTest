import {Component, OnInit} from '@angular/core';
import {OptionsService} from "../../../services/options.service";
import {SelectItem} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {SelectItemModel} from "../../../models/view-models/select-item.model";

@Component({
    selector: 'app-details-book',
    templateUrl: './details-book.component.html',
    styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {
    displayDialog: boolean;
    selectedAuthor: SelectItemModel<string>;

    public bookInfo: any = {};
    public allAuthors: SelectItem[];
    cols: any[] = [
        {field: 'label', header: 'ID'},
        {field: 'value', header: 'SecondName'},
    ];

    constructor(private bookService: BookService, private optionsService: OptionsService, private activatedRoute: ActivatedRoute, ) {
    }

    ngOnInit() {
        let authorId = this.activatedRoute.snapshot.params['id'];
        this.bookService.getBookById(authorId).subscribe((data: any) => {
            this.bookInfo = data.book;
            this.optionsService.getAutorItems().subscribe((data: any) => {
                this.allAuthors = data.authorItems;
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
