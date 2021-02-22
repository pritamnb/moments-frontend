import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MomentsService } from 'src/app/services/moments.service';

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

  constructor(private momentervice: MomentsService, private router: Router) {}

  ngOnInit(): void {
    this.listAllMoments();
  }
  listAllMoments(): void {
    this.momentervice.listAllMoments().subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.list.moments);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editMoment(moment) {
    console.log(moment);
    this.momentervice.setEditMoment(moment);
    this.router.navigate(['/dashboard/edit-moment']);
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
