import React, { useRef } from "react";
import { ChevronDown, Play, PlayCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { modules } from "../../data/courseData";
import "./ClassLectures.css";
import YouTubeTracker from "../../components/YoutubeTracker";
import { useAuth } from "../../components/contextApi";
import { Bot } from "lucide-react";

export default function ClassLectures() {
  const [params, setParams] = useSearchParams();
  const selected = Number(params.get("module")) || 1;
  const [open, setOpen] = React.useState([selected - 1]);
  const [lecture, setLecture] = React.useState([
    modules[selected - 1].lessons[0][0],
    modules[selected - 1].lessons[0][1],
    modules[selected - 1].lessons[0][2],
    0,
    selected,
  ]);
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();
  const currentModuleRef = useRef(null);

  React.useEffect(
    () => setOpen((v) => (v.includes(selected - 1) ? v : [selected - 1])),
    [selected],
  );

  React.useEffect(() => {
    const isMobile = window.innerWidth < 1000;
    if (params.get("module") && currentModuleRef.current) {
      if (isMobile) {
        currentModuleRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", // Options: "start", "center", "end", "nearest"
        });
      } else {
        // 1. Find the scrollable list container instead of the whole browser window
        const container = currentModuleRef.current.closest(".lecture-list");

        if (container) {
          // 2. Calculate where the target card sits relative to the container's top boundary
          const containerTop = container.getBoundingClientRect().top;
          const cardTop = currentModuleRef.current.getBoundingClientRect().top;

          // 3. Center the card precisely INSIDE the scrollable panel only
          const targetScrollTop =
            container.scrollTop +
            (cardTop - containerTop) -
            container.clientHeight / 2 +
            currentModuleRef.current.clientHeight / 2;

          container.scrollTo({
            top: targetScrollTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [selected, params]); // Added params as a reliable dependency trigger

  const toggle = (i) =>
    setOpen((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  return (
    <div className="page lectures-page">
      <div style={{ height: "90vh", display: "flex", flexDirection: "column" }}>
        <div className="page-title-row">
          <h1 style={{ display: "flex", gap: "8px" }} className="page-title">
            <Bot size={18} style={{ flexShrink: 0 }} /> Welcome,{" "}
            {user.firstName}. Your class lectures are ready below
          </h1>
        </div>
        {!isOpen && (
          <div className="lecture-list">
            {modules.map((m, i) => (
              <section
                ref={m.id === selected ? currentModuleRef : null}
                className={`card lecture-module ${m.id === selected ? "current-module" : ""}`}
                key={m.id}
              >
                <button
                  className="module-header"
                  onClick={() => {
                    if (!open.includes(i)) {
                      setParams({ module: String(m.id) });
                    }
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
                    {m.lessons.map(([name, time, link], index) => (
                      <div
                        className="lesson-row"
                        key={name}
                        onClick={() => {
                          setParams({ module: String(m.id) });
                          setLecture([name, time, link, index, m.id]);
                        }}
                      >
                        <div className="lesson-info">
                          <PlayCircle size={18} />
                          <strong
                            className={`window-lecture ${index == lecture[3] && m.id == lecture[4] ? "playing" : "not"}`}
                          >
                            {name}
                          </strong>
                        </div>
                        <div className="video-time-view">
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
                              setParams({ module: String(m.id) });
                              setLecture([name, time, link, index, m.id]);
                            }}
                          >
                            <Play size={12} /> View
                          </button>
                        </div>
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
                  <YouTubeTracker videoId={lecture[2]} autoPlay={1} />
                </div>

                {/* Informational Text Context Section (Moved Below Video) */}
                <div style={{ padding: "4px 0" }}>
                  <h2
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#111827",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    Module {lecture[4]}: {modules[lecture[4] - 1].title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#6B7280",
                      lineHeight: "1.5",
                    }}
                  >
                    {lecture[0]} 👉 {modules[lecture[4] - 1].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="window-video-right-panel">
        <div
          style={{
            width: "100%",
            maxWidth: "900px", // Optimal reading & viewing width for video platforms
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
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
            <YouTubeTracker videoId={lecture[2]} autoPlay={0} />
          </div>
          <div style={{ padding: "4px 0" }}>
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                fontWeight: "700",
                color: "#111827",
                letterSpacing: "-0.025em",
              }}
            >
              Module {lecture[4]}: {modules[lecture[4] - 1].title}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#6B7280",
                lineHeight: "1.5",
              }}
            >
              {lecture[0]} 👉 {modules[lecture[4] - 1].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function BookIcon() {
  return <span className="book-icon">▣</span>;
}
