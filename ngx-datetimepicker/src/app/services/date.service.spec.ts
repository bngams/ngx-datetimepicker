/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DateService } from './date.service';


describe('AppComponent', () => {
  let dateService: DateService;

  beforeEach(() => {
    dateService = new DateService();
  });

  it('Should not be null', () => {
    expect(dateService).toBeTruthy();
  });

  it('Should return count to be 35 when given Feb 2017', () => {
    const response = dateService.getDateList(2, 2017);

    expect(response.length).toBe(35);

  });

  it('Should return the last 3 days in January 2017 when given Feb 2017', ()=>{
    const response = dateService.getPreviousMonthDays(2, 2017);

    expect(response.length).toBe(3);
    expect(response[0].day).toBe(29);
    expect(response[0].month).toBe(1);
    expect(response[1].day).toBe(30);
    expect(response[1].month).toBe(1);
    expect(response[2].day).toBe(31);
    expect(response[2].month).toBe(1);
  });

  it('Should return the first 4 days in march when given Feb 2017', ()=>{
    const response = dateService.getNextMonthDays(2, 2017);

    expect(response.length).toBe(4);

    expect(response[0].day).toBe(1);
    expect(response[0].month).toBe(3);
    expect(response[3].day).toBe(4);
    expect(response[3].month).toBe(3);
  });

  it('should return "May" when givin 5/1/2017',()=>{
    expect(dateService.getMonthText(new Date('5/1/2017'))).toEqual('May');
  });

   it('should return 12 months',()=>{
    expect(dateService.getMonths().length).toEqual(12);
  });

  it('should return all the days in Feb 2017',()=>{
    const response = dateService.getCurrentMonthDays(2, 2017);

    expect(response.length).toBe(28);

    expect(response[0].day).toBe(1);
    expect(response[0].date.toUTCString()).toBe(new Date('2/1/2017').toUTCString());
    expect(response[0].month).toBe(2);
    expect(response[27].day).toBe(28);
    expect(response[27].month).toBe(2);
    expect(response[27].date.toUTCString()).toBe(new Date('2/28/2017').toUTCString());

  });


 it('should return years going back 80 years and forward 10',()=>{
    const response = dateService.getAvailableYears();

    expect(response.length).toBe(86);
  });

  it('should format the supplied date to MM/DD/YYYY',()=>{
    const formattedDate = dateService.formateMMDDYYYY(new Date('2/23/2017'));

    expect(formattedDate).toBe('2/23/2017');
  });

  it('should return an empty string when the supplied a string',()=>{
    const formattedDate = dateService.formateMMDDYYYY(<any>'warrior cats');

    expect(formattedDate).toBe('');
  });
});
