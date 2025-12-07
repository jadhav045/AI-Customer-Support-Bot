import { useState, useEffect, useRef } from "react";
import { api } from "../api/apiClient";
import { v4 as uuidv4 } from "uuid";
import "./chat.css";

const ChatWindow = () => {
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const id = localStorage.getItem("sessionId") || uuidv4();
    localStorage.setItem("sessionId", id);
    setSessionId(id);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/query", {
        sessionId,
        query: userMessage.text
      });

      const botMessage = {
        sender: "bot",
        text: res.data.botResponse,
        score: res.data.matchScore,
        escalated: res.data.escalated || false,
        usedFAQ: res.data.usedFAQ || res.data.matchScore > 0.6,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Server unavailable. Please try again later.",
          timestamp: new Date()
        }
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Customer Support Bot</div>

      <div className="chat-box">
        
        {messages.map((msg, i) => (
          <div key={i} className={`msg-row ${msg.sender}`}>
            
            <div className="bubble">
              {msg.sender === "bot" && (
                <div className="tag">
                  {msg.escalated ? "⚠ Escalated" :
                   msg.usedFAQ ? "📘 FAQ" : "🤖 AI"}
                </div>
              )}

              <div className="msg-text">{msg.text}</div>

              <div className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg-row bot">
            <div className="bubble typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
