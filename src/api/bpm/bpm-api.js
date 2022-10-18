import { getCurrentUser, login, logout } from './auth';
import { changeUserPassword, getUser, updateUser } from './users/user';
import { getRoles, updateRole } from './options/roles';
import { createLeadSource, getLeadSource, getLeadSources, updateLeadSource } from './options/lead-sources';

class API {}

// ============================= AUTH ============================= //
API.prototype.login = login;
API.prototype.logout = logout;
API.prototype.getCurrentUser = getCurrentUser;

// ============================= USERS ============================ //
API.prototype.updateUser = updateUser;
API.prototype.getUser = getUser;
API.prototype.changeUserPassword = changeUserPassword;

// ============================= ROLES ============================ //
API.prototype.getRoles = getRoles;
API.prototype.updateRole = updateRole;

// ========================= LEAD SOURCES ========================= //
API.prototype.getLeadSources = getLeadSources;
API.prototype.getLeadSource = getLeadSource;
API.prototype.createLeadSource = createLeadSource;
API.prototype.updateLeadSource = updateLeadSource;

export const bpmAPI = new API();
