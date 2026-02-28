import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .login-bg {
    min-height: 100vh;
    background: #020510;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Rajdhani', sans-serif;
    overflow: hidden;
    position: relative;
  }

  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,200,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,200,255,0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% { transform: perspective(500px) rotateX(10deg) translateY(0); }
    100% { transform: perspective(500px) rotateX(10deg) translateY(50px); }
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    animation: orbFloat 8s ease-in-out infinite;
    pointer-events: none;
  }
  .orb1 { width: 400px; height: 400px; background: rgba(0,150,255,0.15); top: -100px; left: -100px; animation-delay: 0s; }
  .orb2 { width: 300px; height: 300px; background: rgba(0,255,200,0.1); bottom: -50px; right: -50px; animation-delay: -3s; }
  .orb3 { width: 200px; height: 200px; background: rgba(100,0,255,0.1); top: 50%; left: 50%; animation-delay: -5s; }

  @keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.1); }
  }

  .login-card {
    position: relative;
    width: 420px;
    padding: 50px 40px;
    background: rgba(5, 15, 30, 0.8);
    border: 1px solid rgba(0, 200, 255, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow:
      0 0 40px rgba(0, 200, 255, 0.1),
      0 0 80px rgba(0, 100, 255, 0.05),
      inset 0 1px 0 rgba(255,255,255,0.05);
    animation: cardAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    transform: translateY(30px);
    opacity: 0;
  }

  @keyframes cardAppear {
    to { transform: translateY(0); opacity: 1; }
  }

  .card-glow {
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(0,200,255,0.3), transparent 50%, rgba(0,100,255,0.2));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    padding: 1px;
    pointer-events: none;
  }

  .logo-section {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo-icon {
    width: 70px;
    height: 70px;
    margin: 0 auto 15px;
    background: linear-gradient(135deg, #00c8ff, #0050ff);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    box-shadow: 0 0 30px rgba(0,200,255,0.4), 0 0 60px rgba(0,100,255,0.2);
    animation: iconPulse 3s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% { box-shadow: 0 0 30px rgba(0,200,255,0.4), 0 0 60px rgba(0,100,255,0.2); }
    50% { box-shadow: 0 0 50px rgba(0,200,255,0.6), 0 0 100px rgba(0,100,255,0.3); }
  }

  .logo-title {
    font-family: 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .logo-sub {
    font-size: 13px;
    color: rgba(0,200,255,0.7);
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-top: 5px;
  }

  .input-group {
    margin-bottom: 20px;
    position: relative;
  }

  .input-label {
    display: block;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(0,200,255,0.7);
    margin-bottom: 8px;
    font-family: 'Orbitron', monospace;
  }

  .input-wrapper {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    z-index: 1;
  }

  .login-input {
    width: 100%;
    padding: 14px 14px 14px 45px;
    background: rgba(0, 200, 255, 0.04);
    border: 1px solid rgba(0, 200, 255, 0.15);
    border-radius: 10px;
    color: #fff;
    font-size: 15px;
    font-family: 'Rajdhani', sans-serif;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    outline: none;
  }

  .login-input:focus {
    border-color: rgba(0, 200, 255, 0.6);
    background: rgba(0, 200, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 200, 255, 0.15), inset 0 0 20px rgba(0,200,255,0.03);
  }

  .login-input::placeholder { color: rgba(255,255,255,0.2); }

  .login-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #00c8ff, #0050ff);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 0 30px rgba(0,200,255,0.3);
    margin-top: 10px;
  }

  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 50px rgba(0,200,255,0.5), 0 10px 30px rgba(0,100,255,0.3);
  }

  .login-btn:active { transform: translateY(0); }

  .btn-shine {
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .login-btn:hover .btn-shine { left: 100%; }

  .error-msg {
    background: rgba(255, 50, 50, 0.1);
    border: 1px solid rgba(255,50,50,0.3);
    border-radius: 8px;
    padding: 12px;
    color: #ff6b6b;
    font-size: 13px;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 20px;
    animation: shake 0.4s ease;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 25px 0;
    gap: 10px;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: rgba(0,200,255,0.15);
  }

  .divider-text {
    font-size: 11px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 2px;
  }

  .demo-creds {
    background: rgba(0,200,255,0.05);
    border: 1px solid rgba(0,200,255,0.1);
    border-radius: 8px;
    padding: 12px 15px;
    text-align: center;
  }

  .demo-title {
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(0,200,255,0.5);
    text-transform: uppercase;
    margin-bottom: 6px;
    font-family: 'Orbitron', monospace;
  }

  .demo-info {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    letter-spacing: 1px;
  }

  .corner {
    position: absolute;
    width: 15px;
    height: 15px;
    border-color: rgba(0,200,255,0.5);
    border-style: solid;
  }
  .corner-tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
  .corner-tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }
  .corner-bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }
  .corner-br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }

  .loading-dots span {
    display: inline-block;
    width: 6px; height: 6px;
    background: white;
    border-radius: 50%;
    margin: 0 3px;
    animation: dot 1.2s ease-in-out infinite;
  }
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes dot {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1.2); opacity: 1; }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      navigate('/dashboard');
    } catch (err) {
      setError('⚠ Access Denied — Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="grid-bg" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div className="login-card">
        <div className="card-glow" />
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        <div className="logo-section">
          <div className="logo-icon">🏢</div>
          <div className="logo-title">EMS Portal</div>
          <div className="logo-sub">Employee Management System</div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                className="login-input"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔐</span>
              <input
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            <span className="btn-shine" />
            {loading ? (
              <div className="loading-dots">
                <span /><span /><span />
              </div>
            ) : 'ACCESS SYSTEM'}
          </button>
        </form>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">DEMO</span>
          <div className="divider-line" />
        </div>

        <div className="demo-creds">
          <div className="demo-title">Test Credentials</div>
          <div className="demo-info">admin@company.com / admin123</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
