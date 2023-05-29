import { TSite } from '@/types/TSite';
import { convertRecordToTSiteRecord } from '@/utils';
import { table } from '@/utils/Airtable';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const site = await table
    .find(id)
    .then((record) => {
      if (!record) {
        console.error('No records');
        return;
      }
      return convertRecordToTSiteRecord(record);
    })
    .catch((err: Error) => {
      console.error(err);
    });

  return NextResponse.json(site);
}
