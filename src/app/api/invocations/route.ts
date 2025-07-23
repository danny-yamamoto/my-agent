import { streamText } from "ai";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

export async function POST(request: Request) {
  try {
    const bedrock = createAmazonBedrock({
      region: process.env.AWS_REGION || "us-west-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "xxxxxxxxx",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "xxxxxxxxx",
      sessionToken: process.env.AWS_SESSION_TOKEN || "xxxxxxxxx",
    });
    const { messages } = await request.json();

    const result = await streamText({
      model: bedrock("apac.anthropic.claude-sonnet-4-20250514-v1:0"),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
