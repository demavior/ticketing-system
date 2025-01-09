import axios from 'axios';

const TicketsAPI = {
  getTickets: async () => {
    try {
      const response = await axios.get('tickets/');
      return response.data;
    } catch (error) {
      console.error('Error getting tickets:', error);
      return [];
    }
  },

  getTicketById: async (id) => {
    try {
      const response = await axios.get(`tickets/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error getting ticket:', error);
      return {};
    }
  },

  createTicket: async (data) => {
    try {
      const response = await axios.post('tickets/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      return {};
    }
  },

  updateTicket: async (id, data) => {
    try {
      console.log('data:', data);
      const response = await axios.patch(`tickets/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      return {};
    }
  },

  deleteTicket: async (id) => {
    try {
      const response = await axios.delete(`tickets/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      return {};
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get('tickets/categories/');
      return response.data;
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  },
};

export default TicketsAPI;