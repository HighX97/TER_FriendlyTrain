import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Publication } from './publication';
import { PublicationDetailComponent } from './publication-detail.component';
import { PublicationService } from './publication.service';

@Component({
  selector: 'my-publications',
  templateUrl: 'app/Publication/publications.component.html',
  styleUrls:  ['app/Publication/publications.component.css'],
  directives: [PublicationDetailComponent]
})
export class PublicationsComponent implements OnInit {
  publications: Publication[];
  selectedPublication: Publication;

  constructor(
    private _router: Router,
    private _publicationService: PublicationService) { }

  getPublications() {
    this._publicationService.getPublications().then(publications => this.publications = publications);
  }

  ngOnInit() {
    this.getPublications();
  }

  onSelect(publication: Publication) { this.selectedPublication = publication; }

  gotoDetail() {
    this._router.navigate(['PublicationDetail', { id: this.selectedPublication.id }]);
  }
}
