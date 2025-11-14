/**
 * Projects API Route
 * GET endpoint to fetch projects from the database
 * Because hardcoding data is so 2010
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const featured = searchParams.get('featured');

    // If slug is provided, fetch specific project
    if (slug) {
      const project = await prisma.project.findMany({
        where: { slug },
      });
      return NextResponse.json(project);
    }

    // If featured filter is applied
    if (featured === 'true') {
      const projects = await prisma.project.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(projects);
    }

    // Otherwise, fetch all projects
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
