import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MomentsService } from 'src/app/services/moments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface Tags {
  name: string;
}
@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss'],
})
export class AddMomentComponent implements OnInit {
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
  constructor(private momentService: MomentsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.momentFormCreation();
  }
  public momentFormCreation() {
    this.momentForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      tags: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
  }

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
  onSubmit() {
    const payload = {
      title: this.momentTitle,
      tags: this.tags.map((tag) => tag.name),
      imageUrl: this.imageURL,
    };
    console.log(payload);
    this.momentService.createMoment(payload).subscribe(
      (res) => {
        console.log('_____------------_______', res);
      },
      (err) => {
        console.log('*******', err);
      }
    );
  }
}
