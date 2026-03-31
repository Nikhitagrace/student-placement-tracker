import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI } from '../utils/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [searchTerm]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getAll(searchTerm);
      setStudents(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.delete(id);
        setStudents(students.filter(student => student._id !== id));
      } catch (err) {
        setError(err.message || 'Error deleting student');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-20">
        <h2>Students</h2>
        <Link to="/students/add" className="btn btn-primary">Add Student</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, email, or branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {students.length === 0 ? (
        <div className="card text-center">
          <p>No students found.</p>
          <Link to="/students/add" className="btn btn-primary">Add First Student</Link>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>CGPA</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.branch}</td>
                  <td>{student.cgpa}</td>
                  <td>{student.phone}</td>
                  <td>
                    <span 
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        backgroundColor: student.placed ? '#d4edda' : '#f8d7da',
                        color: student.placed ? '#155724' : '#721c24'
                      }}
                    >
                      {student.placed ? 'Placed' : 'Not Placed'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <Link 
                      to={`/placements/add?studentId=${student._id}`} 
                      className="btn btn-warning"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      Add Placement
                    </Link>
                    <button 
                      onClick={() => handleDelete(student._id)}
                      className="btn btn-danger"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;
