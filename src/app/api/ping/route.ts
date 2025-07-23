export async function GET() {
  return new Response(
    JSON.stringify({ status: "Healthy", timestamp: new Date().toISOString() }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
