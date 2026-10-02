import React from "react";
import {
  ArrowRight,
  Brain,
  Database,
  Heart,
  Languages,
  Lightbulb,
  Eye,
  Cpu,
  ShieldCheck,
  Sparkles,
  Network,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { modules, moduleProgress } from "../../data/courseData";
import "./Modules.css";

const icons = [
  Brain,
  Database,
  Cpu,
  Database,
  Network,
  Languages,
  Eye,
  Lightbulb,
  ShieldCheck,
  Sparkles,
];
const tones = [
  "violet",
  "blue",
  "green",
  "pink",
  "orange",
  "violet",
  "blue",
  "green",
  "pink",
  "orange",
];

export default function Modules() {
  const navigate = useNavigate();
  return (
    <div className="page modules-page">
      <div className="page-title-row">
          <h1 className="page-title">🚀 Complete all 10 modules to master the AI course</h1>
      </div>
      <div className="module-grid">
        {modules.map((m, i) => {
          const Icon = icons[i];
          const progress = moduleProgress[i];
          return (
            <article className={`module-card tone-${tones[i]}`} key={m.id}>
              <div className="module-number">{m.id}</div>
              <div className="module-icon">
                <Icon size={17} />
              </div>
              <h3>
                Module {m.id}: {m.title}
              </h3>
              <p>{m.desc}</p>
              <div className="module-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{progress}%</span>
              </div>
              <button
                className="module-action"
                onClick={() => navigate(`/class-lectures?module=${m.id}`)}
              >
                {progress === 0 ? "Start" : "View"} <ArrowRight size={11} />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
