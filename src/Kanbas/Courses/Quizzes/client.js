import axios from "axios";
//const COURSES_API = "http://localhost:4000/api/courses";
//const Quizzes_API = "http://localhost:4000/api/quizzes";

//https://kanbas-node-server-app-5635.onrender.com/

// const API_BASE = "https://project-backend-wpnp.onrender.com";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;


export const updateQuiz = async (quiz) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};


export const deleteQuiz = async (quizId) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId, quiz) => {
  const response = await axios.post( `${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const findQuizzesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
