import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
//const COURSES_API = "http://localhost:4000/api/courses";
//https://kanbas-node-server-app-5635.onrender.com
const API_BASE = "https://project-backend-wpnp.onrender.com";
//const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const AUTHORS_API = `${API_BASE}/api/author`;

export const updateCourse = async (course) => {
    const response = await request.put(`${COURSES_API}/${course._id}`, course );
    return response.data;
};

export const deleteCourse = async (courseId) => {
    const response = await request.delete(`${COURSES_API}/${courseId}` );
    return response.data; };  

export const addCourse = async (course) => {
    const response = await request.post(COURSES_API, course);
    return response.data;
};  
export const findAllCourses = async () => {
    const response = await request.get(COURSES_API);
    return response.data;
};

export const findCoursesByAuthor = async (authorId) => {
    const response = await request.get(`${AUTHORS_API}/${authorId}/courses`);
    return response.data;
  };
  


