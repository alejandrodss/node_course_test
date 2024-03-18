import request from 'supertest';

const HOLIDAYS_API = 'https://date.nager.at';

describe('Holidays API', () => {
  test('should return 200 and data for a given country', async () => {
    const { status, body } = await request(HOLIDAYS_API).get('/api/v3/CountryInfo/FR');

    expect(status).toEqual(200);
    expect(body).toEqual({
        "commonName": expect.any(String),
        "officialName": expect.any(String),
        "countryCode": expect.any(String),
        "region": expect.any(String),
        "borders": expect.any(Array)
    });
  });

  test('should return 200 and an array of countries', async () => {
    const { status, body } = await request(HOLIDAYS_API).get('/api/v3/AvailableCountries');
    expect(status).toEqual(200);

    body.forEach((country: any) => {
      expect(country).toEqual({
        "countryCode": expect.any(String),
        "name": expect.any(String)
      });
    });
  });

  test('should return 200 and an array of long weekends for the given country', async () => {
    const currentYear: number = new Date().getFullYear();
    const { status, body } = await request(HOLIDAYS_API).get(`/api/v3/LongWeekend/${currentYear}/FR`);
    expect(status).toEqual(200);

    body.forEach((weekend: any) => {
      expect(weekend).toEqual({
        "startDate": expect.any(String),
        "endDate": expect.any(String),
        "dayCount": expect.any(Number),
        "needBridgeDay": expect.any(Boolean)
      });
    });
  });
});
