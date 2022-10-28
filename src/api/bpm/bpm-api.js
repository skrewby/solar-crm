import { getCurrentUser, login, logout, refresh } from './auth';
import { changeUserPassword, getUser, getUsers, updateUser, addUser, setUserRoles, createUserPassword } from './users/user';
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
import { getStock, getStockItem, addStockItem, updateStockItem } from './stock';
import { bpmServer } from './bpm-server';
import { addFile, deleteFile, deleteFilepondFile, downloadFile, downloadMultipleFiles, getFile } from './files';
import { addCustomer, addCustomerLog, getCustomer, getCustomerLogs, getCustomers, updateCustomer } from './customers';
import { addState, getState, getStates, updateState } from './options/state';
import { addService, getService, getServices, updateService } from './services';

class API {
  abort() {
    bpmServer.api('Abort');
  }
}

// ============================= AUTH ============================= //
API.prototype.login = login;
API.prototype.logout = logout;
API.prototype.getCurrentUser = getCurrentUser;
API.prototype.refresh = refresh;

// ============================= USERS ============================ //
API.prototype.getUsers = getUsers;
API.prototype.updateUser = updateUser;
API.prototype.getUser = getUser;
API.prototype.addUser = addUser;
API.prototype.changeUserPassword = changeUserPassword;
API.prototype.setUserRoles = setUserRoles;
API.prototype.createUserPassword = createUserPassword;

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

// =========================== STOCK ============================== //
API.prototype.getStock = getStock;
API.prototype.getStockItem = getStockItem;
API.prototype.addStockItem = addStockItem;
API.prototype.updateStockItem = updateStockItem;

// ========================== STATES ============================== //
API.prototype.getState = getState;
API.prototype.getStates = getStates;
API.prototype.addState = addState;
API.prototype.updateState = updateState;

// ============================ FILES ============================= //
API.prototype.getFile = getFile;
API.prototype.addFile = addFile;
API.prototype.deleteFile = deleteFile;
API.prototype.deleteFilepondFile = deleteFilepondFile;
API.prototype.downloadFile = downloadFile;
API.prototype.downloadMultipleFiles = downloadMultipleFiles;

// ========================== CUSTOMERS =========================== //
API.prototype.getCustomer = getCustomer;
API.prototype.getCustomers = getCustomers;
API.prototype.addCustomer = addCustomer;
API.prototype.updateCustomer = updateCustomer;
API.prototype.getCustomerLogs = getCustomerLogs;
API.prototype.addCustomerLog = addCustomerLog;

// ========================== SERVICES ============================ //
API.prototype.getService = getService;
API.prototype.getServices = getServices;
API.prototype.addService = addService;
API.prototype.updateService = updateService;

export const bpmAPI = new API();
