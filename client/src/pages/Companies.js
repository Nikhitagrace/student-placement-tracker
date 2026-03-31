import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyAPI } from '../utils/api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyAPI.getAll(searchTerm);
      setCompanies(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching companies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companyAPI.delete(id);
        setCompanies(companies.filter(company => company._id !== id));
      } catch (err) {
        setError(err.message || 'Error deleting company');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading companies...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-20">
        <h2>Companies</h2>
        <Link to="/companies/add" className="btn btn-success">Add Company</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by company name, location, or job role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {companies.length === 0 ? (
        <div className="card text-center">
          <p>No companies found.</p>
          <Link to="/companies/add" className="btn btn-success">Add First Company</Link>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Location</th>
                <th>Package (LPA)</th>
                <th>Job Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>{company.company_name}</td>
                  <td>{company.location}</td>
                  <td>₹{company.package} LPA</td>
                  <td>{company.job_role}</td>
                  <td>
                    <span 
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        backgroundColor: company.active ? '#d4edda' : '#f8d7da',
                        color: company.active ? '#155724' : '#721c24'
                      }}
                    >
                      {company.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <Link 
                      to={`/placements/add?companyId=${company._id}`} 
                      className="btn btn-warning"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      Add Placement
                    </Link>
                    <button 
                      onClick={() => handleDelete(company._id)}
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

export default Companies;
