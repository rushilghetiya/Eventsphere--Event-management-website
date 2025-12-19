import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TicketItem {
  name: string;
  quantity: number;
  price: number;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
}

interface TicketEmailRequest {
  email: string;
  firstName: string;
  lastName: string;
  orderNumber: string;
  orderDate: string;
  items: TicketItem[];
  subtotal: number;
  total: number;
  pdfBase64: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      email, 
      firstName, 
      lastName, 
      orderNumber, 
      orderDate, 
      items, 
      subtotal, 
      total,
      pdfBase64 
    }: TicketEmailRequest = await req.json();

    console.log(`Sending ticket email to ${email} for order ${orderNumber}`);

    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    const emailResponse = await resend.emails.send({
      from: "Eventsphere <onboarding@resend.dev>",
      to: [email],
      subject: `Your Eventsphere Tickets - Order #${orderNumber}`,
      attachments: [
        {
          filename: `Eventsphere-Ticket-${orderNumber}.pdf`,
          content: pdfBase64,
        }
      ],
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; letter-spacing: 2px;">EVENTSPHERE</h1>
              <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 14px;">Your Ticket Confirmation</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0;">Hi ${firstName},</h2>
              <p style="color: #6b7280; line-height: 1.6; margin: 0 0 30px 0;">
                Thank you for your purchase! Your tickets are confirmed and attached to this email as a PDF.
              </p>
              
              <!-- Order Info Box -->
              <div style="background-color: #f3f4f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                  <span style="color: #6b7280;">Order Number:</span>
                  <strong style="color: #7c3aed;">#${orderNumber}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #6b7280;">Order Date:</span>
                  <strong style="color: #1f2937;">${orderDate}</strong>
                </div>
              </div>
              
              <!-- Items Table -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                  <tr style="background-color: #7c3aed;">
                    <th style="padding: 12px; text-align: left; color: #ffffff; border-radius: 8px 0 0 0;">Item</th>
                    <th style="padding: 12px; text-align: center; color: #ffffff;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: #ffffff; border-radius: 0 8px 0 0;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; color: #6b7280;">Subtotal:</td>
                    <td style="padding: 10px; text-align: right;">₹${subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; color: #6b7280;">Service Fee:</td>
                    <td style="padding: 10px; text-align: right;">₹${Math.round(subtotal * 0.05).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr style="font-size: 18px; font-weight: bold;">
                    <td colspan="2" style="padding: 15px 10px; text-align: right; color: #1f2937;">Total:</td>
                    <td style="padding: 15px 10px; text-align: right; color: #7c3aed;">₹${total.toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
              
              <!-- Instructions -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <strong style="color: #92400e;">Important:</strong>
                <p style="color: #92400e; margin: 5px 0 0 0; font-size: 14px;">
                  Please download and save the attached PDF ticket. Present it at the venue entrance for entry.
                </p>
              </div>
              
              <p style="color: #6b7280; line-height: 1.6; margin: 0;">
                If you have any questions, please contact us at <a href="mailto:support@eventsphere.com" style="color: #7c3aed;">support@eventsphere.com</a>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1f2937; padding: 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2026 Eventsphere. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-ticket-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
