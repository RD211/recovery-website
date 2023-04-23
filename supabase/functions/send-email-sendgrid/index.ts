// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { sendMail } from "https://deno.land/x/sendgrid/mod.ts";

console.log(`Function "send-email-sendgrid" up and running!`);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  console.log("Request received: " + req.url);
  console.log(req.headers);
  console.log(req.body);
  const formData = await req.json();
  console.log("Form data: " + formData);
  const { senderEmail, body, subject } = formData;

  const apiKey = Deno.env.get("SENDGRID_API_KEY")!;

  const msg = {
    personalizations: [
      {
        to: [
          {
            email: "david.dinucujianu@gmail.com",
          },
        ],
        subject,
      },
    ],
    from: { email: "david.dinucujianu@gmail.com" },
    content: [
      {
        type: "text/plain",
        value: body,
      },
    ],
  };

  try {
    const response = await sendMail(msg, {
      apiKey: apiKey,
    });
    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
        key: apiKey,
        response,
      }),
      {
        headers: {
          ...corsHeaders,
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(error.message, {
      status: 500,
      headers: {
        ...corsHeaders,
        "content-type": "application/json",
      },
    });
  }
});
