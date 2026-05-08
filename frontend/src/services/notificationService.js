import api from '../utils/api';

export const fetchNotifications = async () => {
    const response = await api.get('/notifications/');
    return response.data; // { notifications: [...], unread_count: N }
};

export const markNotificationRead = async (id) => {
    await api.patch(`/notifications/${id}/read/`);
};

export const markAllNotificationsRead = async () => {
    await api.patch('/notifications/mark-all-read/');
};
