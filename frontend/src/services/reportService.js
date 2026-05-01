import api from '../utils/api';

export const fetchReportsSummary = async (range) => {
    try {
        const response = await api.get('/api/reports/', { params: { range } });
        return response.data;
    } catch (error) {
        console.error('Error fetching reports summary:', error);
        throw error;
    }
};
