import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // In a production environment, you would use a service like Resend, Nodemailer, or SendGrid here.
    // Since I cannot set up a real SMTP server for you, I'll provide the code for a mock success 
    // and the logic you'd use to connect it to your email.
    
    console.log(`NEW CONTACT FORM SUBMISSION FOR: vijendrwkashyap@gmail.com`);
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);

    // LOGIC FOR REAL EMAIL (Commented out):
    /*
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'DenimX Studios <onboarding@resend.dev>',
        to: ['vijendrwkashyap@gmail.com'],
        subject: `New Message from ${name} via DenimX System`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      })
    });
    */

    return NextResponse.json({ success: true, message: "Transmission Received" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Transmission Error" }, { status: 500 });
  }
}
