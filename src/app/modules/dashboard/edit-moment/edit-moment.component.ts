import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentsService } from 'src/app/services/moments.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface Tags {
  name: string;
}
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss'],
})
export class EditMomentComponent implements OnInit {
  getMomentByIdSubscription: Subscription;
  public momentForm: FormGroup;
  momentTitle: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: any[] = [];
  loading: boolean;
  file: File = null;
  imageURL: any;
  momentId: string;
  nav = false;

  constructor(
    private momentService: MomentsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
  ) {
    this.userService._nav.subscribe((navState: boolean) => {
      this.nav = navState;
      this.onNav();
    });
  }

  ngOnInit(): void {
    this.momentId = this.route.snapshot.params['momentId'];
    console.log(this.momentId);
    this.getMomentById(this.momentId);
  }
  onNav() {
    if (this.nav) {
      document.getElementById('main-container').style.marginLeft = '150px';
    } else {
      document.getElementById('main-container').style.marginLeft = '0px';
    }
    this.nav = !this.nav;
  }
  getMomentById(momentId) {
    this.getMomentByIdSubscription = this.momentService
      .getMoment(momentId)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.momentTitle = res.moment[0].title;
          this.tags = res.moment[0].tags;
          this.imageURL = res.moment[0].imageUrl;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  onChange(event) {
    this.file = event.target.files[0];
    console.log(this.file.type.includes('image'));
  }
  onUpload() {
    console.log(this.file);
    if (this.file && this.file.type.includes('image')) {
      this.loading = !this.loading;
      this.momentService.uploadImage(this.file).subscribe((event: any) => {
        console.log(event);
        this.imageURL = event.data;
        if (typeof event === 'object') {
          this.loading = false; // Flag variable
        }
      });
    } else {
      console.log('Upload Images Only');
    }
  }
  onEdit() {
    const payload = {
      tags: this.tags,
      momentId: this.momentId,
      title: this.momentTitle,
      imageUrl: this.imageURL,
    };
    console.log(payload);
    if (this.momentTitle && this.tags && this.imageURL) {
      this.momentService.editMoment(payload).subscribe(
        (res) => {
          console.log('_____------------_______', res);
          this.router.navigate(['/dashboard/moments-list']);
        },
        (err) => {
          console.log('*******', err);
        }
      );
    }
  }
}
