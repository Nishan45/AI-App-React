import React from "react";
import {
  Bot,
  Brain,
  HelpCircle,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import "./AILearningBuddy.css";

const starter = [
  {
    from: "bot",
    text: "Hi Aarav! I'm your AI Learning Buddy. Ask me questions, get help with lessons, or solve problems together.",
  },
];

export default function AILearningBuddy() {
  const [messages, setMessages] = React.useState(starter),
    [input, setInput] = React.useState("");
  const messagesRef = React.useRef(null);
  React.useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);
  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [
      ...m,
      { from: "user", text: q },
      {
        from: "bot",
        text: "Great question! Let's break it down step by step. Start by telling me what you already know about it.",
      },
    ]);
    setInput("");
  };
  return (
    <div className="page buddy-page">
      <div className="page-title-row">
        <div>
          <h4 style={{margin:0}}>🤖 Curious about a topic? Fire away with your questions.</h4>
        </div>
      </div>
      <div className="buddy-grid">
        <section className="card chat-card">
          <div className="chat-hero">
            <div className="thinking-bot">
              <span>◉</span>
              <i />
            </div>
            <div>
              <strong>I'm your AI Learning Buddy</strong>
              <p>
                Ask questions, get help with your lessons, or solve problems
                together.
              </p>
            </div>
          </div>
          <div className="suggestions">
            {[
              "What is AI?",
              "Explain Machine Learning",
              "Help with Python",
            ].map((x) => (
              <button
                key={x}
                onClick={() => {
                  setInput(x);
                  setTimeout(
                    () => document.querySelector(".chat-input input")?.focus(),
                    0,
                  );
                }}
              >
                <Sparkles size={12} />
                {x}
              </button>
            ))}
          </div>
          <div className="messages" ref={messagesRef}>
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.from}`}>
                <div className="message-icon">
                  {m.from === "bot" ? (
                    <Bot size={13} />
                  ) : (
                    <UserRound size={13} />
                  )}
                </div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
            />
            <button type="submit">
              Send <Send size={12} />
            </button>
          </form>
        </section>
        <aside className="card buddy-side">
          <div className="side-title">
            <Brain />
            <div>
              <strong>Sample Questions</strong>
              <span>Try one of these questions</span>
            </div>
          </div>
          <ol>
            {[
              "Why was the AI model not accurate in my last test?",
              "What are the key differences between AI and ML?",
              "What are some real-world examples of AI in daily life?",
            ].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <div className="buddy-tip">
            <HelpCircle />
            <span>
              Tip: Ask follow-up questions when you want a simpler explanation.
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
