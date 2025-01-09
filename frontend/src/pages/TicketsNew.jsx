import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketsAPI from '../api/TicketsApi.js';
import Cookies from 'js-cookie';

function TicketsNew() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('open');
  const [assignee, setAssignee] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdBy = Cookies.get('username');
    const createdAt = new Date().toISOString();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('status', status);
    if (priority)
        formData.append('priority', priority);
    formData.append('created_by', createdBy);
    formData.append('created_at', createdAt);
    if (assignee)
        formData.append('assigned_to', assignee);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await TicketsAPI.createTicket(formData);
      navigate('/tickets');
    } catch (err) {
      setError('Failed to create ticket.');
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Create New Ticket</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: 'horizontal', height: '200px' }}
            required
          />

          {/* <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select> */}

          {/* <label htmlFor="assigned_to">Assignee</label>
          <input
            type="text"
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          /> */}

          {/* <label htmlFor="files">Attach Files</label>
          <input
            type="file"
            id="files"
            multiple
            onChange={handleFileChange}
          /> */}

          <div className="form-buttons">
            <button className="cancel-button" type="button" onClick={() => navigate('/tickets')}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketsNew;