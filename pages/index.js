import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const analyze = async () => {
    setResult("Analyzing...");
    const res = await fetch(`/api/viral?topic=${encodeURIComponent(topic)}`);
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",textAlign:"center",padding:"20px"}}>
      <h1>🔥 Creator AI Pro</h1>
      <input
        style={{padding:"10px",width:"80%",borderRadius:"8px"}}
        value={topic}
        onChange={(e)=>setTopic(e.target.value)}
        placeholder="Enter topic"
      />
      <br /><br />
      <button
        style={{padding:"10px 20px",background:"red",color:"#fff",borderRadius:"8px"}}
        onClick={analyze}
      >
        Analyze Trend
      </button>

      <div style={{marginTop:"30px",whiteSpace:"pre-wrap"}}>
        {result}
      </div>
    </div>
  );
}
