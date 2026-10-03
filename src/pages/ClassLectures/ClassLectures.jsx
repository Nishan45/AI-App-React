import React, { useRef } from "react";
import { ChevronDown, Play, PlayCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { modules } from "../../data/courseData";
import "./ClassLectures.css";
import YouTubeTracker from "../../components/YoutubeTracker";
import { useAuth } from "../../components/contextApi";
import {
  Bot,
} from "lucide-react";

export default function ClassLectures() {
  const [params, setParams] = useSearchParams();
  const selected = Number(params.get("module")) || 1;
  const [open, setOpen] = React.useState([selected - 1]);
  const [lecture,setLecture]=React.useState(modules[selected-1].lessons[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const {user}=useAuth();
  const currentModuleRef = useRef(null);

  React.useEffect(
    () => setOpen((v) => (v.includes(selected - 1) ? v : [selected - 1])),
    [selected],
  );

  React.useEffect(() => {
    // Check if a valid module query parameter exists in the URL
    if (params.get("module") && currentModuleRef.current) {
      currentModuleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // Options: "start", "center", "end", "nearest"
      });
    }
  }, [selected]);

  const toggle = (i) =>
    setOpen((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  return (
    <div className="page lectures-page">
      <div className="page-title-row">
          <h1 style={{display:"flex",gap:"8px"}} className="page-title"><Bot size={18} style={{flexShrink:0}}/> Welcome, {user.firstName}. Your class lectures are ready below 👇</h1> 
      </div>
      {!isOpen && (
        <div className="lecture-list">
          {modules.map((m, i) => (
            <section
              ref={m.id === selected ? currentModuleRef : null}
              className={`card lecture-module ${m.id=== selected ? "current-module" : ""}`}
              key={m.id}
            >
              <button
                className="module-header"
                onClick={() => {
                  setParams({ module: String(m.id) });
                  toggle(i);
                }}
              >
                <span>
                  <BookIcon />
                </span>
                <strong>
                  Module {m.id}: {m.title}
                </strong>
                {m.id === selected && <em>Current</em>}
                <ChevronDown className={open.includes(i) ? "rotated" : ""} />
              </button>
              {open.includes(i) && (
                <div className="lesson-list">
                  {m.lessons.map(([name,time,link]) => (
                    <div className="lesson-row" key={name}>
                      <div className="lesson-info">
                        <PlayCircle size={18} />
                        <strong>{name}</strong>
                      </div>
                      <time>{time}</time>
                      {/* <a
                      href="https://youtu.be/GHpchgLoDvI?si=7nCpZ_uK-IoAfTy7" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="video-div-link-wrapper"
                    > */}
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setIsOpen(true);
                          setLecture([name,time,link]);
                        }}
                      >
                        <Play size={12} /> View
                      </button>
                      {/* </a> */}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
      {isOpen && (
        <div className="lecture-video-window">
          <div className="lecture-video-nav">
            <button
              className="lecture-video-back-button"
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#F3F4F6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Clean Back Arrow Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go Back To Class Lectures
            </button>
          </div>

          {/* Scrollable Content Workspace */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "32px 24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Maximum Width Main Content Constraint Container */}
            <div
              style={{
                width: "100%",
                maxWidth: "900px", // Optimal reading & viewing width for video platforms
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Embedded Tracker Video Wrapper */}
              <div
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#000000", // Prevents flicker during video loading
                }}
              >
                <YouTubeTracker videoId={lecture[2]} />
              </div>

              {/* Informational Text Context Section (Moved Below Video) */}
              <div style={{ padding: "4px 0" }}>
                <h2
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#111827",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Module {selected}: {modules[selected-1].title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    color: "#6B7280",
                    lineHeight: "1.5",
                  }}
                >
                  {lecture[0]} 🤖 👉 {modules[selected-1].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function BookIcon() {
  return <span className="book-icon">▣</span>;
}
