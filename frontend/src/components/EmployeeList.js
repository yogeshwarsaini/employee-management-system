import React, { useEffect } from 'react';
import axios from 'axios';

const styles = `
  .emp-table {
    width: 100%;
    border-collapse: collapse;
  }

  .emp-table thead tr {
    background: rgba(0,200,255,0.05);
    border-bottom: 1px solid rgba(0,200,255,0.1);
  }

  .emp-table th {
    padding: 14px 20px;
    text-align: left;
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(0,200,255,0.6);
    text-transform: uppercase;
    font-weight: 400;
  }

  .emp-table tbody tr {
    border-bottom: 1px solid rgba(0,200,255,0.06);
    transition: all 0.2s ease;
  }

  .emp-table tbody tr:hover {
    background: rgba(0,200,255,0.04);
    border-color: rgba(0,200,255,0.15);
  }

  .emp-table td {
    padding: 16px 20px;
    font-size: 14px;
    color: rgba(255,255,255,0.75);
    letter-spacing: 0.5px;
  }

  .emp-id {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    color: rgba(0,200,255,0.5) !important;
  }

  .emp-name {
    color: white !important;
    font-weight: 600;
    font-size: 15px !important;
  }

  .emp-avatar-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .emp-avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #00c8ff33, #0050ff33);
    border: 1px solid rgba(0,200,255,0.3);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .dept-badge {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(0,200,255,0.08);
    border: 1px solid rgba(0,200,255,0.2);
    border-radius: 20px;
    font-size: 12px;
    color: rgba(0,200,255,0.8);
    letter-spacing: 1px;
  }

  .role-badge {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(255,140,0,0.08);
    border: 1px solid rgba(255,140,0,0.2);
    border-radius: 20px;
    font-size: 12px;
    color: rgba(255,140,0,0.8);
    letter-spacing: 1px;
  }

  .salary-text {
    font-family: 'Orbitron', monospace;
    font-size: 13px !important;
    color: #00ff88 !important;
  }

  .delete-btn {
    padding: 7px 16px;
    background: rgba(255,50,50,0.08);
    border: 1px solid rgba(255,50,50,0.25);
    border-radius: 7px;
    color: #ff6b6b;
    font-size: 12px;
    font-family: 'Orbitron', monospace;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .delete-btn:hover {
    background: rgba(255,50,50,0.2);
    box-shadow: 0 0 15px rgba(255,50,50,0.2);
    border-color: rgba(255,50,50,0.5);
  }

  .no-data {
    text-align: center;
    padding: 60px !important;
    color: rgba(255,255,255,0.2) !important;
    font-family: 'Orbitron', monospace;
    font-size: 12px !important;
    letter-spacing: 3px;
  }

  .table-footer {
    padding: 15px 20px;
    border-top: 1px solid rgba(0,200,255,0.08);
    font-size: 12px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 2px;
    font-family: 'Orbitron', monospace;
  }
`;

const deptIcons = {
  'HR': '👥', 'IT': '💻', 'Finance': '💰', 'Marketing': '📢',
  'Sales': '📊', 'Operations': '⚙️', 'Design': '🎨', 'Legal': '⚖️'
};

function EmployeeList({ employees, onRefresh }) {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefresh();
    } catch (err) {
      alert('Error deleting employee');
    }
  };

  return (
    <>
      <table className="emp-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="7" className="no-data">⚡ NO RECORDS FOUND</td></tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp.id}>
                <td className="emp-id">#{String(index + 1).padStart(3, '0')}</td>
                <td>
                  <div className="emp-avatar-cell">
                    <div className="emp-avatar">
                      {deptIcons[emp.department] || '👤'}
                    </div>
                    <span className="emp-name">{emp.name}</span>
                  </div>
                </td>
                <td>{emp.email}</td>
                <td><span className="dept-badge">{emp.department}</span></td>
                <td><span className="role-badge">{emp.role}</span></td>
                <td className="salary-text">₹{Number(emp.salary).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(emp.id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="table-footer">
        TOTAL RECORDS: {String(employees.length).padStart(3, '0')}
      </div>
    </>
  );
}

export default EmployeeList;
