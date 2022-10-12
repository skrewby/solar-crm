import { getCurrentUser, login, logout } from './auth';

class API {}

// ============================= AUTH ============================= //
API.prototype.login = login;
API.prototype.logout = logout;
API.prototype.getCurrentUser = getCurrentUser;

export const bpmAPI = new API();
