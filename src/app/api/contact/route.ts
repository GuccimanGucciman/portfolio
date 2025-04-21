import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, company, phone, projectType, message, budget, timeline } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Update with your SMTP host
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Will need to be added to environment variables
        pass: process.env.EMAIL_PASS, // Will need to be added to environment variables
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
      to: 'hello@fludo.se',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not provided'}
        Phone: ${phone || 'Not provided'}
        Project Type: ${projectType || 'Not provided'}
        Budget: ${budget || 'Not provided'}
        Timeline: ${timeline || 'Not provided'}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
        
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
