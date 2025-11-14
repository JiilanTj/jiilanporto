/**
 * Hit Tracking API Route
 * POST endpoint to track page visits
 * Because analytics are important (or so I'm told)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      );
    }

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Save hit to database
    const hit = await prisma.hit.create({
      data: {
        path,
        userAgent,
      },
    });

    return NextResponse.json(
      { success: true, id: hit.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error tracking hit:', error);
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (path) {
      // Get hits for specific path
      const hits = await prisma.hit.findMany({
        where: { path },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        path,
        count: hits.length,
        hits,
      });
    }

    // Get all hits grouped by path
    const allHits = await prisma.hit.findMany({
      orderBy: { createdAt: 'desc' },
    });

    type HitType = typeof allHits[number];

    // Group by path
    interface GroupedHits {
      [key: string]: HitType[];
    }
    
    const grouped = allHits.reduce((acc: GroupedHits, hit: HitType) => {
      if (!acc[hit.path]) {
        acc[hit.path] = [];
      }
      acc[hit.path].push(hit);
      return acc;
    }, {} as GroupedHits);

    const summary = Object.keys(grouped).map((path) => ({
      path,
      count: grouped[path].length,
    }));

    return NextResponse.json({
      total: allHits.length,
      summary,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
