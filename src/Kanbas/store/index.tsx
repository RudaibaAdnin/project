import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import coursesReducer from "../Dashboard/coursesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
import questionsReducer from "../Courses/Quizzes/Editor/Questions/questionsReducer";
//import db from "../Database";


export type assignmentType = {
  _id: string;
  name: string;
  description: string;
  course: string
  dueDate: string;
  availableDate: string;
  untilDate: string;
};

export type quizType = {
  _id: string;
  name: string;
  description: string;
  course: string;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  type: string; // 'Graded Quiz' | 'Practice Quiz' | 'Graded Survey' | 'Ungraded Survey'
  assignmentGroup: string; // 'Quizzes' | 'Exams' | 'Assignments' | 'Project'
  shuffleAnswers: string; // 'Yes' | 'No'
  timeLimit: number; // Time limit in minutes
  multipleAttempts: string; // 'Yes' | 'No'
  showCorrectAnswers: string; // 'Yes' | 'No'
  accessCode: string; // Access code for the quiz, if any
  oneQuestionAtATime: string; // 'Yes' | 'No'
  webcamRequired: string; // 'Yes' | 'No'
  lockQuestionsAfterAnswering: string; // 'Yes' | 'No'
  publish: string;
};


export type questionType = {
  _id: string;
  course: string;
  quiz: string;
  name: string;
  type: string;
  description: string;
  options: string;
  correctAnswer: string;
  points: string;

};

export type moduleType = {
    _id: string;
    name: string;
    description: string;
    course: string
  };


  export type courseType = {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    description: string, 
    author: string
  };

export interface LabState {

  questionsReducer: {
    questions: questionType[],
    question: questionType,
  },
  
  quizzesReducer: {
    quizzes: quizType[],
    quiz: quizType,
  },

    assignmentsReducer: {
    assignments: assignmentType[],
    assignment: assignmentType,
  },

modulesReducer: {
        modules: moduleType[],
        module: moduleType,
    },
    coursesReducer: {
        courses: courseType[],
        course: courseType,
    }
  
  }
  
const store = configureStore({
  reducer: {
    questionsReducer,
    quizzesReducer,
    assignmentsReducer,
    modulesReducer,
    coursesReducer,
  }
});


export default store;