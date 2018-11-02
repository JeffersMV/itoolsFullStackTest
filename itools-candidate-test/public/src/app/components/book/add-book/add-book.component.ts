import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
    public display: boolean = false;
    @Input()
    get displayDialogAddBook() {
        return this.display;
    }
    set displayDialog(val: any) {
        this.display = val;
        this.displayDialogChange.emit(this.display);
    }
    @Output() displayDialogChange = new EventEmitter();


    constructor() { }

    ngOnInit() {
    }

}
