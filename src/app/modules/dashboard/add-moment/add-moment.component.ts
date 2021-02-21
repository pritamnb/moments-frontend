import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MomentsService } from 'src/app/services/moments.service';
export interface Tags {
  name: string;
}
@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss'],
})
export class AddMomentComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Tags[] = [];
  loading: boolean;
  file: File = null;
  constructor(private momentService: MomentsService) {}

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Tags): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  onChange(event) {
    this.file = event.target.files[0];
  }
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.momentService.uploadImage(this.file).subscribe((event: any) => {
      console.log(event);

      if (typeof event === 'object') {
        this.loading = false; // Flag variable
      }
    });
  }
}
