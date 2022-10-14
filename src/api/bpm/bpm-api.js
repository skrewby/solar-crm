import { getCurrentUser, login, logout } from './auth';
import { changeUserPassword, getUser, updateUser } from './users/user';

class API {}

// ============================= AUTH ============================= //
API.prototype.login = login;
API.prototype.logout = logout;
API.prototype.getCurrentUser = getCurrentUser;

// ============================= USERS ============================ //
API.prototype.updateUser = updateUser;
API.prototype.getUser = getUser;
API.prototype.changeUserPassword = changeUserPassword;

export const bpmAPI = new API();
