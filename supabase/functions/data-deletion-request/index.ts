import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface DeletionRequest {
  fullName: string;
  email: string;
  reason?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { fullName, email, reason }: DeletionRequest = await req.json();

    if (!fullName || !email) {
      return new Response(
        JSON.stringify({ error: "Full name and email are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert deletion request into database
    const { error: dbError } = await supabase
      .from("data_deletion_requests")
      .insert({
        full_name: fullName,
        email: email,
        reason: reason || "Non spécifiée",
        status: "pending",
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save request" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send email notification using Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Fitmates <noreply@fitmates.app>",
            to: ["lahlou.driss10@gmail.com"],
            subject: "Nouvelle demande de suppression de données - Fitmates",
            html: `
              <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #f57c00 0%, #ef4444 100%); padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">Demande de Suppression de Données</h1>
                </div>
                <div style="background: #f9fafb; padding: 30px;">
                  <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                      Une nouvelle demande de suppression de données a été soumise :
                    </p>
                    <div style="background: #fef3e7; border-left: 4px solid #f57c00; padding: 15px; margin: 20px 0;">
                      <p style="margin: 5px 0;"><strong>Nom complet :</strong> ${fullName}</p>
                      <p style="margin: 5px 0;"><strong>Email :</strong> ${email}</p>
                      <p style="margin: 5px 0;"><strong>Raison :</strong> ${reason || "Non spécifiée"}</p>
                      <p style="margin: 5px 0;"><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
                    </div>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
                      Veuillez traiter cette demande dans un délai de 30 jours conformément au RGPD.
                    </p>
                  </div>
                </div>
                <div style="background: #1f2937; padding: 20px; text-align: center;">
                  <p style="color: #9ca3af; margin: 0; font-size: 14px;">© 2025 Fitmates. Tous droits réservés.</p>
                </div>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.text();
          console.error("Email send error:", errorData);
        }
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.warn("RESEND_API_KEY not configured, email not sent");
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Deletion request submitted successfully"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
