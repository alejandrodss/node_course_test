import axios from 'axios';
import { PublicHoliday, PublicHolidayShort } from '../types';
import * as PublicHolidayService from './public-holidays.service';

const publicHolidayAPIResponse: PublicHoliday[] = [
  {
    date: '2024-03-17',
    localName: 'Fun Holiday',
    name: 'Fun Holiday',
    countryCode: 'FR',
    fixed: true,
    global: true,
    counties: ['Countie1'],
    launchYear: 1950,
    types: ["Public"]
  },
  {
    date: '2024-05-17',
    localName: 'Other Holiday',
    name: 'Other Holiday',
    countryCode: 'FR',
    fixed: false,
    global: false,
    counties: null,
    launchYear: 1980,
    types: ["Public"]
  },
];

const shortenPublicHolidayExpectedResponse: PublicHolidayShort[] = [
  {
    date: '2024-03-17',
    localName: 'Fun Holiday',
    name: 'Fun Holiday'
  },
  {
    date: '2024-05-17',
    localName: 'Other Holiday',
    name: 'Other Holiday'
  },
];

describe('Get list of public Holidays', () => {
  test('should return a list of public holidays', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: publicHolidayAPIResponse }));
    const currentYear: number = new Date().getFullYear();
    const holidaysResponse = await PublicHolidayService.getListOfPublicHolidays(currentYear, 'FR');
    expect(holidaysResponse).toEqual(shortenPublicHolidayExpectedResponse);
  });

  test('should throw an error if the Country code is not supported', async () => {
    const currentYear: number = new Date().getFullYear();
    await expect(PublicHolidayService.getListOfPublicHolidays(currentYear, 'US')).rejects.toThrow(new Error('Country provided is not supported, received: US'));
  });

  test('should throw an error if the year is not the current year', async () => {
    await expect(PublicHolidayService.getListOfPublicHolidays(2022, 'FR')).rejects.toThrow(new Error('Year provided not the current, received: 2022'));
  });

  test('should return an empty array if the call to Public Holidays API fails', async () => {
    const currentYear: number = new Date().getFullYear();
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('API unavailable')));
    const holidaysResponse = await PublicHolidayService.getListOfPublicHolidays(currentYear, 'FR');
    expect(holidaysResponse).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Check if today is a Public Holiday', () => {
  test('should return true if the received code is 200', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
    const holidaysResponse = await PublicHolidayService.checkIfTodayIsPublicHoliday('FR');
    expect(holidaysResponse).toEqual(true);
  });

  test('should return false if the received code is not 200', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 204 }));
    const holidaysResponse = await PublicHolidayService.checkIfTodayIsPublicHoliday('FR');
    expect(holidaysResponse).toEqual(false);
  });

  test('should return false if the API call fails', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ status: 500 }));
    const holidaysResponse = await PublicHolidayService.checkIfTodayIsPublicHoliday('FR');
    expect(holidaysResponse).toEqual(false);
  });

  test('should throw an error if the country is not a valid country', async () => {
    await expect(PublicHolidayService.checkIfTodayIsPublicHoliday('US')).rejects.toThrow(new Error('Country provided is not supported, received: US'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Get Next Public Holidays', () => {
  test('Should return a list of public Holidays', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: publicHolidayAPIResponse }));
    const holidaysResponse = await PublicHolidayService.getNextPublicHolidays('FR');
    expect(holidaysResponse).toEqual(shortenPublicHolidayExpectedResponse);
  });

  test('should throw an error if the Country code is not supported', async () => {
    await expect(PublicHolidayService.getNextPublicHolidays('US')).rejects.toThrow(new Error('Country provided is not supported, received: US'));
  });

  test('should return an empty array if the call to Public Holidays API fails', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('API unavailable')));
    const holidaysResponse = await PublicHolidayService.getNextPublicHolidays('FR');
    expect(holidaysResponse).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
