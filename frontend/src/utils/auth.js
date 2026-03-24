// src/utils/auth.js

/**
 * Custom authentication utility using localStorage
 */

const USERS_KEY = 'leadflow_users';
const SESSION_KEY = 'leadflow_session';

/**
 * Get all registered users from localStorage
 */
export const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

/**
 * Register a new user
 */
export const signup = (userData) => {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists with this email');
    }

    // Add new user
    const newUser = {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        id: Date.now().toString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    
    // Auto login after signup
    return login(userData.email, userData.password);
};

/**
 * Verify credentials and start a session
 */
export const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Create session (omitting password for security in session)
    const { password: _, ...sessionUser } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    
    return sessionUser;
};

/**
 * Get the currently logged in user
 */
export const getCurrentUser = () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
};

/**
 * End the current session
 */
export const logout = () => {
    localStorage.removeItem(SESSION_KEY);
};

/**
 * Check if a user is logged in
 */
export const isAuthenticated = () => {
    return !!getCurrentUser();
};
