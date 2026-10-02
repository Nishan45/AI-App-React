import React, { useState, useRef, useEffect } from "react";
import "./LearningResources.css";
import { resourceData } from "../../data/courseData";



export default function LearningResources() {
  const [selectedModule, setSelectedModule] = useState("Module 1");
  const [activeTab, setActiveTab] = useState("assignments");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const module = resourceData[selectedModule];
  const resources = module?.[activeTab] || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="learning-resources-page">
      <header className="resources-header">
        <h1>📖 Explore handpicked e-books, reference PDFs, and guides right here</h1>
      </header>

      {/* Tabs */}
      <div className="resource-tabs">
        <button
          type="button"
          className={
            activeTab === "assignments"
              ? "resource-tab active"
              : "resource-tab"
          }
          onClick={() => setActiveTab("assignments")}
        >
          Assignments
        </button>

        <button
          type="button"
          className={
            activeTab === "notes" ? "resource-tab active" : "resource-tab"
          }
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
      </div>

      {/* Custom Module Dropdown */}
      <div className="module-dropdown-wrapper" ref={dropdownRef}>
        <button
          type="button"
          className={`module-selector ${
            dropdownOpen ? "dropdown-active" : ""
          }`}
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className="module-selector-left">
            <div className="module-book-icon">
              <span>▤</span>
            </div>

            <div className="module-selector-info">
              <span className="module-label">MODULE</span>

              <span className="selected-module-name">
                {selectedModule}: {module.name}
              </span>
            </div>
          </div>

          <span
            className={`module-arrow ${
              dropdownOpen ? "arrow-up" : ""
            }`}
          >
           ⌄
          </span>
        </button>

        {dropdownOpen && (
          <div className="module-dropdown-menu">
            {Object.keys(resourceData).map((moduleName) => {
              const isSelected = selectedModule === moduleName;

              return (
                <button
                  type="button"
                  key={moduleName}
                  className={`module-option ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedModule(moduleName);
                    setDropdownOpen(false);
                  }}
                >
                  <div className="option-icon">
                    <span>▤</span>
                  </div>

                  <div className="option-content">
                    <span className="option-module">
                      {moduleName}
                    </span>

                    <span className="option-name">
                      {resourceData[moduleName].name}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="selected-check">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Resources */}
      <section className="resource-list">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <article className="resource-item" key={resource.id}>
              <div className="pdf-icon">
                <div className="pdf-fold"></div>
                <span>PDF</span>
              </div>

              <div className="resource-details">
                <h3>{resource.title}</h3>

                <div className="resource-meta">
                  <span className="pdf-label">PDF</span>
                  <span className="meta-separator">•</span>
                  <span>{resource.size}</span>
                </div>
              </div>

              <a
                href={resource.file}
                download
                className="download-btn"
              >
                <span className="download-symbol">↓</span>
                Download
              </a>
            </article>
          ))
        ) : (
          <div className="empty-resources">
            <div className="empty-icon">📄</div>

            <h3>No resources available</h3>

            <p>
              There are currently no resources available for this module.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}