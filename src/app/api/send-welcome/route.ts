import { NextResponse } from 'next/server';

// Resend has been completely disabled for this project per user request.

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Email sending is intentionally bypassed
        console.log('Welcome email disabled for this project. Skipping email for:', email);

        return NextResponse.json({ success: true, message: 'Email skipped (disabled)' });
    } catch (error: any) {
        console.error('WELCOME EMAIL ERROR:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

