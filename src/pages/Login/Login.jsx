import React, { useEffect } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../components/contextApi";
import { studentProfile } from "../../data/courseData";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const {login } = useAuth();

  useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user_profile');
        if (storedUser) {
          navigate("/dashboard");
        }
      }
    }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email/student ID and password.");
      return;
    }
    setError("");
    const matchedStudent = studentProfile.find(
      (student) => student.studentId === email && student.password === password,
    );
    if (matchedStudent) {
      console.log("Login Successful!");
      login(matchedStudent)
      navigate("/dashboard");
    } else {
      console.log("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <section className="login-brand-panel"></section>
      <section className="login-form-panel">
        <form className="login-form-wrap" onSubmit={submit}>
          <div className="welcome-icon">👋</div>
          <h2>Welcome Back!</h2>
          <p>Login to continue your learning journey</p>

          <label htmlFor="login-email">Student ID / Email</label>
          <div className="input-wrap">
            <UserRound size={16} />
            <input
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your student ID or email"
            />
          </div>

          <label htmlFor="login-password">Password</label>
          <div className="input-wrap">
            <LockKeyhole size={16} />
            <input
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              // aria-label="Show password"
            >
              {!showPassword?<Eye size={15}/>:<EyeOff size={15}/>}
            </button>
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" /> Remember Me
            </label>
            <button type="button">Forgot Password?</button>
          </div>

          <button className="login-btn" type="submit">
            Login <ArrowRight size={16} />
          </button>
          <div className="login-divider">
            <span>New here?</span>
          </div>
          <button className="school-link" type="button">
            Contact your school
          </button>
          <div className="login-note">
            <Mail size={12} /> Your school manages student accounts.
          </div>
        </form>
      </section>
    </div>
  );
}
