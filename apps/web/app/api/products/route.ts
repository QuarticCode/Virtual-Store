import { NextResponse } from 'next/server';
import { fetchProductsServer } from '@/lib/api/services/products/service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const lastProductIndex = Number(searchParams.get('lastProductIndex') || '0');
    const itemsPerPage = Number(searchParams.get('itemsPerPage') || '10');
    const keyword = searchParams.get('keyword') || undefined;
    
    const categoryIds = searchParams.getAll('categoryIds')
      .map(id => Number(id))
      .filter(id => !isNaN(id) && id > 0);

    const filters = keyword || categoryIds.length > 0
      ? { keyword, categoryIds }
      : undefined;

    const data = await fetchProductsServer({
      lastProductIndex,
      itemsPerPage,
      filters,
    });

    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}