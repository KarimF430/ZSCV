import { NextRequest, NextResponse } from 'next/server';

// Use Node.js runtime for better compatibility
// export const runtime = 'edge';

// Cache configuration - disabled for development to ensure fresh data
const CACHE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Vary': 'Accept-Encoding',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    console.log(`🚀 API Route: GET /api/brands (includeInactive: ${includeInactive})`);
    
    const startTime = Date.now();
    
    // Direct fetch to backend instead of using brandApi
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5001';
    const backendResponse = await fetch(`${backendUrl}/api/brands`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend responded with ${backendResponse.status}`);
    }

    const brands = await backendResponse.json();
    const duration = Date.now() - startTime;

    console.log(`✅ Fetched ${brands.length} brands in ${duration}ms`);

    // Transform brands for frontend consumption
    const transformedBrands = brands
      .filter((brand: any) => includeInactive || brand.status === 'active')
      .sort((a: any, b: any) => a.ranking - b.ranking)
      .map((brand: any) => ({
        id: brand.id,
        name: brand.name,
        logo: brand.logo ? `${backendUrl}${brand.logo}` : `/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        ranking: brand.ranking,
        status: brand.status,
        summary: brand.summary || `${brand.name} - Premium automotive brand`,
        description: brand.summary ? brand.summary.split('.')[0] + '.' : 'Premium automotive brand',
        popularModel: brand.name === 'Honda' ? 'City' : 
                     brand.name === 'Maruti Suzuki' ? 'Swift' :
                     brand.name === 'Hyundai' ? 'Creta' :
                     brand.name === 'Tata' ? 'Nexon' : 'Popular Model',
        startingPrice: brand.name === 'Honda' ? '₹7.71 Lakh' :
                      brand.name === 'Maruti Suzuki' ? '₹3.54 Lakh' :
                      brand.name === 'Hyundai' ? '₹5.89 Lakh' :
                      brand.name === 'Tata' ? '₹5.12 Lakh' : '₹6.00 Lakh',
        href: `/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`,
        models: '6+ Models',
        faqs: brand.faqs || []
      }));

    const response = NextResponse.json({
      success: true,
      data: transformedBrands,
      meta: {
        total: transformedBrands.length,
        includeInactive,
        timestamp: new Date().toISOString(),
        processingTime: duration
      }
    });

    // Set cache headers for performance
    Object.entries(CACHE_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error('❌ Error in GET /api/brands:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch brands',
      timestamp: new Date().toISOString()
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
