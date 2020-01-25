import {Component, Injectable} from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<Date> {

  readonly DELIMITER = '-';

  fromModel(value: Date): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
   //   const date = value.get(this.DELIMITER);
      result = {
        day : value.getDate(),
        month : value.getMonth() , // parseInt(date[1], 10),
        year : value.getFullYear()
      };
    }
    return result;
  }

  toModel(date: NgbDateStruct): Date {
    let result: Date = null;
    if (date) {
     // result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
     result = new Date(date.year, date.month, date.day);
    }
    return result;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      const date = value.split(this.DELIMITER);
      result = {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return result;
  }

  format(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
    }
    return result;
  }
}
