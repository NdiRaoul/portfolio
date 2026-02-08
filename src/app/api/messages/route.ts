import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check to ensure only admin can access
    // For now, we'll require an API key parameter
    const authHeader = request.headers.get('authorization');
    const apiKey = request.nextUrl.searchParams.get('key');

    if (
      !authHeader?.startsWith('Bearer ') &&
      apiKey !== process.env.ADMIN_API_KEY
    ) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all contact messages, sorted by date (newest first)
    const messagesRef = db.collection('contact_messages');
    const snapshot = await messagesRef
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
    }));

    return NextResponse.json(
      {
        success: true,
        count: messages.length,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { messageId, status, read } = body;

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    // Update the message
    const updateData: Record<string, boolean | string> = {};
    if (status !== undefined) updateData.status = status;
    if (read !== undefined) updateData.read = read;

    await db.collection('contact_messages').doc(messageId).update(updateData);

    return NextResponse.json(
      { success: true, message: 'Message updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const messageId = request.nextUrl.searchParams.get('id');

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    await db.collection('contact_messages').doc(messageId).delete();

    return NextResponse.json(
      { success: true, message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
