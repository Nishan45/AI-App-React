import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Layers3,
  FileText,
  Trophy,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  Bot,
  LifeBuoy,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import "./AppShell.css";
import { useAuth } from "../contextApi";

const navItems = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/class-lectures", "Class Lectures", BookOpen],
  ["/modules", "Modules", Layers3],
  ["/learning-resources", "Learning Resources", FileText],
  ["/challenge-zone", "Challenge Zone", Trophy],
  ["/projects-activities", "Projects & Activities", BriefcaseBusiness],
  ["/my-progress", "My Progress", ChartNoAxesColumnIncreasing],
  ["/ai-learning-buddy", "AI Learning Buddy", Bot],
  ["/help-support", "Help & Support", LifeBuoy],
];

export default function AppShell() {
  const [open, setOpen] = React.useState(false),
    [profileOpen, setProfileOpen] = React.useState(false);
  const {user}=useAuth();
  const { logout } = useAuth();
  const location = useLocation(),
    navigate = useNavigate();
  const active =
    navItems.find(([path]) => location.pathname === path)?.[1] || "Dashboard";
  const logOut = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };
  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">AI</div>
          <div>
            <div className="brand-name">AI Learners</div>
            <div className="brand-caption">Learn • Build • Create</div>
          </div>
        </div>
        <nav className="side-nav">
          {navItems.map(([path, label, Icon]) => (
            <button
              key={path}
              className={`nav-item ${location.pathname === path ? "active" : ""}`}
              onClick={() => {
                navigate(path);
                setOpen(false);
              }}
            >
              <Icon size={15} strokeWidth={2.2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-buddy">
            <div className="mini-bot">◉</div>
            <div>
              <strong>Need a buddy?</strong>
              <span>Ask AI for help</span>
            </div>
          </div>
        </div>
      </aside>
      <div className="shell-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <div className="crumb">AI Learners</div>
              <div className="current-page">{active}</div>
            </div>
          </div>
          <div className="profile-menu-wrap">
            <button
              className="profile"
              onClick={() => setProfileOpen((v) => !v)}
              aria-expanded={profileOpen}
            >
              <div className="avatar">{user.firstName[0]}{user.lastName[0]}</div>
              <div className="profile-text">
                <strong>{user.firstName} {user.lastName}</strong>
                <span>Class {user.class}</span>
              </div>
              <ChevronDown size={14} />
            </button>
            {profileOpen && (
              <div className="profile-dropdown">
                <button onClick={() => navigate("/my-progress")}>
                  <div className="avatar small">{user.firstName[0]}{user.lastName[0]}</div>
                  <span>My Progress</span>
                </button>
                <button className="logout-item" onClick={logOut}>
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      {open && (
        <button
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}
    </div>
  );
}
