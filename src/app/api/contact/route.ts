import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { sendContactFormEmails } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, message } = body;

    // Validate input
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Store message in Firestore
    const timestamp = new Date();
    const docRef = await db.collection('contact_messages').add({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      createdAt: timestamp,
      read: false,
      status: 'new',
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for') || (request as any).ip,
    });

    console.log('[Contact Form] Message stored in Firestore with ID:', docRef.id);

    // Send emails (admin notification and visitor confirmation)
    try {
      await sendContactFormEmails({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        messageId: docRef.id,
        submittedAt: timestamp,
      });

      console.log('[Contact Form] Email notifications sent successfully');
    } catch (emailError) {
      console.error('[Contact Form] Email notification failed:', emailError);
      // Don't fail the request if email sending fails
      // The message is already stored in Firebase, which is the most important part
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully! Check your email for confirmation.',
        messageId: docRef.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact Form] Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}
