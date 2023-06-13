import axios from 'axios';
// const baseURL = "http://localhost:8080/";
import { toast } from 'sonner';
// const baseURL = "https://hermant-backend.vercel.app/";
// const baseURL = "https://hermant-backend-git-feature-users-jphernandez107.vercel.app";
const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set auth token on headers if present in local storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
    config.headers['user-id'] = localStorage.getItem('user').id;
  }
  config.withCredentials = true
  return config;
});

// Handle 401 unauthorized errors globally
api.interceptors.response.use(
  (response) => {
    const message = response.data.message;
    if (message)
      toast.success(message)
    return response;
  },
  (error) => {
    const response = error.response;
    const message = response.data.message;
    if (message) toast.error(message);
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location = '/signin';
    } else if (response && response.status === 403) {
      window.location = '/forbidden';
    }
    return Promise.reject(error);
  }
);

const endpoints = {
  getEquipmentList: '/equipment/list',
  getEquipmentByCode: '/equipment/details',
  addEquipmentUseHours: '/equipment/hours',
  addLubricationSheetToEquipment: '/equipment/lubricationsheet/add',
  addEquipmentToSite: '/equipment/site/add',
  removeEquipmentFromSite: '/equipment/site/remove',
  getConstructionSiteList: '/site/list',
  getConstructionSiteByCode: '/site/details',
  getSparePartList: '/part/list',
  getLubricationSheetList: '/lubricationsheet/list',
  getLubricationSheetByEquipmentCode: '/lubricationsheet/equipment',
  postSignIn: '/user/signin',
  getUserList: '/user/list',
};

async function fetchGet(endpoint, params = {}) {
  const response = await api.get(endpoint, { params });
  return response.data;
}

async function fetchPost(endpoint, body) {
  const response = await api.post(endpoint, body);
  return response.data;
}

async function fetchPut(endpoint, body) {
  const response = await api.put(endpoint, body);
  return response.data;
}

const Api = {
  async getEquipmentList() {
    return fetchGet(endpoints.getEquipmentList);
  },
  async getEquipmentByCode(code) {
    return fetchGet(endpoints.getEquipmentByCode, { code });
  },
  async putAddEquipmentToSite(equipment_code, site_code) {
    return fetchPut(endpoints.addEquipmentToSite, {
      equipment_code,
      site_code
    });
  },
  async putRemoveEquipmentFromSite(equipment_code, site_code) {
    return fetchPut(endpoints.removeEquipmentFromSite, {
      equipment_code,
      site_code
    });
  },
  async getConstructionSiteList() {
    return fetchGet(endpoints.getConstructionSiteList);
  },
  async getConstructionSiteByCode(code) {
    return fetchGet(endpoints.getConstructionSiteByCode, { code });
  },
  async getSparePartList() {
    return fetchGet(endpoints.getSparePartList);
  },
  async getLubricationSheetList() {
    return fetchGet(endpoints.getLubricationSheetList);
  },
  async postNew(url, body) {
    return fetchPost(url, body);
  },
  async putEdit(url, body) {
    return fetchPut(url, body);
  },
  async getLubricationSheetByEquipmentCode(code) {
    return fetchGet(endpoints.getLubricationSheetByEquipmentCode, {
      equipment_code: code,
    });
  },
  async addEquipmentUseHours(body, code) {
    return fetchPost(`${endpoints.addEquipmentUseHours}?code=${code}`, body);
  },
  async addLubricationSheetToEquipment(body) {
    return fetchPut(endpoints.addLubricationSheetToEquipment, body);
  },
  async postSignIn(body) {
    return fetchPost(endpoints.postSignIn, body);
  },
  async getUserList() {
    return fetchGet(endpoints.getUserList);
  },
};

export default Api;
