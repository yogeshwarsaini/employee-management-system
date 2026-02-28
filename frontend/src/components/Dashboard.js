import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .dash-bg {
    min-height: 100vh;
    background: #020510;
    font-family: 'Rajdhani', sans-serif;
    color: white;
  }

  .dash-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  /* NAVBAR */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    height: 65px;
    background: rgba(2,5,16,0.9);
    border-bottom: 1px solid rgba(0,200,255,0.15);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0,0,0,0.5);
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nav-logo {
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, #00c8ff, #0050ff);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 0 20px rgba(0,200,255,0.4);
  }

  .nav-title {
    font-family: 'Orbitron', monospace;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 3px;
    background: linear-gradient(135deg, #fff, #00c8ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-user {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    background: rgba(0,200,255,0.08);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 25px;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #00c8ff, #0050ff);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .user-name {
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    letter-spacing: 1px;
  }

  .logout-btn {
    padding: 8px 20px;
    background: rgba(255,50,50,0.1);
    border: 1px solid rgba(255,50,50,0.3);
    border-radius: 8px;
    color: #ff6b6b;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .logout-btn:hover {
    background: rgba(255,50,50,0.2);
    box-shadow: 0 0 20px rgba(255,50,50,0.2);
  }

  /* MAIN CONTENT */
  .dash-content {
    padding: 30px;
    position: relative;
  }

  /* STATS */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: rgba(5,15,30,0.8);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    animation: statAppear 0.6s ease forwards;
    opacity: 0;
    transform: translateY(20px);
  }

  .stat-card:nth-child(1) { animation-delay: 0.1s; }
  .stat-card:nth-child(2) { animation-delay: 0.2s; }
  .stat-card:nth-child(3) { animation-delay: 0.3s; }
  .stat-card:nth-child(4) { animation-delay: 0.4s; }

  @keyframes statAppear {
    to { opacity: 1; transform: translateY(0); }
  }

  .stat-card:hover {
    border-color: rgba(0,200,255,0.4);
    box-shadow: 0 0 30px rgba(0,200,255,0.15);
    transform: translateY(-3px);
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,200,255,0.6), transparent);
  }

  .stat-icon {
    font-size: 28px;
    margin-bottom: 12px;
    display: block;
  }

  .stat-value {
    font-family: 'Orbitron', monospace;
    font-size: 28px;
    font-weight: 700;
    color: #00c8ff;
    text-shadow: 0 0 20px rgba(0,200,255,0.5);
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }

  .stat-glow {
    position: absolute;
    bottom: -20px; right: -20px;
    width: 80px; height: 80px;
    border-radius: 50%;
    filter: blur(25px);
    opacity: 0.3;
  }

  /* TABLE SECTION */
  .table-section {
    background: rgba(5,15,30,0.8);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 16px;
    overflow: hidden;
    animation: tableAppear 0.8s ease 0.5s forwards;
    opacity: 0;
  }

  @keyframes tableAppear {
    to { opacity: 1; }
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
    border-bottom: 1px solid rgba(0,200,255,0.1);
    background: rgba(0,200,255,0.03);
  }

  .table-title {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    letter-spacing: 3px;
    color: rgba(255,255,255,0.8);
  }

  .add-btn {
    padding: 10px 22px;
    background: linear-gradient(135deg, #00c8ff, #0050ff);
    border: none;
    border-radius: 8px;
    color: white;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 0 20px rgba(0,200,255,0.3);
  }

  .add-btn:hover {
    box-shadow: 0 0 40px rgba(0,200,255,0.5);
    transform: translateY(-2px);
  }

  .cancel-btn {
    padding: 10px 22px;
    background: rgba(255,100,0,0.1);
    border: 1px solid rgba(255,100,0,0.3);
    border-radius: 8px;
    color: #ff8c00;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
  }
`;

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res =  await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`,{
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const avgSalary = employees.length > 0
    ? Math.round(employees.reduce((a, b) => a + Number(b.salary), 0) / employees.length)
    : 0;

  const depts = [...new Set(employees.map(e => e.department))].length;

  return (
    <div className="dash-bg">
      <div className="dash-grid" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">🏢</div>
          <span className="nav-title">EMS PORTAL</span>
        </div>
        <div className="nav-right">
          <div className="nav-user">
            <div className="user-avatar">👤</div>
            <span className="user-name">{name || 'Admin'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
        </div>
      </nav>

      <div className="dash-content">
        {/* Stats */}
        <div className="stats-grid">
          {[
            { icon: '👥', value: employees.length, label: 'Total Employees', color: '#00c8ff' },
            { icon: '🏬', value: depts, label: 'Departments', color: '#00ff88' },
            { icon: '💰', value: `₹${avgSalary.toLocaleString()}`, label: 'Avg Salary', color: '#ff8c00' },
            { icon: '✅', value: 'Active', label: 'System Status', color: '#00ff88' },
          ].map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-glow" style={{ background: stat.color }} />
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-value" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}88` }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="table-section">
          <div className="table-header">
            <span className="table-title">⚡ EMPLOYEE RECORDS</span>
            <button
              className={showAdd ? 'cancel-btn' : 'add-btn'}
              onClick={() => setShowAdd(!showAdd)}
            >
              {showAdd ? '✕ CANCEL' : '+ ADD EMPLOYEE'}
            </button>
          </div>

          {showAdd && (
            <AddEmployee onAdd={() => { fetchEmployees(); setShowAdd(false); }} />
          )}

          <EmployeeList employees={employees} onRefresh={fetchEmployees} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
