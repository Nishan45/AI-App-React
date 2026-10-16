import React, { useState } from "react";
import "./PartnerPortal.css";
import {
  MapPin
} from "lucide-react";

const schools = [
  {
    id: 1,
    name: "The Summit School",
    location: "Kolkata",
    students: 420,
    classes: 12,
    progress: 78,
    assessment: 86,
    modules: [
      { name: "Module 1", progress: 100 },
      { name: "Module 2", progress: 82 },
      { name: "Module 3", progress: 68 },
      { name: "Module 4", progress: 41 },
    ],
  },
  {
    id: 2,
    name: "Subhashgram Gems Public School",
    location: "Kolkata",
    students: 350,
    classes: 10,
    progress: 71,
    assessment: 82,
    modules: [
      { name: "Module 1", progress: 100 },
      { name: "Module 2", progress: 76 },
      { name: "Module 3", progress: 64 },
      { name: "Module 4", progress: 44 },
    ],
  },
//   {
//     id: 3,
//     name: "DPS International",
//     location: "Bangalore",
//     students: 510,
//     classes: 15,
//     progress: 84,
//     assessment: 91,
//     modules: [
//       { name: "Module 1", progress: 100 },
//       { name: "Module 2", progress: 92 },
//       { name: "Module 3", progress: 81 },
//       { name: "Module 4", progress: 63 },
//     ],
//   },
];

export default function PartnerPortal() {
  const [activePage, setActivePage] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);

  const filteredSchools = schools.filter((school) =>
    `${school.name} ${school.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalStudents = schools.reduce(
    (total, school) => total + school.students,
    0
  );

  const totalClasses = schools.reduce(
    (total, school) => total + school.classes,
    0
  );

  const averageProgress = Math.round(
    schools.reduce((total, school) => total + school.progress, 0) /
      schools.length
  );

  const openSchool = (school) => {
    setSelectedSchool(school);
  };

  const closeSchool = () => {
    setSelectedSchool(null);
  };

  return (
    
        
        <div className="partner-content">

          {!selectedSchool ? (

            <>

              {/* WELCOME */}
              <section className="welcome-section">

                <div>
                  

                 

                  <p>
                    Explore our partner schools and follow
                    their learning journey.
                  </p>
                </div>

              </section>


              {/* SUMMARY */}
              <section className="partner-summary">

                <div className="summary-card">

                  <div className="summary-icon school">
                    🏫
                  </div>

                  <div>
                    <span>Total Schools</span>
                    <strong>{schools.length}</strong>
                    <small>Our partner schools</small>
                  </div>

                </div>


                <div className="summary-card">

                  <div className="summary-icon students">
                    ♙
                  </div>

                  <div>
                    <span>Total Students</span>
                    <strong>{totalStudents.toLocaleString()}</strong>
                    <small>Across all schools</small>
                  </div>

                </div>


                <div className="summary-card">

                  <div className="summary-icon classes">
                    ▣
                  </div>

                  <div>
                    <span>Active Classes</span>
                    <strong>{totalClasses}</strong>
                    <small>Across all schools</small>
                  </div>

                </div>


                <div className="summary-card">

                  <div className="summary-icon progress">
                    ◔
                  </div>

                  <div>
                    <span>Average Progress</span>
                    <strong>{averageProgress}%</strong>
                    <small>Overall learning progress</small>
                  </div>

                </div>

              </section>


              {/* SCHOOL SECTION */}
              <section className="schools-section">

                <div className="section-heading">

                  <div>
                    <h2>Our Partner Schools</h2>

                    <p>
                      Select a school to view its learning
                      overview.
                    </p>
                  </div>

                  <span className="school-count">
                    {filteredSchools.length} Schools
                  </span>

                </div>


                {/* SEARCH */}
                <div className="school-search">

                  <span className="search-icon">
                    ⌕
                  </span>

                  <input
                    type="text"
                    placeholder="Search school name or location..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                  {search && (
                    <button
                      className="clear-search"
                      onClick={() => setSearch("")}
                    >
                      ×
                    </button>
                  )}

                </div>


                {/* SCHOOL CARDS */}
                <div className="school-grid">

                  {filteredSchools.map((school) => (

                    <article
                      className="school-card"
                      key={school.id}
                    >

                      <div className="school-card-top">

                        <div className="school-icon">
                          🏫
                        </div>

                        <span className="school-status">
                          Active
                        </span>

                      </div>


                      <div className="school-card-content">

                        <h3>{school.name}</h3>

                        <p className="school-location">
                          <MapPin size={14}/>
                          {school.location}
                        </p>


                        <div className="school-stats">

                          <div>
                            <strong>
                              {school.students}
                            </strong>

                            <span>
                              Students
                            </span>
                          </div>

                          <div>
                            <strong>
                              {school.classes}
                            </strong>

                            <span>
                              Classes
                            </span>
                          </div>

                          <div>
                            <strong>
                              {school.assessment}%
                            </strong>

                            <span>
                              Assessment
                            </span>
                          </div>

                        </div>


                        <div className="school-progress">

                          <div className="progress-heading">
                            <span>
                              Learning Progress
                            </span>

                            <strong>
                              {school.progress}%
                            </strong>
                          </div>

                          <div className="progress-track">

                            <div
                              className="progress-value"
                              style={{
                                width: `${school.progress}%`,
                              }}
                            />

                          </div>

                        </div>

                      </div>


                      <button
                        className="view-school-button"
                        onClick={() => openSchool(school)}
                      >
                        View School
                        <span>→</span>
                      </button>

                    </article>

                  ))}

                </div>


                {/* EMPTY */}
                {filteredSchools.length === 0 && (

                  <div className="no-schools">

                    <div>
                      🔍
                    </div>

                    <h3>
                      No schools found
                    </h3>

                    <p>
                      Try searching with a different
                      school name or location.
                    </p>

                    <button
                      onClick={() => setSearch("")}
                    >
                      Clear Search
                    </button>

                  </div>

                )}

              </section>

            </>

          ) : (

            /* SCHOOL DETAIL */

            <section className="school-detail">

              <button
                className="back-button"
                onClick={closeSchool}
              >
                ← Back to Schools
              </button>


              <div className="school-detail-header">

                <div className="detail-school-icon">
                  🏫
                </div>

                <div>

                  <span>
                    PARTNER SCHOOL
                  </span>

                  <h1>
                    {selectedSchool.name}
                  </h1>

                  <p>
                    ⌖ {selectedSchool.location}
                  </p>

                </div>

              </div>


              {/* DETAIL STATS */}
              <div className="detail-stats">

                <div>
                  <span>Students</span>
                  <strong>
                    {selectedSchool.students}
                  </strong>
                </div>

                <div>
                  <span>Classes</span>
                  <strong>
                    {selectedSchool.classes}
                  </strong>
                </div>

                <div>
                  <span>Overall Progress</span>
                  <strong>
                    {selectedSchool.progress}%
                  </strong>
                </div>

                <div>
                  <span>Average Assessment</span>
                  <strong>
                    {selectedSchool.assessment}%
                  </strong>
                </div>

              </div>


              {/* MODULE PROGRESS */}
              <div className="detail-panel">

                <div className="detail-panel-header">

                  <div>
                    <h2>
                      Learning Progress
                    </h2>

                    <p>
                      Overall module progress for this school.
                    </p>
                  </div>

                </div>


                <div className="module-progress-list">

                  {selectedSchool.modules.map((module) => (

                    <div
                      className="module-progress"
                      key={module.name}
                    >

                      <div className="module-info">

                        <span>
                          {module.name}
                        </span>

                        <strong>
                          {module.progress}%
                        </strong>

                      </div>

                      <div className="module-track">

                        <div
                          style={{
                            width: `${module.progress}%`,
                          }}
                        />

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* RECENT ACTIVITY */}
              <div className="detail-panel">

                <div className="detail-panel-header">

                  <div>
                    <h2>
                      Recent Learning Activity
                    </h2>

                    <p>
                      Latest activity from this school.
                    </p>
                  </div>

                </div>


                <div className="activity-list">

                  <div className="activity-item">

                    <span className="activity-check">
                      ✓
                    </span>

                    <div>
                      <strong>
                        Module 2 completed
                      </strong>

                      <span>
                        Class 8A completed Module 2
                      </span>
                    </div>

                    <time>
                      Today
                    </time>

                  </div>


                  <div className="activity-item">

                    <span className="activity-check">
                      ✓
                    </span>

                    <div>
                      <strong>
                        Assessment completed
                      </strong>

                      <span>
                        Students completed Assessment 2
                      </span>
                    </div>

                    <time>
                      Yesterday
                    </time>

                  </div>


                  <div className="activity-item">

                    <span className="activity-play">
                      ▶
                    </span>

                    <div>
                      <strong>
                        Module 3 in progress
                      </strong>

                      <span>
                        Class 7B is learning Module 3
                      </span>
                    </div>

                    <time>
                      2 days ago
                    </time>

                  </div>

                </div>

              </div>

            </section>

          )}

        </div>

      

    
  );
}