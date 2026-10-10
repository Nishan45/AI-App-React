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
import { useAuth } from "../../components/contextApi";
import api from "../../services/API";
import ReactMarkdown from "react-markdown";
import TypingMessage from "../../components/typingEffect";

export default function AILearningBuddy() {
  const { user } = useAuth();
  const [messages, setMessages] = React.useState([
    {
      role: "assistant",
      content: `Hi **${user.firstName}**! I'm your AI Learning Buddy. Ask me questions, get help with lessons, or solve problems together.`,
    },
  ]);
  const [aiMessages, setAiMessages] = React.useState([
    {
      role: "assistant",
      content: `Hi **${user.firstName}**! I'm your AI Learning Buddy. Ask me questions, get help with lessons, or solve problems together.`,
    },
  ]);
  const [thinking, setThinking] = React.useState(false);

  const [input, setInput] = React.useState("");
  const messagesRef = React.useRef(null);
  React.useEffect(() => {
    if (!window.visualViewport) return;

    const handleVisualResize = () => {
      // Calculate how much space the keyboard is occupying at the bottom
      const offset = Math.max(5,window.innerHeight - window.visualViewport.height);
      
      // Update offset (safeguard against negative values on bounce)
      
      const inputForm = document.querySelector('.chat-input');
      if (inputForm) {
        inputForm.style.paddingBottom = `${offset}px`;
      }
    };


    window.visualViewport.addEventListener('resize', handleVisualResize);
    window.visualViewport.addEventListener('scroll', handleVisualResize);

    return () => {
      window.visualViewport.removeEventListener('resize', handleVisualResize);
      window.visualViewport.removeEventListener('scroll', handleVisualResize);
    };
  }, []);

  React.useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;

    setThinking(true);
    const q = input.trim();
    const updatedMessages = [...aiMessages, { role: "user", content: q }];
    setMessages((msg) => [...msg, { role: "user", content: q }]);
    setAiMessages((msg) => [...msg, { role: "user", content: q }]);

    setInput("");
    // console.log(aiMessages)
    try {
      const response = await api.post(
        `/getAiResponse/problemSolver`,
        updatedMessages,
      );
      const data = response.data;
      // console.log(data);

      setMessages((m) => [...m, { role: "assistant", content: data.response }]);

      if (data.summary) {
        const msg = updatedMessages.slice(-2);
        setAiMessages([
          { role: "system", content: data.summary },
          msg[0],
          msg[1],
          { role: "assistant", content: data.response },
        ]);
      } else {
        setAiMessages((m) => [
          ...m,
          { role: "assistant", content: data.response },
        ]);
      }
    } catch (error) {
      setMessages((msg) => [
        ...msg,
        {
          role: "assistant",
          content: "Something went wrong. Please try again later",
        },
      ]);
    }
    setThinking(false);
  };

  return (
    <div className="page buddy-page">
      {/* <div className="page-title-row">
        <div>
          <h4
            style={{ margin: 0, fontSize: "14px", gap: "8px", display: "flex" }}
          >
            <Bot size={18} style={{ flexShrink: 0 }} /> Curious about a topic?
            Fire away with your questions.
          </h4>
        </div>
      </div> */}
      <div className="buddy-grid">
        <section className="card chat-card">
          <div className="chat-hero">
            <div className="thinking-bot">
              <span>
                <Bot size={20} />
              </span>
              <i />
            </div>
            <div>
              {/* <strong>I'm your AI Learning Buddy</strong> */}
              Ask questions, get help with your lessons, or solve problems
              together.
              {/* <p>
                Ask questions, get help with your lessons, or solve problems
                together.
              </p> */}
            </div>
          </div>
          <div className="suggestions">
            <div className="thinking-bot">
              <span>
                <Bot size={20} />
              </span>
              <i />
            </div>
            <div className="suggestion-box">
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
                      () =>
                        document.querySelector(".chat-input input")?.focus(),
                      0,
                    );
                  }}
                >
                  <Sparkles size={12} />
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="messages" ref={messagesRef}>
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.role}`}>
                <div className="message-icon">
                  {m.role === "assistant" ? (
                    <Bot size={13} />
                  ) : (
                    <UserRound size={13} />
                  )}
                </div>
                <div>
                  {m.role === "assistant" && i == messages.length - 1 ? (
                    <TypingMessage text={m.content} messagesRef={messagesRef} />
                  ) : (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className={`message assistant`}>
                <div className="message-icon">
                  <Bot size={13} />
                </div>
                <div className="thinking-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
          </div>
          <form
            className="chat-input"

            onSubmit={(e) => {

              e.preventDefault();
              
              if (!thinking) {
                send();
                const textarea = e.currentTarget.querySelector('textarea');
                if (textarea) {
                  textarea.style.height = "auto";
                }
              }
            }}
          >
            {/* <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
            /> */}
            <textarea
            name="text"
            id="chat-input-text"
            
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onInput={(e) => {
                
                // 1. Reset height to auto so it can shrink if text is deleted
                e.currentTarget.style.height = "auto";
                // 2. Set height to match the scroll height of the typed text
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevents adding a newline on submit
                  if (!thinking && input.trim()) {
                    send();
                  }
                }}}
              placeholder="Type your question here..."
              rows={1} // Starts as a single line
            />
            <div className="chat-input-button-box">

            
            <button
              type="submit"
              className={`submit ${thinking ? "thinking" : "not-thinking"}`}
            >
              <span>Send</span> <Send size={12} />
            </button>
            </div>
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
