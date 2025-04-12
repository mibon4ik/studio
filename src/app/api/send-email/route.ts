import {NextRequest, NextResponse} from 'next/server';
import * as process from "process";

export async function POST(req: NextRequest) {
  const {name, email, message} = await req.json();

  const emailBody = `
    <h1>Новое сообщение с сайта!</h1>
    <p><strong>Имя:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Сообщение:</strong> ${message}</p>
  `;

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'Logistics Ace <onboarding@resend.dev>',
      to: ['alihanergaziev228@gmail.com'],
      subject: 'Новое сообщение с сайта Logistics Ace',
      html: emailBody,
    });

    return NextResponse.json({
      status: 'success',
      message: 'Email sent successfully',
      result,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to send email',
      error,
    }, {status: 500});
  }
}

import { Resend } from 'resend';
