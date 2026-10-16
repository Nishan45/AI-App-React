import React from "react";
import {
  Bot,
  Brain,
  HelpCircle,
  Send,
  Sparkles,
  UserRound,
  Mic,
  CircleStop,
  Dot,
  Square
  
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
  const lastScrollTop = React.useRef(0);
  const [scrollOffset, setScrollOffset] = React.useState(0);

  const [isListening, setIsListening] = React.useState(false);
  const recognitionRef = React.useRef(null);
  const textareaRef = React.useRef(null);
   


  React.useEffect(() => {
    // 1. Initialize the Web Speech Recognition Engine
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
    
      const recognition = new SpeechRecognition();
      recognition.continuous = true;         // Keep listening even if the user pauses
      recognition.interimResults = true;     // Show text *while* you speak, not just at the end
      recognition.lang = 'en-US';            // Set language (e.g., 'en-IN' or 'en-US')

      recognition.onresult = (event) => {
        let finalTranscript = '';
        
        // Loop through all results generated during this session
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            // This is the live "interim" text updating as you talk
            finalTranscript += event.results[i][0].transcript;
          }
        }

        // 2. Stream the text directly into the input state
        setInput((msg)=>msg+" "+finalTranscript);

        // 3. Trigger auto-grow calculation instantly for the layout
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        const bars = document.querySelectorAll('.chat-input-listening');
        bars.forEach(bar => bar.remove());
      };

      recognition.onend = () => {
        setIsListening(false);
        const bars = document.querySelectorAll('.chat-input-listening');
        bars.forEach(bar => bar.remove());
      };
    

      recognitionRef.current = recognition;
    }
  
  }, []);

  const totalBars = 50;

  // Toggle listening state
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Safari.");
      return;
    }

    if (isListening) {

      recognitionRef.current.stop();
      setIsListening(false);
      const bars = document.querySelectorAll('.chat-input-listening');
      bars.forEach(bar => bar.remove());
    } else {
      setInput(''); // Clear input for new recording session, or omit this to append text
      recognitionRef.current.start();
      setIsListening(true);

      const parent = document.querySelector(".chat-input-text-voice");
      const totalnum=((parent.offsetWidth-40)/10);

      for (let i = 0; i < totalnum; i++) {
        //console.log(totalnum)
        const bar = document.createElement("div");
        bar.classList.add("chat-input-listening");

        const rightOffset = 30+i*10; 
        bar.style.setProperty('--start-right', `${rightOffset}px`);
        //bar.style.animationDelay = `${i * 0.15}s`;
        const calculatedDelay = (i / totalnum) * -2; 
         bar.style.setProperty('--delay-time', `${calculatedDelay}s`); 

        bar.innerHTML = `
        <svg 
          xmlns="http://w3.org" 
          width="4" 
          height="8" 
          viewBox="0 0 5 8" 
          fill="currentColor" 
          stroke="none"
        >
          <rect width="4" height="8" x="0" y="0" />
        </svg>
        `;
        parent.appendChild(bar);
      }
    }
  };

  React.useEffect(() => {
    const isMobile = window.innerWidth < 650;
    if (!isMobile) {
      const el = messagesRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
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

  React.useEffect(() => {
    const isMobile = window.innerWidth < 650;
    if (!isMobile) return;

    const handleScroll = () => {
      if (thinking) {
        setScrollOffset(0);
        return;
      }
      const currentY = window.scrollY;
      const lastY = lastScrollTop.current;

      // Calculate how far the user scrolled since the last event
      const offset = currentY - lastY;
      // console.log("offset-",scrollOffset)
      setScrollOffset((cur) => cur + offset);
      if (offset < 0) {
        setScrollOffset(0);
      }
      lastScrollTop.current = currentY;
    };

    // Use passive: true for scroll performance optimization
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      {/* <div className="buddy-grid"> */}
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
        <div
          className={`suggestions-scroll-wrapper ${scrollOffset <= 0 ? "visible" : scrollOffset > 20 ? "hidden" : ""}`}
        >
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
                    if(isListening) return;
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
                {m.role === "assistant" && i == messages.length - 1 && i > 0 ? (
                  <TypingMessage
                    text={m.content}
                    messagesRef={messagesRef}
                    wantToScroll={true}
                  />
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
          onClick={(e)=>setScrollOffset(0)}
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            if (!thinking) {
              if(input.length>0 && !isListening){
              send();
              const textarea = e.currentTarget.querySelector("textarea");
              if (textarea) {
                textarea.style.height = "auto";
              }
              }
              else{
                toggleListening();
              }
            }
          }}
        >
          <div className="chat-input-text-voice">
            {/* {<div className="chat-input-listening">
              <Square fill="currentColor" size={5}/>
            </div>} */}
          <textarea
            name="text"
            id="chat-input-text"
            value={(isListening?"":input)}
            ref={textareaRef}
            onChange={(e) => {
              if(!isListening) setInput(e.target.value)
            }}
            onInput={(e) => {
              setScrollOffset(0);
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents adding a newline on submit
                if (!thinking && input.trim()) {
                  send();
                }
              }
            }}
            placeholder={(isListening)?"":`Type your question here...`}
            rows={1} // Starts as a single line
          />
          <div className="chat-input-voice" onClick={(e)=>{
            if(!thinking){
              toggleListening();
            }
            
          }}>{isListening?<CircleStop size={18}/>:<Mic size={18}/>}</div>
          </div>
          <div className="chat-input-button-box">
            <button
              type="submit"
              className={`submit ${(thinking||isListening) ? "thinking" : "not-thinking"}`}
            >
              <span>Send</span> <Send size={14} />
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
  );
}
