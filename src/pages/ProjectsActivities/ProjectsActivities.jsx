import React from "react";
import { CheckCircle2, ChevronRight, PlusCircle } from "lucide-react";
import "./ProjectsActivities.css";
import {projects} from "../../data/courseData" 
import { useAuth } from "../../components/contextApi";
import { calculateDaysLeft } from "../../components/calculateDaysLeft";

export default function ProjectsActivities() {
    const {user}=useAuth();
  const [tab, setTab] = React.useState("Completed");
  const items = tab === "Completed" ? user.projectsCompleted: user.upcomingProjects;
  return (
    <div className="page projects-page">
      <div className="page-title-row">
          <h1 className="page-title">🚀 Build hands-on projects and tasks to put your new skills to the test</h1>
      </div>
      <div className="project-tabs">
        <button
          className={tab === "Completed" ? "active" : ""}
          onClick={() => setTab("Completed")}
        >
          Completed
        </button>
        <button
          className={tab === "Upcoming" ? "active" : ""}
          onClick={() => setTab("Upcoming")}
        >
          Upcoming
        </button>
      </div>
      <section className="card project-section single-project-section">
        <h3>
          {tab === "Completed"
            ? "Completed Projects"
            : "Upcoming Projects & Activities"}
        </h3>
        {items.map((item) => (
          <ProjectRow
            key={item.id}
            type={projects[item.id-1].type}
            name={projects[item.id-1].title}
            detail={tab === "Completed" ?`Completed on: ${item.completedOn}`:`Assigned on: ${item.assignedOn}`}
            status={tab === "Completed" ? "View" :calculateDaysLeft(item.endDate)<0?'Overdue':(calculateDaysLeft(item.endDate)==0?`Due Today`:`Due in ${calculateDaysLeft(item.endDate)} Days`)}
            icon={tab === "Completed" ? <CheckCircle2 /> : <PlusCircle />}
          />
        ))}
      </section>
    </div>
  );
}
function ProjectRow({type, name, detail, status, icon }) {
  return (
    <div className="project-row">
      <div className="project-icon">{icon}</div>
      <div className="project-info">
        <strong>{type}: {name}</strong>
        <span>{detail}</span>
      </div>
      <span className={status=='Overdue'?"project-status-overdue":"project-status"}>{status}</span>
      <button className="view-arrow">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
