import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TicketsAPI from '../api/TicketsApi.js';
import TicketProperties from '../components/TicketProperties';
import TicketMain from '../components/TicketMain';
import '../assets/styles/TicketDetails.css';

function TicketDetails() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticket = await TicketsAPI.getTicketById(ticketId);
        setTicket(ticket);
      } catch (err) {
        setError('Failed to fetch ticket details.');
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!ticket) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-container">
      <div className="ticket-details-container">
        <TicketProperties ticket={ticket} />
        <TicketMain ticket={ticket} />
      </div>
    </div>
  );
}

export default TicketDetails;