import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type DateAndTime = {
  date: string;
  time?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDateAndTime(date: Date | string): DateAndTime {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const time = date.toTimeString().split(' ')[0];
  const formattedTime = time.slice(0, 5);

  return { date: `${day}.${month}.${year}`, time: formattedTime };
}

export function findTimeDifference(departureTime: Date | string, arrivalTime: Date | string): string {
  if (typeof departureTime === 'string') {
    departureTime = new Date(departureTime);
  }
  if (typeof arrivalTime === 'string') {
    arrivalTime = new Date(arrivalTime);
  }

  const diffInMs = arrivalTime.getTime() - departureTime.getTime();
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
}
