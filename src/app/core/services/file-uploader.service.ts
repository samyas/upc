
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { map } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable()
export class FileUploaderService {

  public static readonly UPLOAD_URI = environment.baseUrl + 'files/';
  constructor(private http: HttpClient) {}


  deleteFile(key: string, type: string, id: string): Observable<any> {
    return this.http.post(FileUploaderService.UPLOAD_URI + 'delete?key=' + key + '&type=' + type + '&id=' + id,
    null,  {responseType: 'text'});
  }

  uploadFile(file: any, fileName: string, id: string, type: string) {
    const formData: any = new FormData();
    formData.append('file', file, fileName);
    formData.append('id', id);
    formData.append('type', type);

    return this.http.post(FileUploaderService.UPLOAD_URI + 'upload/', formData,
      {
        responseType: 'text',
     //   headers: {'Content-Type': 'multipart/form-data'} ,
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      console.log('ev ty', event.type);
      switch (event.type) {

       /* case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };*/

        case HttpEventType.Response:
          return event.body;
        // default:
        // return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

   /* let url = this.webApiBaseUrl + FileUploaderService.UPLOAD_URI;
    return Observable.create(function (observer) {
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('uploadFile', file, fileName);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(xhr.response);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

    xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }*/
}
