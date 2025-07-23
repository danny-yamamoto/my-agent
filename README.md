# my-agent

My Agent

```markdown
Implement an AI Agent. The specifications are as follows.

- Use Route Handlers in Next.js's App Router.
- The `/invocations` endpoint (POST) and `/ping` endpoint (GET) are required.
- Listen on port 8080 on the 0.0.0.0 host.
- Use the `streamText` method from the AI SDK in the response.
- The LLM uses the Amazon Bedrock provider.
```

```bash
docker run -p 8080:8080 \
    -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
    -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
    -e AWS_REGION=${AWS_REGION} \
    -e AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN} \
    my-agent
```

```bash
# Health check
curl -X GET http://localhost:8080/api/ping

# AI text generation
curl -X POST http://localhost:8080/api/invocations \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

```bash
export AGENT_NAME=my-agent
export AWS_REGION=us-east-1
export aws_account_id=123456789012
export AGENT_TAG=v0.0.1

docker buildx build --platform linux/arm64 -t ${AGENT_NAME}:${AGENT_TAG} .

aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${aws_account_id}.dkr.ecr.${AWS_REGION}.amazonaws.com

aws ecr create-repository --repository-name ${AGENT_NAME} --region ${AWS_REGION}

docker tag ${AGENT_NAME}:${AGENT_TAG} ${aws_account_id}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AGENT_NAME}:${AGENT_TAG}

docker push ${aws_account_id}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AGENT_NAME}:${AGENT_TAG}
```
