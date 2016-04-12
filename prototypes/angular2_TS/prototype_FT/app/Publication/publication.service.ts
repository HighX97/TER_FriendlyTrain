import { Publication } from './publication';
import { PUBLICATIONS } from './mock-publications';
import { Injectable } from 'angular2/core';

@Injectable()
export class PublicationService {
  getPublications() {
    return Promise.resolve(PUBLICATIONS);
  }

  // See the "Take it slow" appendix
  getPublicationsSlowly() {
    return new Promise<Publication[]>(resolve =>
      setTimeout(()=>resolve(PUBLICATIONS), 2000) // 2 seconds
    );
  }

  getPublication(id: number) {
    return Promise.resolve(PUBLICATIONS).then(
      publications => publications.filter(publication => publication.id === id)[0]
    );
  }
}
