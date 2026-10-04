import React from "react";
import { CheckCircle2, Star, Target, Trophy,ChartColumn } from "lucide-react";
import "./MyProgress.css";
import StarRating from "../../components/StarRating";
import { useAuth } from "../../components/contextApi";
import {
  getProgressPercentage,
  modules,
  quizData,
} from "../../data/courseData";

export default function MyProgress() {
  const { user } = useAuth();
  return (
    <div className="page progress-page">
      <div className="page-title-row">
        <div>
          <h1 className="page-title" style={{display:"flex",gap:"10px"}}>
            <ChartColumn style={{borderRadius:"5px",color:"rgb(17, 98, 164)"}}/> Track your learning, performance and achievements
          </h1>
        </div>
      </div>
      <div className="progress-summary">
        <div className="overall-card card">
          <div
            className="ring"
            style={{ "--module-percentage": parseFloat(getProgressPercentage(user)) }}
          >
            <div>
              {/* <strong>{getProgressPercentage(user)}%</strong> */}
              <strong></strong>
              <span>Overall Progress</span>
            </div>
          </div>
        </div>
        <Summary
          icon={<Target style={{ color: "#15803D" }} />}
          value={`${user.quizAttempted.length}/${quizData.length}`}
          label="Quizzes Attempted"
        />
        <Summary
          icon={<CheckCircle2 style={{ color: "#5B21B6" }} />}
          value={`${user.assignmentsDone}/${user.assignmentsDone + user.assignmentsLeft}`}
          label="Assignments Done"
        />
        <Summary
          icon={<Trophy style={{ color: "#854D0E" }} />}
          value={`${user.projectsCompleted.length}/${user.projectsCompleted.length + user.upcomingProjects.length}`}
          label="Projects Completed"
        />
      </div>
      <section className="card learning-progress">
        {/* <div className="progress-section-title">
          <h3>Learning Progress</h3>
          <span>Module completion</span>
        </div> */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Modules</th>
                <th>Topics</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>
                    {user.moduleProgress[r.id - 1]}/{r.lessons.length}
                  </td>
                  <td>
                    <div className="table-progress">
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${((100 * user.moduleProgress[r.id - 1]) / r.lessons.length).toFixed(2)}%`,
                          }}
                        />
                      </div>
                      {(
                        (100 * user.moduleProgress[r.id - 1]) /
                        r.lessons.length
                      ).toFixed(2)}
                      %
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status ${(100 * user.moduleProgress[r.id - 1]) / r.lessons.length == 100 ? "completed" : "in-progress"}`}
                    >
                      {(100 * user.moduleProgress[r.id - 1]) /
                        r.lessons.length ==
                      100
                        ? "Completed"
                        : "In Progress"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="achievement-row">
        <div className="card achievement-card">
          <Star />
          <div>
            <strong>Overall Performance</strong>
            <b>{user.performance}%</b>
            <span>Your performance is above average</span>
          </div>
        </div>
        <div className="card rating-card">
          <StarRating rating={user.rating} maxStars={5} />
        </div>
      </div>
    </div>
  );
}
function Summary({ icon, value, label }) {
  return (
    <div className={`card summary-card ${label}`}>
      <div className="summary-icon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
