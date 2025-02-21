import "../styles/Home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../redux/userReducer";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [quizCode, setQuizCode] = useState("");

  const handleJoinQuiz = () => {
    if (quizCode.trim() === "") {
      alert("Please enter a valid quiz code!");
      return;
    }
    navigate(`/quiz/${quizCode}`);
  };

  const navigate = useNavigate();

  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });

  const [registerCred, setRegisterCred] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state?.user?.loading);

  const handleLogin = () => {
    dispatch(loginUser(loginCred));
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const handleRegister = () => {
    dispatch(registerUser(registerCred));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <img
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=36&h=36&fit=crop&crop=faces"
            alt="EduQuiz Logo"
          />
          Quizpi
        </div>
        <div className="nav-links">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#features">Features</a>
          <a href="#analytics">Analytics</a>
          {user.user ? (
            <div
              className="user-profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="user-name">{user ? user?.user?.name : ""}</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to the Quiz Application</h1>
          <p>Teachers can create quizzes, and students can attempt them.</p>
          <div>
            {user.user !== null ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter Quiz Code"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value)}
                  className="quiz-input"
                />
                <button
                  className="primary-btn"
                  onClick={() => navigate("/create")}
                >
                  Create Quiz +
                </button>
                <button className="primary-btn" onClick={handleJoinQuiz}>
                  Start Quiz
                </button>
              </div>
            ) : (
              <button
                className="primary-btn"
                onClick={() => setShowModal(true)}
              >
                Join Quizpi
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Login/Register Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="auth-tabs">
              <button
                className={activeTab === "login" ? "tab-btn active" : "tab-btn"}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={
                  activeTab === "register" ? "tab-btn active" : "tab-btn"
                }
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </div>
            {activeTab === "login" ? (
              <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginCred.email}
                    onChange={(e) =>
                      setLoginCred((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginCred.password}
                    onChange={(e) =>
                      setLoginCred((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="submit"
                    className="primary-btn"
                    onClick={handleLogin}
                  >
                    {loading ? "Logging In" : "Login"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="auth-form">
                <h2>Register</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={registerCred.name}
                    onChange={(e) =>
                      setRegisterCred((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerCred.email}
                    onChange={(e) =>
                      setRegisterCred((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={registerCred.password}
                    onChange={(e) =>
                      setRegisterCred((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                  <button
                    type="submit"
                    className="primary-btn"
                    onClick={handleRegister}
                  >
                    {loading ? "Creating New Account" : "Register"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
