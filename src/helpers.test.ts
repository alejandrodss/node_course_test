import { PublicHoliday, PublicHolidayShort } from './types';
import * as Helpers from './helpers';

describe("Validate user's input", () => {
  test('should return true if the year and country are valid', () => {
    const currentYear: number = new Date().getFullYear();
    const validInput = Helpers.validateInput({year: currentYear, country: 'NL'});
    expect(validInput).toEqual(true);
  });

  test('should return true if the year is valid', () => {
    const currentYear: number = new Date().getFullYear();
    const validInput = Helpers.validateInput({year: currentYear});
    expect(validInput).toEqual(true);
  });

  test('should return true if the country is valid', () => {
    const validInput = Helpers.validateInput({country: 'NL'});
    expect(validInput).toEqual(true);
  });

  test('should throw an error if the country is not a valid country', () => {
    expect(() => {
      Helpers.validateInput({ country: 'CO' });
    }).toThrow(new Error('Country provided is not supported, received: CO'));
  });

  test('should throw an error if the year is not a valid year', () => {
    expect(() => {
      Helpers.validateInput({ year: 2023 });
    }).toThrow(new Error('Year provided not the current, received: 2023'));
  });

  test('should throw an error if the country is valid but year not', () => {
    expect(() => {
      Helpers.validateInput({ country: 'NL', year: 2023 });
    }).toThrow(new Error('Year provided not the current, received: 2023'));
  });

  test('should throw an error if the country is not a valid country but the year', () => {
    expect(() => {
      Helpers.validateInput({ year: 2024, country: 'CO' });
    }).toThrow(new Error('Country provided is not supported, received: CO'));
  });

  test('should throw an error if both the country and year are not valid', () => {
    expect(() => {
      Helpers.validateInput({ year: 2023, country: 'CO' });
    }).toThrow(new Error('Country provided is not supported, received: CO'));
  });
});

describe('Shorten Public Holiday', () => {
  const expectedShortenPublicHoliday : PublicHolidayShort = {
    name: 'A Holiday',
    localName: 'British Holiday',
    date: '2024-03-17'
  };

  const publicHoliday: PublicHoliday = {
    date: '2024-03-17',
    localName: 'British Holiday',
    name: 'A Holiday',
    countryCode: 'GB',
    fixed: true,
    global: false,
    counties: null,
    launchYear: 1830,
    types: ["Public"]
  };

  test('should return a shorten Public Holiday for the given Public Holiday', () => {
    expect(Helpers.shortenPublicHoliday(publicHoliday)).toEqual(expectedShortenPublicHoliday);
  })
});
