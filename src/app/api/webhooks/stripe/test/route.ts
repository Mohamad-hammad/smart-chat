import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    console.log('Webhook received:');
    console.log('Signature:', signature);
    console.log('Body:', body);
    
    return NextResponse.json({ 
      received: true, 
      signature: signature ? 'present' : 'missing',
      bodyLength: body.length 
    });
  } catch (error) {
    console.error('Webhook test error:', error);
    return NextResponse.json({ error: 'Webhook test failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Stripe webhook test endpoint is ready',
    timestamp: new Date().toISOString(),
    url: request.url
  });
}
