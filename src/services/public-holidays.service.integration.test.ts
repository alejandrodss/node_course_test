import axios from 'axios';
import { PublicHoliday, PublicHolidayShort } from '../types';
import * as PublicHolidayService from './public-holidays.service';

describe('Get list of public Holidays', () => {
  test('should return a list of public holidays when calling holidays API', async () => {
    const currentYear: number = new Date().getFullYear();
    const holidaysResponse = await PublicHolidayService.getListOfPublicHolidays(currentYear, 'FR');
    expect(holidaysResponse.length).toBeGreaterThan(0);
  });
});

/*
* This test can create an unstable test
describe('Check if today is a Public Holiday', () => {
  test('should return true or false', async () => {
    const holidaysResponse = await PublicHolidayService.checkIfTodayIsPublicHoliday('FR');
    expect(holidaysResponse).toEqual(true) or false;
  });
});*/

describe('Get Next Public Holidays', () => {
  test('Should return a list of public Holidays when calling holidays API', async () => {
    const holidaysResponse = await PublicHolidayService.getNextPublicHolidays('FR');
    expect(holidaysResponse.length).toBeGreaterThan(0);
  });
});
