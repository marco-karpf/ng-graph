import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  nodeName: string;
  joke: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.nodeName = data.nodeName;
    this.joke = data.text;
  }


}
