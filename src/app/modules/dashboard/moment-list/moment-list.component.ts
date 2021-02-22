import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MomentsService } from 'src/app/services/moments.service';
import { UserService } from 'src/app/services/user.service';

export interface PeriodicElement {
  image: string;
  SrNo: number;
  title: string;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { SrNo: 0, image: 'null', title: 'null', action: 'null' },
];

@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.scss'],
})
export class MomentListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['no', 'image', 'title', 'tags', 'action'];
  dataSource = new MatTableDataSource();
  deleteMomentSubscription: Subscription;
  nav = false;

  constructor(
    private momentervice: MomentsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public userService: UserService
  ) {
    this.userService._nav.subscribe((navState: boolean) => {
      this.nav = navState;
      this.onNav();
    });
  }

  ngOnInit(): void {
    this.listAllMoments();
  }
  onNav() {
    if (this.nav) {
      document.getElementById('main-container').style.marginLeft = '250px';
    } else {
      document.getElementById('main-container').style.marginLeft = '0px';
    }
    this.nav = !this.nav;
  }
  listAllMoments(): void {
    this.momentervice.listAllMoments().subscribe(
      (res: any) => {
        console.log(res);
        if (res.list) {
          this.dataSource = new MatTableDataSource(res.list.moments);
          this.cdr.detectChanges();
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          setTimeout(() => (this.dataSource.sort = this.sort));
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editMoment(moment) {
    console.log(moment);
    this.momentervice.setEditMoment(moment);
    this.router.navigate([`/dashboard/edit-moment/${moment._id}`]);
  }
  deleteMoment(moment) {
    console.log(moment);
    this.deleteMomentSubscription = this.momentervice
      .deleteMoment(moment)
      .subscribe(
        (res) => {
          console.log(res);
          this.listAllMoments();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
