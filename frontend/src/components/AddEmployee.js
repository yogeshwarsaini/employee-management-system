import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = `
  .add-form-wrapper {
    padding: 25px;
    border-bottom: 1px solid rgba(0,200,255,0.1);
    background: rgba(0,200,255,0.02);
    animation: formSlide 0.3s ease forwards;
  }

  @keyframes formSlide {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .add-form-title {
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    letter-spacing: 3px;
    color: rgba(0,200,255,0.6);
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .add-form-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 20px;
  }

  .add-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .add-field label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(0,200,255,0.5);
    font-family: 'Orbitron', monospace;
  }

  .add-input {
    padding: 12px 15px;
    background: rgba(0,200,255,0.04);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-family: 'Rajdhani', sans-serif;
    letter-spacing: 1px;
    outline: none;
    transition: all 0.3s;
    width: 100%;
  }

  .add-input:focus {
    border-color: rgba(0,200,255,0.5);
    background: rgba(0,200,255,0.08);
    box-shadow: 0 0 15px rgba(0,200,255,0.1);
  }

  .add-input::placeholder { color: rgba(255,255,255,0.2); }

  .add-select {
    padding: 12px 15px;
    background: rgba(0,200,255,0.04);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-family: 'Rajdhani', sans-serif;
    letter-spacing: 1px;
    outline: none;
    transition: all 0.3s;
    width: 100%;
    cursor: pointer;
  }

  .add-select option { background: #020510; color: white; }

  .add-select:focus {
    border-color: rgba(0,200,255,0.5);
    box-shadow: 0 0 15px rgba(0,200,255,0.1);
  }

  .submit-btn {
    padding: 13px 35px;
    background: linear-gradient(135deg, #00c8ff, #0050ff);
    border: none;
    border-radius: 8px;
    color: white;
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 0 25px rgba(0,200,255,0.3);
  }

  .submit-btn:hover {
    box-shadow: 0 0 40px rgba(0,200,255,0.5);
    transform: translateY(-2px);
  }
`;

function AddEmployee({ onAdd }) {
  const [form, setForm] = useState({
    name: '', email: '', department: '', salary: '', role: ''
  });

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
       await axios.post(`${process.env.REACT_APP_API_URL}/api/employees`,form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onAdd();
      setForm({ name: '', email: '', department: '', salary: '', role: '' });
    } catch (err) {
      alert('Error adding employee');
    }
  };

  return (
    <div className="add-form-wrapper">
      <div className="add-form-title">⚡ New Employee Record</div>
      <form onSubmit={handleSubmit}>
        <div className="add-form-grid">
          <div className="add-field">
            <label>Full Name</label>
            <input className="add-input" placeholder="John Doe"
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="add-field">
            <label>Email</label>
            <input className="add-input" type="email" placeholder="john@company.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="add-field">
            <label>Department</label>
            <select className="add-select"
              value={form.department} onChange={e => setForm({...form, department: e.target.value})} required>
              <option value="">Select Department</option>
              {['IT','HR','Finance','Marketing','Sales','Operations','Design','Legal'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="add-field">
            <label>Salary (₹)</label>
            <input className="add-input" type="number" placeholder="50000"
              value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} required />
          </div>
          <div className="add-field">
            <label>Role</label>
            <select className="add-select"
              value={form.role} onChange={e => setForm({...form, role: e.target.value})} required>
              <option value="">Select Role</option>
              {['Manager','Senior Engineer','Engineer','Analyst','Designer','Executive','Intern'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="submit-btn" type="submit">+ ADD RECORD</button>
      </form>
    </div>
  );
}

export default AddEmployee;
