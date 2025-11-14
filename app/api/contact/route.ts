/**
 * Contact API Route
 * POST endpoint to save contact messages
 * For people who actually want to reach out (brave souls)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation (because users can't be trusted)
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const contactMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received! I\'ll get back to you (probably).',
        id: contactMessage.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Maybe try smoke signals?' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve messages (for admin use)
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
