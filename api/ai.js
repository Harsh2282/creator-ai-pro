export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;
  const { topic } = req.query;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Give best viral YouTube hook, title, thumbnail text and best upload time for topic: ${topic}`
          }]
        }]
      }),
    }
  );

  const data = await response.json();

  res.status(200).json({
    result: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
  });
}
