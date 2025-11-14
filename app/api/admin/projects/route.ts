/**
 * Admin Projects CRUD API
 * For managing the portfolio of suffering
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

// POST - Create new project
export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      slug,
      title,
      description,
      longDescription,
      techStack,
      category,
      featured,
      imageUrl,
      demoUrl,
      repoUrl,
      whatBroke,
      screenshots,
    } = body;

    // Validate required fields
    if (!slug || !title || !description || !longDescription || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.project.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Project with this slug already exists' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        slug,
        title,
        description,
        longDescription,
        techStack: JSON.stringify(techStack || []),
        category,
        featured: featured || false,
        imageUrl,
        demoUrl,
        repoUrl,
        whatBroke,
        screenshots: JSON.stringify(screenshots || []),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT - Update existing project
export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Convert arrays to JSON strings if they exist
    if (data.techStack) {
      data.techStack = JSON.stringify(data.techStack);
    }
    if (data.screenshots) {
      data.screenshots = JSON.stringify(data.screenshots);
    }

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Remove project
export async function DELETE(request: NextRequest) {
  const user = await getAuthUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
