import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addpost-dialog',
  templateUrl: './addpost-dialog.component.html',
  styleUrls: ['./addpost-dialog.component.scss'],
})
export class AddpostDialogComponent implements OnInit {
  newPost!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.newPost = fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {}

  handleCreatePost() {
    console.log(this.newPost);
  }
}
