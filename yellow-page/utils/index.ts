import { TSite } from '@/types/TSite';
import { FieldSet } from 'airtable';

export function convertUTCTimestamp(timestamp: string): Date {
  const year = parseInt(timestamp.slice(0, 4));
  const month = parseInt(timestamp.slice(4, 6)) - 1; // Month is zero-indexed in Date object
  const day = parseInt(timestamp.slice(6, 8));
  const hour = parseInt(timestamp.slice(8, 10));
  const minute = parseInt(timestamp.slice(10, 12));
  const second = parseInt(timestamp.slice(12, 14));
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

export function convertDateToUTCString(date: Date): string {
  return new Date(date)
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, -3); // Remove milliseconds
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

export function convertRecordToTSiteRecord(record: any | FieldSet): TSite {
  return {
    id: record.id || '',
    url_name: record.get('url_name') || '',
    showcase_timestamp:
      convertUTCTimestamp(record.get('showcase_timestamp')) || '',
    available_timestamps:
      record.get('available_timestamps').map(convertUTCTimestamp) || '',
    year_published: record.get('year_published') || '',
    url: record.get('url') || '',
    book_name: record.get('book_name') || '',
    category: record.get('category') || '',
  };
}

export function searchKeywordToRegex(searchKeyword: string): string {
  if (searchKeyword.charAt(0) == '“' || searchKeyword.charAt(0) == '"') {
    return searchKeyword.replace('“', '').replace('”', '').replaceAll('"', '');
  }
  return '^.*([' + searchKeyword + ']){2,}.*$';
}
