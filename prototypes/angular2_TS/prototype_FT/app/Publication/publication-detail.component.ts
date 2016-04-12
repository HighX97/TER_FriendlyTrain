import { Component, OnInit } from 'angular2/core';
import {RouteParams} from 'angular2/router';

import { Publication } from './publication';
import { PublicationService } from './publication.service';

@Component({
  selector: 'my-publication-detail',
  templateUrl: 'app/Publication/publication-detail.component.html',
  styleUrls: ['app/Publication/publication-detail.component.css'],
  inputs: ['publication']
})
export class PublicationDetailComponent implements OnInit {
  publication: Publication;

  constructor(
    private _publicationService: PublicationService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._publicationService.getPublication(id)
      .then(publication => this.publication = publication);
  }

  goBack() {
    window.history.back();
  }
}
