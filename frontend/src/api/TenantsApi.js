import axios from 'axios';

const TenantsAPI = {
    getTenants: async () => (await axios.get('tenants/')).data,
    
    getCurrentTenant: async () => (await axios.get('tenants/current/')).data,
    
    getTenantById: async (id) => (await axios.get(`tenants/${id}/`)).data,
    
    updateTenant: async (id, data) => (await axios.patch(`tenants/${id}/`, data)).data,

};

export default TenantsAPI;