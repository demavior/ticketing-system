import { useState, useEffect } from 'react';
import TicketsAPI from '../api/TicketsApi.js';

function TicketMain({ ticket }) {
  const [activeTab, setActiveTab] = useState('details');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const comments = await TicketsAPI.getComments(ticket.id);
      setComments(comments);
    } catch (error) {
      console.error('Error getting comments:', error);
    }
  };

  const addComment = async () => {
    try {
      const data = { comment: newComment };
      const comment = await TicketsAPI.createComment(ticket.id, data);
      setComments((prevComments) => [...prevComments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  } , [ticket.id]);

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
          <div className="ticket-details">
            <div className='ticket-description'>
              <h3>Description</h3>
              <p>{ticket.description}</p>
            </div>
            <div>
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id} className="ticket-description">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">{new Date(comment.created_at).toLocaleString()}</span>
                    </div>
                    <p>{comment.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ticket-comment">
            <textarea placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={addComment}>Send</button>
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