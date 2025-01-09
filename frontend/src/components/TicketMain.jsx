import { useState } from 'react';

function TicketMain({ ticket }) {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="ticket-main">
      <div className="ticket-header">
        <h2>{ticket.title}</h2>
        <div className="ticket-main-info">
          <p><strong>#</strong>{String(ticket.number).padStart(4, '0')}</p>
          <p><strong>Date Created:</strong> {new Date(ticket.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="tabs">
        <button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Details</button>
        <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>Tasks</button>
        <button className={activeTab === 'attachments' ? 'active' : ''} onClick={() => setActiveTab('attachments')}>Attachments</button>
        <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>History</button>
      </div>
      {activeTab === 'details' && (
        <div className="tab-content">
          <div className="ticket-description">
            <h3>Description</h3>
            <p>{ticket.description}</p>
            <h3>Comments</h3>
            {/* Render comments here */}
          </div>
          <div className="ticket-comment">
            <textarea placeholder="Add a comment..."></textarea>
          </div>
        </div>
      )}
      {/* Placeholder for other tabs */}
      {activeTab === 'tasks' && <div className="tab-content">Tasks content</div>}
      {activeTab === 'attachments' && <div className="tab-content">Attachments content</div>}
      {activeTab === 'history' && <div className="tab-content">History content</div>}
    </div>
  );
}

export default TicketMain;