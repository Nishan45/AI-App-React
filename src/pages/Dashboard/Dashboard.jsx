import React from "react";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  PlayCircle,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../../components/contextApi";
import { getAssignmentsProgressPercentage, getModuleProgressPercentage, getProgressPercentage, getProjectsProgressPercentage, getQuizProgressPercentage, modules } from "../../data/courseData";

export default function Dashboard() {
  const {user}=useAuth();
  const navigate = useNavigate();
  return (
    <div className="page dashboard-page">
      <div className="page-title-row dashboard-welcome">
        <div>
          <h1 className="page-title">Hello, {user.firstName}! 👋</h1>
          <p className="page-subtitle">Keep learning, keep growing!</p>
        </div>
        <button
          className="btn btn-soft"
          onClick={() => navigate("/ai-learning-buddy")}
        >
          <Sparkles size={14} /> Ask AI Buddy
        </button>
      </div>

      <div className="stat-grid">
        <div className="dash-stat" onClick={() => navigate("/modules")}>
          <div className="icon-tile">
            <PlayCircle />
          </div>
          <div>
            <span>Present Class</span>
            <strong>Class {user.class}</strong>
          </div>
          
        </div>
        <div className="dash-stat" onClick={() => navigate("/learning-resources")}>
          <div className="icon-tile purple">
            <ClipboardList />
          </div>
          <div>
            <span>Assignments Left</span>
            <strong>{user.assignmentsLeft}</strong>
          </div>
          
        </div>
        <div className="dash-stat" onClick={() => navigate("/projects-activities")}>
          <div className="icon-tile green">
            <CheckCircle2 />
          </div>
          <div>
            <span>Project Completed</span>
            <strong>{user.projectsCompleted.length}</strong>
          </div>
          
        </div>
      </div>

      <div className="dashboard-main-grid">
        <section className="card progress-card">
          <div className="section-heading">
            <div>
              <h3>Your Progress</h3>
              <p>Overall course completion</p>
            </div>
            {/* <div className="module-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${getProgressPercentage(user)}%` }}
                  />
                </div>
                <span>{getProgressPercentage(user)}%</span>
              </div> */}
            <strong>{getProgressPercentage(user)}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width:`${getProgressPercentage(user)}%` }} />
          </div>
          <div className="continue-card">
            <div className="icon-tile">
              <BookOpen />
            </div>
            <div className="continue-copy">
              <strong>{user.lastWatchedModule.id==0?"Ready to Begin? 🚀":"Continue Learning 🌟"}</strong>
              <span>{user.lastWatchedModule.id==0?"Your AI Journey Starts Here":modules[user.lastWatchedModule.id-1].title}</span>
              <small>{user.lastWatchedModule.id==0?modules[0].desc:modules[user.lastWatchedModule.id-1].lessons[user.lastWatchedModule.lesson-1][0]}</small>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/class-lectures?module=3")}
            >
              {user.lastWatchedModule.id==0?"Watch":"Continue"}
            </button>
          </div>
          <div className="quick-links">
            <button onClick={() => navigate("/learning-resources")}>
              <FileText /> Resources
            </button>
            <button onClick={() => navigate("/challenge-zone")}>
              <Target /> Practice challenge
            </button>
            <button onClick={() => navigate("/projects-activities")}>
              <Trophy /> Projects
            </button>
          </div>
        </section>

        <section className="card distribution-card">
          <div className="section-heading">
            <div>
              <h3>Learning Distribution</h3>
              <p>Where your time goes</p>
            </div>
          </div>
          <div className="donut"
          style={{
            '--module-percentage':getModuleProgressPercentage(user),
            '--quiz-percentage':getQuizProgressPercentage(user),
            '--project-percentage':getProjectsProgressPercentage(user),
            '--assignment-percentage':getAssignmentsProgressPercentage(user)
          }}
          >
            <div className="donut-center">
              <strong>{getProgressPercentage(user)}%</strong>
              <span>overall</span>
            </div>
          </div>
          <div className="legend">
            <span>
              <i className="l-blue" />
              Modules <b>{getModuleProgressPercentage(user)}%</b>
            </span>
            <span>
              <i className="l-green" />
              Assignments <b>{getAssignmentsProgressPercentage(user)}%</b>
            </span>
            <span>
              <i className="l-yellow" />
              Projects <b>{getProjectsProgressPercentage(user)}%</b>
            </span>
            <span>
              <i className="l-purple" />
              Quizzes <b>{getQuizProgressPercentage(user)}%</b>
            </span>
            <span>
              <i className="l-red" />
              Pending <b>{100-getProgressPercentage(user)}%</b>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
