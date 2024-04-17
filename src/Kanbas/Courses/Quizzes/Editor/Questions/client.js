import axios from "axios";

// const API_BASE = "https://project-backend-wpnp.onrender.com";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;


export const updateQuestion = async (question) => {
  const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
  return response.data;
};


export const deleteQuestion = async (questionId) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const createQuestion = async (courseId, quizId, question) => {
  const response = await axios.post( `${COURSES_API}/${courseId}/quizzes/${quizId}/questions`, question);
  return response.data;
};

export const findQuestionsForQuiz = async (courseId, quizId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
  return response.data;
};



export const findQuestionFromQuestions = async (courseId, quizId, quid) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${quid}`);
  return response.data;
};
