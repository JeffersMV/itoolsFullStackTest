import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
    public display: boolean = false;
    @Input()
    get displayDialogAddAuthor() {
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
