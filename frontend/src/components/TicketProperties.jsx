import React, { useState, useEffect } from 'react';
import TicketsAPI from '../api/TicketsApi.js';
import UsersAPI from '../api/UsersApi.js';

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

function TicketProperties({ ticket }) {
  const [ticketDetails, setTicketDetails] = useState(ticket);
  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const priorityMapping = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await TicketsAPI.getCategories();
        console.log(categories);
        setCategories(categories);
        setLoadingCategories(false);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    const fetchAgents = async () => {
      try {
        const users = await UsersAPI.getUsersList();
        console.log(users);
        setAgents(users);
        setLoadingAgents(false);
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      }
    };

    fetchCategories();
    fetchAgents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({
      ...ticketDetails,
      [name]: value
    });
    TicketsAPI.updateTicket(ticketDetails.id, { [name]: value });
  };

  return (
    <div className="ticket-properties">
      <h3>Ticket Properties</h3>
      
      <div className="property-group">
        <h4>Contact Info</h4>
        <div className="property">
          <p>{ticketDetails.created_by}</p>
          <p style={{fontSize:"0.8rem"}}>{ticketDetails.user_email}</p>
          <p>{ticketDetails.tenant}</p>
          <p style={{fontSize:"0.8rem"}}>{formatPhoneNumber(ticketDetails.tenant_phone)}</p>
        </div>
      </div>
      
      <div className="property-group">
        <h4>Ticket Information</h4>
        <div className="property">
          <label><strong>Status:</strong></label>
          <input value={ticketDetails.status.toUpperCase()} readOnly></input>

        </div>
        <div className="property">
          <label><strong>Agent:</strong></label>
          {loadingAgents ? (
            <p>Loading agents...</p>
          ) : (
            <select 
            name="assigned_to" 
            value={ticketDetails.assigned_to || ''} 
            onChange={handleChange} 
            >
              <option value="">Select an agent</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.username}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="property">
          <label><strong>Category:</strong></label>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <select 
            name="category" 
            value={ticketDetails.category || ''} 
            onChange={handleChange} 
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="property">
          <label><strong>Priority:</strong></label>
          <select 
            name="priority" 
            value={ticketDetails.priority || ''} 
            onChange={handleChange} > 
            <option value="">Select a priority</option> 
            {Object.entries(priorityMapping).map(([value, label]) => ( 
              <option key={value} value={value}> 
              {label} 
            </option> ))} 
          </select>
        </div>
        <div className="property">
          <label><strong>Due Date:</strong></label>
          <input 
            type="date" 
            name="due_date" 
            value={ticketDetails.due_date ? new Date(ticketDetails.due_date).toISOString().split('T')[0] : ''} 
            onChange={handleChange} 
          />
        </div>
      </div>
    </div>
  );
}

export default TicketProperties;