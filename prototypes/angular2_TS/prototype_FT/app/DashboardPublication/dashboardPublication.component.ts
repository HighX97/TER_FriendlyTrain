import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Publication } from '../Publication/publication';
import { PublicationService } from '../Publication/publication.service';

@Component({
  selector: 'my-dashboardPublication',
  templateUrl: 'app/DashboardPublication/dashboardPublication.component.html',
  styleUrls: ['app/DashboardPublication/dashboardPublication.component.css']
})
export class DashboardPublicationComponent implements OnInit {

  publication: Publication[] = [];

  constructor(
    private _router: Router,
    private _publicationService: PublicationService) {
  }

  ngOnInit() {
    this._publicationService.getPublications()
      .then(publications => this.publications = publications.slice(1,publications.length));
  }

  gotoDetail(publication: Publication) {
    let link = ['PublicationDetail', { id: publication.id }];
    this._router.navigate(link);
  }
}
