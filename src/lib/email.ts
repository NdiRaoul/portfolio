import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  messageId?: string;
  submittedAt?: Date;
}

/**
 * Helper function to escape HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Send admin notification email when contact form is submitted
 */
export async function sendAdminNotificationEmail(data: ContactEmailData) {
  const { name, email, phone, message, messageId, submittedAt } = data;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Contact Information</h3>
          <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #667eea; text-decoration: none;">${escapeHtml(email)}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(phone)}" style="color: #667eea; text-decoration: none;">${escapeHtml(phone)}</a></p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
          <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #555;">${escapeHtml(message)}</p>
          </div>
        </div>

        <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea; font-size: 12px; color: #666;">
          <p style="margin: 5px 0;"><strong>Submission ID:</strong> ${messageId}</p>
          <p style="margin: 5px 0;"><strong>Submitted at:</strong> ${submittedAt ? submittedAt.toLocaleString() : new Date().toLocaleString()}</p>
          <p style="margin: 5px 0;"><em>This is an automated notification from your portfolio contact form.</em></p>
        </div>
      </div>
    </div>
  `;

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL environment variable is not set');
  }

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: adminEmail,
      replyTo: email,
      subject: `New Contact: ${name} • ${email} • ${phone}`,
      html: htmlContent,
    });

    console.log('Admin notification email sent:', response);
    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    throw error;
  }
}

/**
 * Send confirmation email to the visitor
 */
export async function sendVisitorConfirmationEmail(data: ContactEmailData) {
  const { name, email, message } = data;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 24px;">Thank you for reaching out!</h2>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 20px 0; color: #555; line-height: 1.6;">
          Hi <strong>${escapeHtml(name)}</strong>,
        </p>
        
        <p style="margin: 0 0 20px 0; color: #555; line-height: 1.6;">
          Thank you for taking the time to reach out! I've received your message and I'm excited to discuss this opportunity with you.
        </p>

        <p style="margin: 0 0 20px 0; color: #555; line-height: 1.6;">
          I'll get back to you as soon as possible, typically within <strong>24-48 hours</strong>.
        </p>

        <div style="background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea;">
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;"><strong>Your Message:</strong></p>
          <p style="margin: 0; color: #666; white-space: pre-wrap; line-height: 1.6; font-size: 13px;">${escapeHtml(message.substring(0, 300))}${message.length > 300 ? '...' : ''}</p>
        </div>

        <p style="margin: 20px 0; color: #555; line-height: 1.6;">
          In the meantime, feel free to reach out to me directly:
        </p>
        
        <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
          <ul style="margin: 0; padding-left: 20px; color: #555;">
            <li style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:ndi.raoul@example.com" style="color: #667eea; text-decoration: none;">ndi.raoul@example.com</a></li>
            <li style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:+237671234567" style="color: #667eea; text-decoration: none;">+237 671 234 567</a></li>
            <li style="margin: 10px 0;"><strong>Location:</strong> Douala, Cameroon (Available for Remote Work)</li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p style="margin: 5px 0;">Best regards,</p>
          <p style="margin: 5px 0;"><strong>Ndi Raoul</strong></p>
          <p style="margin: 5px 0;">Full Stack Developer</p>
          <p style="margin: 15px 0 5px 0; font-style: italic;">Crafting digital experiences with cutting-edge technologies</p>
        </div>
      </div>
    </div>
  `;

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for reaching out! 🚀',
      html: htmlContent,
    });

    console.log('Visitor confirmation email sent:', response);
    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('Failed to send visitor confirmation email:', error);
    throw error;
  }
}

/**
 * Send both admin and visitor emails
 */
export async function sendContactFormEmails(data: ContactEmailData) {
  const results = {
    adminEmail: { success: false, error: null as string | null },
    visitorEmail: { success: false, error: null as string | null },
  };

  // Send admin notification
  try {
    await sendAdminNotificationEmail(data);
    results.adminEmail.success = true;
  } catch (error) {
    results.adminEmail.error = error instanceof Error ? error.message : 'Unknown error';
    console.error('Admin email failed:', error);
  }

  // Send visitor confirmation
  try {
    await sendVisitorConfirmationEmail(data);
    results.visitorEmail.success = true;
  } catch (error) {
    results.visitorEmail.error = error instanceof Error ? error.message : 'Unknown error';
    console.error('Visitor email failed:', error);
  }

  return results;
}
