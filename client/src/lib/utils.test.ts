import { extractDateAndTime, findTimeDifference } from './utils';

describe('utils functions', () => {
  it('should extract date and time from Date object', () => {
    const testDate = new Date('2023-12-25T15:30:00');
    const result = extractDateAndTime(testDate);

    expect(result).toEqual({
      date: '2023.12.25',
      time: '15:30',
    });
  });

  it('should extract date and time from date string', () => {
    const result = extractDateAndTime('2023-12-25T15:30:00');

    expect(result).toEqual({
      date: '25.12.2025',
      time: '15:30',
    });
  });

  it('should handle single digit months and days', () => {
    const testDate = new Date('2023-01-05T09:30:00');
    const result = extractDateAndTime(testDate);

    expect(result).toEqual({
      date: '2023-01-05',
      time: '09:30',
    });
  });

  it('should calculate time difference with Date objects', () => {
    const departureTime = new Date('2023-12-25T10:00:00');
    const arrivalTime = new Date('2023-12-25T13:30:00');

    const result = findTimeDifference(departureTime, arrivalTime);

    expect(result).toBe('3h 30m');
  });

  it('should calculate time difference with date strings', () => {
    const result = findTimeDifference('2023-12-25T15:00:00', '2023-12-25T18:45:00');

    expect(result).toBe('3h 45m');
  });

  it('should handle time difference spanning multiple days', () => {
    const departureTime = new Date('2023-12-25T22:00:00');
    const arrivalTime = new Date('2023-12-26T02:30:00');

    const result = findTimeDifference(departureTime, arrivalTime);

    expect(result).toBe('4h 30m');
  });

  it('should handle zero minute differences', () => {
    const result = findTimeDifference('2023-12-25T10:00:00', '2023-12-25T12:00:00');

    expect(result).toBe('2h 0m');
  });
});
