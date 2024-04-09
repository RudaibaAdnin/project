import axios from "axios";
// const COURSES_API = "http://localhost:4000/api/courses";
// const MODULES_API = "http://localhost:4000/api/modules";

const request = axios.create({
  withCredentials: true,
});

const API_BASE = "https://kanbas-node-server-app-projectagain.onrender.com";
//const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;

export const updateModule = async (module) => {
  const response = await request.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};

export const deleteModule = async (moduleId) => {
  const response = await request.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const createModule = async (courseId, module) => {
  const response = await request.post( `${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};

export const findModulesForCourse = async (courseId) => {
  const response = await request.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
