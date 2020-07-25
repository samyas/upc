import { ModuleFile } from './../model/file-descriptor.model';
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { map } from 'rxjs/operators';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

import * as FileSaver from 'file-saver';
import { FileDescriptor } from '../model/file-descriptor.model';

@Injectable()
export class FileDownloadService {


  public static readonly DOWNLOAD_URI = environment.baseUrl + 'files/';
  constructor(private http: HttpClient) {}

    downloadFile(id: string, fileName: string, contentType: string) {
        const options = new HttpHeaders({'responseType': 'blob' });

         this.http.get(FileDownloadService.DOWNLOAD_URI  + 'download?key=' + id, {'responseType': 'blob' })
         .subscribe(res => {
           // window.open(window.URL.createObjectURL(res));
           this.showFile(res, fileName, contentType);
          }, error => console.log('Error downloading the file'),
          () => console.log('File downloaded successfully'));
    }
    showFile(blob, fileName, contentType) {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        const newBlob = new Blob([blob], {type: contentType});

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = fileName;
      //  link.className = 'display: none';
        link.click();
        setTimeout(function() {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
        }, 100);
      }



      fileList(id: string): Observable<Array<ModuleFile>> {
        return this.http.get<Array<ModuleFile>>(FileDownloadService.DOWNLOAD_URI  + 'list?moduleId=' + id);
      }

















       /*  .subscribe(response => {
                     let blob: any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
                     const url = window.URL.createObjectURL(blob);
                     window.open(url);
                  //  window.location.href = response.url;
                    // fileSaver.saveAs(blob, 'employees.json');
                    }, error => console.log('Error downloading the file'),
                      () => console.log('File downloaded successfully')
                );
            }*/

    /*    xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        // Xhr callback when we get a result back
        // We are not using arrow function because we need the 'this' context
        xhr.onreadystatechange = function() {

            // We use setTimeout to trigger change detection in Zones
           // setTimeout( () => { self.pending = false; }, 0);
           let filename: string = "default.pdf"
            // If we get an HTTP status OK (200), save the file using fileSaver
            if(xhr.readyState === 4 && xhr.status === 200) {

                 var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                        }
                    }

                var blob = new Blob([this.response], {type: 'application/pdf'});
                FileSaver.saveAs(blob, filename);
            }
        };

        // Start the Ajax request
        xhr.send();*/
}
