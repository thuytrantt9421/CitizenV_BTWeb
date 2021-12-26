/** Angular */
import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()
export class TypesUtilsService {
  /**
   * Convert number to string and adding '0' before
   *
   * @param value: number
   */
  // padNumber(value: number) {
  //   if (this.isNumber(value)) {
  //     return `0${value}`.slice(-2);
  //   } else {
  //     return '';
  //   }
  // }

  /**
   * Checking value type equals to Number
   *
   * @param value: any
   */
  // isNumber(value: any): boolean {
  //   return !isNaN(this.toInteger(value));
  // }

  /**
   * Covert value to number
   *
   * @param value: any
   */
  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  /** convert Date | iso Date => moment Date */
  checkIsMomentDate(date: any): boolean {
    return moment.isMoment(date);
  }

  checkIsISODate(str: string): boolean {
    if(!str){
      return true;
    }
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(str)) {
      return false;
    }
    return true;
  }

  /**
   * Convert Date to string with 'dd/MM/yyyy' format
   * default: Date => dd/mm/yyyy
   *
   * @param date: Date
   */
  convertDateToClientDateByType(date: Date | any, type?: string): string {
    if (!date) {
      return '';
    }
    if (!type) {
      return moment(date).format('YYYY-MM-DD');
    } else if (type === 'yyyymmdd') {
      return moment(date).format('YYYYMMDD');
    } else if (type === 'yyyy-mm-dd') {
      return moment(date).format('YYYY-MM-DD');
    } else {
      return moment(date).format(type);
    }
  }

  /**
   * Convert Date to string with 'dd/MM/yyyy' format
   * default: Date => dd/mm/yyyy HH:mm
   *
   * @param date: Date
   */
  convertDateToClientDateTimeByType(date: Date | any, type?: string): string {
    if (!date) {
      return '';
    }

    if (type === 'yyyymmdd') {
      return moment(date).format('YYYYMMDD HH:mm');
    } else if (type === 'yyyy-mm-dd') {
      return moment(date).format('YYYY-MM-DD HH:mm');
    } else if (type === 'dd/mm/yy') {
      return moment(date).format('DD/MM/YY HH:mm');
    }

    return moment(date).format('DD/MM/YYYY HH:mm');
  }

  /**
   * Date | iso Date | moment date => to iso date string: "YYYY-MM-DDTHH:mm:ssZ"
   * @param date: Date? || IsoDate
   */
  formatDateToISODate(date: any): string {
    if (!date) {
      return '';
    }
    if (typeof date === 'string') {
      const isoDate = new Date(date);
      return isoDate.toISOString();
    }
    return date.toISOString();
  }

  /**
   * Date | iso Date | moment date => to iso date local string: "YYYY-MM-DDTHH:mm:ss+07:00"
   * @param date: Date? || IsoDate
   */
  formatDateToISODateLocal(date: any): string {
    if (!date) {
      return '';
    }
    return moment(date).format();
  }

  /**
   * Convert (Date || ISO date) to string date with format
   * default: Date => dd/mm/yyyy
   * @param date: Date? | ISO date
   * type: 'yyyymmdd' | 'yyyy-mm-dd' | 'dd/mm/yyyy'
   */
  formatDateToClientDate(
    date: Date | string,
    type?: 'yyyymmdd' | 'yyyy-mm-dd' | 'dd/mm/yyyy' | string
  ): string {
    if (!date) {
      return '';
    }
    if (date instanceof Date) {
      return this.convertDateToClientDateByType(date, type);
    } else {
      const isoDate = new Date(date);
      return this.convertDateToClientDateByType(isoDate, type);
    }
  }

  /**
   * Convert (Date || ISO date) to string date with format
   * default: Date => dd/mm/yyyy HH:mm
   * @param date: Date? | ISO date time
   * type: 'yyyymmdd' | 'yyyy-mm-dd' | 'dd/mm/yyyy'
   */
  formatDateToClientDateTime(
    date: Date | string,
    type?: 'yyyymmdd' | 'yyyy-mm-dd' | 'dd/mm/yyyy' | 'dd/mm/yy'
  ): string {
    if (!date) {
      return '';
    }
    if (date instanceof Date) {
      return this.convertDateToClientDateTimeByType(date, type);
    } else {
      const isoDate = new Date(date);
      return this.convertDateToClientDateTimeByType(isoDate, type);
    }
  }

  // Date | iso Date | moment date => string iso filter (YYYY-MM-DDTHH:mm:ssZ), hh = 17h
  formatDateToISODateStart(date: Date): string {
    if (!date) {
      return '';
    }
    if (typeof date === 'string') {
      const isoDate = new Date(date);
      return isoDate.toISOString();
    }
    return date.toISOString();
  }

  // Date | iso Date | moment date => string iso filter (YYYY-MM-DDT16:59:59+07:00)
  formatDateToISODateEnd(date: any): string {
    if (!date) {
      return '';
    }

    let _date = date;

    if (!this.checkIsMomentDate(date)) {
      _date = this.formatIsoDateToMomentObjectDate(date);
    }

    _date = _date.set('hours', 23).set('minutes', 59).set('seconds', 59);
    return _date.toISOString();
  }

  /**
   * Convert (string ISO date) to moment object date
   * default: string ISO date => Moment Date
   * @param date: string ISO date
   */
  formatIsoDateToMomentObjectDate(date: string): any {
    if (!date) {
      return null;
    }
    const newDate = moment(date);
    return newDate;
  }

  /**
   * default: new Date => 'dd/mm/yyyy hh:mm'
   */
  getClientDateTime(): string {
    const newDate = new Date();
    return moment(newDate).format('DD/MM/YYYY HH:mm');
  }

  // Date => Date add current time
  setCurrentTimeToDate(date: any): any {
    if (!date) {
      return '';
    }
    let _date = date;

    if (!this.checkIsMomentDate(date)) {
      _date = this.formatIsoDateToMomentObjectDate(date);
    }

    const d = _date.date();
    const m = _date.month();
    const y = _date.year();

    const newDateVal = moment.utc();

    newDateVal.set('year', y);
    newDateVal.set('month', m);
    newDateVal.set('date', d);

    return newDateVal;
  }

  // lấy thời gian tới thời điểm hiện tại
  getAboutTimeToNow(isoDateString: string): string {
    if (isoDateString) {
      let timeAgo = moment(isoDateString).fromNow();
      timeAgo = timeAgo
        .replace('a few seconds ago', 'vài giây trước')
        .replace('in a few seconds', 'vài giây trước')
        .replace('a minute ago', 'vài phút trước')
        .replace('minutes ago', 'phút trước')
        .replace('hours ago', 'giờ trước')
        .replace('an hour ago', 'vài giờ trước')
        .replace('days ago', 'ngày trước')
        .replace('a day ago', 'Một ngày trước')
        .replace('a month ago', 'Một tháng trước')
        .replace('a year ago', 'Một năm trước');
      return timeAgo;
    } else {
      return '';
    }
  }

  /**
   * new date string to Moment Date
   * default: date string => Moment Date
   *
   * @param dateString: date string
   * @param type: type format
   */
  getDateStringToMomentDateByType(date: Date | any, type: string): any {
    if (!date) {
      return '';
    }
    return moment(date, type);
  }

  // format money int *.000, hàng nghìn là dấu .
  formatMoney(value: string | number): string {
    /* if (!value) {
      return '';
    }
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); */
    if (value !== undefined) {
      if (value) {
        value = value.toString().replace('.', ',');

        let truocDauPhay = value.substring(0, value.indexOf(','));

        let sauDauPhay = '';

        if (value.indexOf(',') !== -1) {
          sauDauPhay = value.substring(value.indexOf(','), value.length);
        }

        if (truocDauPhay) {
          truocDauPhay = truocDauPhay.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        } else {
          truocDauPhay = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }

        return truocDauPhay + sauDauPhay;
      } else if (value === 0) {
        return '0';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  downloadFileByBase64(
    contentType: string,
    base64Data: string,
    fileName: string
  ): void {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  copyObject(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  getBase64(file: File): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // trim text in string or object
  trimTextInData(paramter: string | any): any {
    if (paramter && typeof paramter === 'string') {
      return paramter.trim();
    }
    if (paramter && typeof paramter === 'object') {
      for (const propName in paramter) {
        if (propName && typeof paramter[propName] === 'string') {
          paramter[propName] = paramter[propName].trim();
        }
      }
    }
    return paramter;
  }

  // trim text verry long to ...
  trimTextThreeDot(text: string, numberCharacter: number = 50): string {
    if (text && text.length > numberCharacter) {
      return text.substring(0, numberCharacter) + '...';
    }
    return text;
  }

  // create node string to html
  createNodeHtml(stringHtml: string) {
    const parser = new DOMParser();
    const context = 'text/html';
    const DOM = parser.parseFromString(stringHtml, context);

    return DOM.body.childNodes[0];
  }

  checkIsValidDateByType(dateString: string, dateFormat: string): boolean {
    const newMomentDate = moment(dateString, dateFormat);
    return newMomentDate.isValid();
  }

  // text có dấu => không dấu
  public formatTextUnsigned(text: string): string {
    if (text) {
      const newText = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
      return newText;
    }
    return '';
  }
}
