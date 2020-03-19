/*import { Directive, ElementRef, Input, Renderer, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({ selector: 'img[appImgViewer]' })
export class ImageViewerDirective {

    public static readonly DOWNLOAD_URI = environment.baseUrl + 'files/download/';

    @Input() default: string;
    @Input() id: string;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    onChanges(changes: SimpleChanges) {

        const el = this.el;
        if (this.id) {
              console.log('id img',  ImageViewerDirective.DOWNLOAD_URI + this.id);
               el.nativeElement.src = ImageViewerDirective.DOWNLOAD_URI + this.id;
          } else {
              console.log('default img', this.default);
              el.nativeElement.src = this.default;
          }
    }
}
*/
