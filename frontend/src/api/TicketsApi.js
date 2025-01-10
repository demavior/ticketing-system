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

  getComments: async (ticketId) => {
    try {
      const response = await axios.get(`tickets/${ticketId}/comments/`);
      return response.data;
    } catch (error) {
      console.error('Error getting comments:', error);
      return [];
    }
  },

  createComment: async (ticketId, data) => {
    try {
      const response = await axios.post(`tickets/${ticketId}/comments/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      return {};
    }
  },

  updateComment: async (ticketId, commentId, data) => {
    try {
      const response = await axios.patch(`tickets/${ticketId}/comments/${commentId}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      return {};
    }
  },

  deleteComment: async (ticketId, commentId) => {
    try {
      const response = await axios.delete(`tickets/${ticketId}/comments/${commentId}/`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return {};
    }
  },

  getTasks: async (ticketId) => {
    try {
      const response = await axios.get(`tickets/${ticketId}/tasks/`);
      return response.data;
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  },

  createTask: async (ticketId, data) => {
    try {
      const response = await axios.post(`tickets/${ticketId}/tasks/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      return {};
    }
  },

  updateTask: async (ticketId, taskId, data) => {
    try {
      const response = await axios.patch(`tickets/${ticketId}/tasks/${taskId}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      return {};
    }
  },
  
};

export default TicketsAPI;