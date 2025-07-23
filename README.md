# my-agent

My Agent

```markdown
Implement an AI Agent. The specifications are as follows.
  * Use Route Handlers in Next.js's App Router.
  * The `/invocations` endpoint (POST) and `/ping` endpoint (GET) are required.
  * Listen on port 8080 on the 0.0.0.0 host.
  * Use the `streamText` method from the AI SDK in the response.
  * The LLM uses the Amazon Bedrock provider.
```

```bash
docker run -p 8080:8080 \
    -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
    -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
    -e AWS_REGION=${AWS_REGION} \
    -e AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN} \
    my-agent
```
