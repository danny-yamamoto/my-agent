import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { generateText } from "ai";
import dotenv from "dotenv";
 
// .env file を読み込む
dotenv.config();
 
const bedrock = createAmazonBedrock({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'xxxxxxxxx',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'xxxxxxxxx',
  sessionToken: process.env.AWS_SESSION_TOKEN || 'xxxxxxxxx',
});

const { text } = await generateText({
  model: bedrock("apac.anthropic.claude-sonnet-4-20250514-v1:0"),
  system:
    "あなたは旅行プランナーです。旅行者の要望に応じて、最適な旅行プランを提案してください。",
  prompt:
    "日帰り旅行の計画を立ててください。出発地は東京で、目的地は箱根です。観光スポットや食事のおすすめも含めてください。",
});
 
console.log(text);
