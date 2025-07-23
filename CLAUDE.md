# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Agent built with Next.js App Router that provides REST API endpoints for interacting with Amazon Bedrock's Claude Sonnet 4 model. The application streams AI-generated text responses and includes health monitoring.

## Development Commands

### Essential Commands

- `npm run dev` - Start development server on port 8080, host 0.0.0.0
- `npm run build` - Build application for production
- `npm run start` - Start production server on port 8080, host 0.0.0.0
- `npm run format` - Format code with Prettier
- `npm run lint` - Run ESLint checks

### Testing API Endpoints

```bash
# Health check
curl -X GET http://localhost:8080/api/ping

# AI text generation
curl -X POST http://localhost:8080/api/invocations \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## Architecture

### API Endpoints Structure

- **`/api/invocations`** (POST) - Main AI endpoint using `streamText()` from AI SDK
  - Integrates with Amazon Bedrock model: `apac.anthropic.claude-sonnet-4-20250514-v1:0`
  - Expects `messages` array in request body
  - Returns streaming data response
- **`/api/ping`** (GET) - Health check returning status and timestamp

### Key Dependencies

- **AI SDK** (`ai`): Core AI functionality with `streamText()` method
- **Amazon Bedrock Provider** (`@ai-sdk/amazon-bedrock`): AWS Bedrock integration using `createAmazonBedrock()`
- **Next.js 14**: App Router with TypeScript support

### Environment Configuration

Server runs on port 8080 with host 0.0.0.0 for external accessibility. Requires AWS credentials:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_SESSION_TOKEN
```

Copy `.env.example` to `.env.local` and configure with actual AWS credentials for Amazon Bedrock access.

### Code Patterns

- Route handlers in `src/app/api/[endpoint]/route.ts` pattern
- Error handling returns 500 status with generic error message
- AWS credentials configured per-request using `createAmazonBedrock()`
- Streaming responses use `result.toDataStreamResponse()`
