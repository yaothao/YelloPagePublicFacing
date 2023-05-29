import { TSite } from '@/types/TSite';
import { convertRecordToTSiteRecord, searchKeywordToRegex } from '@/utils';
import { table } from '@/utils/Airtable';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;

  const searchKeyword = searchParams.get('search');

  let tableQuery = {
    view: 'Grid view',
    filterByFormula: ``,
  };

  // If query is present, filter by query keyword
  if (searchKeyword) {
    const regex = searchKeywordToRegex(searchKeyword);
    tableQuery.filterByFormula = `OR(REGEX_MATCH( {category}, '${regex}'), REGEX_MATCH( {book_name}, '${regex}'), REGEX_MATCH( {url_name}, '${regex}'))`;
  }

  const sites: TSite[] = await table
    .select(tableQuery)
    .all()
    .then((records: any) => {
      if (!records) {
        console.error('No records');
        return;
      }
      return records.map((record: any) => {
        return convertRecordToTSiteRecord(record);
      });
    })
    .catch((err: Error) => {
      console.error(err);
    });

  return NextResponse.json(sites);
}
