import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MomentsService } from 'src/app/services/moments.service';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Tags {
  name: string;
}
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss'],
})
export class EditMomentComponent implements OnInit {
  public momentForm: FormGroup;
  momentTitle: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [];
  loading: boolean;
  file: File = null;
  imageURL: any;
  constructor(
    private momentService: MomentsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.momentService._editMomentObservable.subscribe((res) => {
      console.log('------------------moment', res);

      this.momentTitle = res.title;
      this.tags = res.tags;
      this.imageURL = res.imageUrl;
    });
  }

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Tags): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  onChange(event) {
    this.file = event.target.files[0];
  }
  onUpload() {
    console.log(this.file);
    if (this.file) {
      this.loading = !this.loading;
      this.momentService.uploadImage(this.file).subscribe((event: any) => {
        console.log(event);
        this.imageURL = event.data;
        if (typeof event === 'object') {
          this.loading = false; // Flag variable
        }
      });
    }
  }
  onEdit() {
    const payload = {
      title: this.momentTitle,
      tags: this.tags.map((tag) => tag.name),
      imageUrl: this.imageURL,
    };
    console.log(payload);
    this.momentService.editMoment(payload).subscribe(
      (res) => {
        console.log('_____------------_______', res);
        this.router.navigate(['/dashboard/list-moment']);
      },
      (err) => {
        console.log('*******', err);
      }
    );
  }
}
