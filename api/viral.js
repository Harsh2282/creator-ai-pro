export default async function handler(req, res) {

  const youtubeKey = process.env.YOUTUBE_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const { topic } = req.query;

  // 1️⃣ Get Real Trending Videos
  const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${topic}&type=video&order=viewCount&maxResults=5&key=${youtubeKey}`;
  
  const ytResponse = await fetch(ytUrl);
  const ytData = await ytResponse.json();

  const trendTitles = ytData.items
    ? ytData.items.map(v => v.snippet.title).join("\n")
    : "No trend data";

  // 2️⃣ Send Trend Data to Gemini
  const aiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `
You are a viral YouTube strategist.

Trending Videos:
${trendTitles}

Create:
1. High CTR Hook (Hindi/Haryanvi style)
2. Clickbait but safe Title
3. Thumbnail Text (max 4 words)
4. Best Upload Time (India)
5. Viral Probability %
6. Emotion Trigger Used
7. Why it can go viral (short reason)
`
          }]
        }]
      })
    }
  );

  const aiData = await aiResponse.json();

  const result =
    aiData.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No AI response";

  res.status(200).json({ result });
    }
