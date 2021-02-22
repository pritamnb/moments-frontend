import { Component, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MomentsService } from 'src/app/services/moments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
export interface Tags {
  name: string;
}
@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss'],
})
export class AddMomentComponent implements OnInit, OnDestroy {
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
  createMomentSubscription: Subscription;
  uploadImageSubscription: Subscription;
  constructor(private momentService: MomentsService, private router: Router) {}

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
    if (this.file && this.file.type.includes('image')) {
      this.loading = !this.loading;
      this.uploadImageSubscription = this.momentService
        .uploadImage(this.file)
        .subscribe((event: any) => {
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
    if (this.momentTitle && this.tags && this.imageURL) {
      this.createMomentSubscription = this.momentService
        .createMoment(payload)
        .subscribe(
          (res) => {
            console.log('_____------------_______', res);
            this.router.navigate(['/dashboard/moments-list']);
          },
          (err) => {
            console.log('*******', err);
          }
        );
    } else {
      console.log('Select required fields');
    }
  }
  /**
   * while component destroying
   */
  ngOnDestroy() {
    if (this.createMomentSubscription) {
      this.createMomentSubscription.unsubscribe();
    }
    if (this.uploadImageSubscription) {
      this.uploadImageSubscription.unsubscribe();
    }
  }
}
