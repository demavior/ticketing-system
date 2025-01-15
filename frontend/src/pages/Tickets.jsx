import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TicketsAPI from '../api/TicketsApi.js';
import '../assets/styles/Tickets.css';
import Cookies from 'js-cookie';

function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'number', direction: 'ascending' });
  const [error, setError] = useState('');
  const role = Cookies.get('role');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await TicketsAPI.getTickets(filters);
        setTickets(tickets);
      } catch (err) {
        setError('Failed to fetch tickets.');
      }
    };

    fetchTickets();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleAddTicket = () => {
    navigate('/tickets/new');
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="main-container">
      <div className="tickets-container">
        <h2>Tickets</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="filters">
          <button onClick={handleAddTicket}>Add Ticket</button>
          <label>
            Status:
            <select name="status" value={filters.status.toLocaleUpperCase()} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </label>
          <label>
            Priority:
            <select name="priority" value={filters.priority_name} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <table className="tickets-table">
          <thead>
            <tr>
              {['agent', 'admin'].includes(role) && (
              <th onClick={() => handleSort('tenant_name')}>Tenant</th>
              )}
              <th onClick={() => handleSort('number')}>#</th>
              <th onClick={() => handleSort('title')}>Title</th>
              <th onClick={() => handleSort('status')}>Status</th>
              <th onClick={() => handleSort('priority')}>Priority</th>
              <th onClick={() => handleSort('assigned_to')}>Agent</th>
              <th onClick={() => handleSort('due_date')}>Due Date</th>
              <th onClick={() => handleSort('created_at')}>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {sortedTickets.map((ticket) => (
              <tr key={ticket.id}>
                {['agent', 'admin'].includes(role) && (
                  <td>{ticket.tenant_name}</td>
                )}
                <td>
                  <Link to={`/tickets/${ticket.id}`}>{ticket.number}</Link>
                </td>
                <td>
                  <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                </td>
                <td>{ticket.status.toLocaleUpperCase()}</td>
                <td>{ticket.priority_name}</td>
                <td>{ticket.assigned_to_name}</td>
                <td>{ticket.due_date ? new Date(ticket.due_date).toLocaleDateString() : ''} </td>
                <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;