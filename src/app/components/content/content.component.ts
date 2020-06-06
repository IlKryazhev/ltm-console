import { Component, OnInit } from '@angular/core';
import { DetailService } from "../../modals/detail.service";
import { ContentService } from "./content.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  isShowDetails = false;

  backlogTasks = [];
  reviewTasks = [];
  progressTasks = [];
  finishedTasks = [];
  filteredBacklogs = [];

  activeCard;

  content = 'logging';

  constructor(
    private details: DetailService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.contentService.getAllTasks()
      .subscribe((res: Array<any>) => {
        this.backlogTasks = res.filter(data => data.status === 'backlog');
        this.reviewTasks = res.filter(data => data.status === 'review');
        this.progressTasks = res.filter(data => data.status === 'inprogress');
        this.finishedTasks = res.filter(data => data.status === 'success');
        this.assignCopy();
      });
  }

  openModal(id: string, card) {
    this.activeCard = card;
    this.details.open(id);
  }

  trackByFn(index, item) {
    return item.id;
  }

  sortBacklog(param: string) {
    this.filteredBacklogs =
      (param === 'star')
      ? this.filteredBacklogs.sort((a, b) => b.voicesCount - a.voicesCount)
      : (param === 'heart')
        ? this.filteredBacklogs.sort((a, b) => b.likesCount - a.likesCount)
        : this.filteredBacklogs.sort((a, b) => b.sharesCount - a.sharesCount)
  }

  filterByString(param: string) {
    if (!param) {
      this.assignCopy();
    }
    this.filteredBacklogs = Object.assign([], this.backlogTasks).filter(item => item.title.trim().toLowerCase().indexOf(param.trim().toLowerCase()) > -1);
  }

  assignCopy() {
    this.filteredBacklogs = Object.assign([], this.backlogTasks);
  }

  closeModal(id: string) {
    this.details.close(id);
  }

  openContent(page: string) {
    this.content = page;
  }

}
