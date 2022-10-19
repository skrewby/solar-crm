import { getCurrentUser, login, logout } from './auth';
import { changeUserPassword, getUser, getUsers, updateUser, addUser } from './users/user';
import { getRoles, updateRole } from './options/roles';
import { createLeadSource, getLeadSource, getLeadSources, updateLeadSource } from './options/lead-sources';
import { createPhase, getPhase, getPhases, updatePhase } from './options/phases';
import { createStory, getStories, getStory, updateStory } from './options/stories';
import {
  getExistingSystemOptions,
  getExistingSystemOption,
  createExistingSystemOption,
  updateExistingSystemOption
} from './options/existing-system';
import { addRoofType, getRoofType, getRoofTypes, updateRoofType } from './options/roof-types';
import { addRoofPitch, getRoofPitch, getRoofPitches, updateRoofPitch } from './options/roof-pitch';
import { addStockType, getStockType, getStockTypes, updateStockType } from './options/stock-types';

class API {}

// ============================= AUTH ============================= //
API.prototype.login = login;
API.prototype.logout = logout;
API.prototype.getCurrentUser = getCurrentUser;

// ============================= USERS ============================ //
API.prototype.getUsers = getUsers;
API.prototype.updateUser = updateUser;
API.prototype.getUser = getUser;
API.prototype.addUser = addUser;
API.prototype.changeUserPassword = changeUserPassword;

// ============================= ROLES ============================ //
API.prototype.getRoles = getRoles;
API.prototype.updateRole = updateRole;

// ========================= LEAD SOURCES ========================= //
API.prototype.getLeadSources = getLeadSources;
API.prototype.getLeadSource = getLeadSource;
API.prototype.createLeadSource = createLeadSource;
API.prototype.updateLeadSource = updateLeadSource;

// ============================ PHASES ============================ //
API.prototype.getPhases = getPhases;
API.prototype.getPhase = getPhase;
API.prototype.createPhase = createPhase;
API.prototype.updatePhase = updatePhase;

// =========================== STORIES ============================ //
API.prototype.getStories = getStories;
API.prototype.getStory = getStory;
API.prototype.createStory = createStory;
API.prototype.updateStory = updateStory;

// =================== EXISTING SYSTEM OPTIONS ==================== //
API.prototype.getExistingSystemOptions = getExistingSystemOptions;
API.prototype.getExistingSystemOption = getExistingSystemOption;
API.prototype.createExistingSystemOption = createExistingSystemOption;
API.prototype.updateExistingSystemOption = updateExistingSystemOption;

// ========================= ROOF TYPES =========================== //
API.prototype.getRoofTypes = getRoofTypes;
API.prototype.getRoofType = getRoofType;
API.prototype.addRoofType = addRoofType;
API.prototype.updateRoofType = updateRoofType;

// ========================= ROOF PITCH =========================== //
API.prototype.getRoofPitches = getRoofPitches;
API.prototype.getRoofPitch = getRoofPitch;
API.prototype.addRoofPitch = addRoofPitch;
API.prototype.updateRoofPitch = updateRoofPitch;

// ======================== STOCK TYPES =========================== //
API.prototype.getStockTypes = getStockTypes;
API.prototype.getStockType = getStockType;
API.prototype.addStockType = addStockType;
API.prototype.updateStockType = updateStockType;

export const bpmAPI = new API();
