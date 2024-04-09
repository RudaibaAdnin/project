import { createSlice } from "@reduxjs/toolkit";
//import db from "../../Database";


const initialState = {
  quizzes: [{
    _id: "0",
    name: "New Quizz 123",
    description: "New Description",
    course: "random",
    dueDate: "2023-09-10",
    availableDate: "2023-09-10",
    untilDate: "2023-09-10",
    type: "Graded Quiz", // Assuming default type
    assignmentGroup: "Quizzes", // Assuming default group
    shuffleAnswers: "Yes", // Assuming default to 'Yes'
    timeLimit: 20, // Assuming default of 20 minutes
    multipleAttempts: "No", // Assuming default to 'No'
    showCorrectAnswers: "No", // Assuming default to 'No'
    accessCode: "", // Assuming no access code by default
    oneQuestionAtATime: "Yes", // Assuming default to 'Yes'
    webcamRequired: "No", // Assuming no webcam required by default
    lockQuestionsAfterAnswering: "No", // Assuming default to 'No'
    publish: "No",
    points: 0
  }],
  
  quiz: {
    _id: "0",
    name: "New Quizz 123",
    description: "New Description",
    course: "random",
    dueDate: "2023-09-10",
    availableDate: "2023-09-10",
    untilDate: "2023-09-10",
    type: "Graded Quiz", // Assuming default type
    assignmentGroup: "Quizzes", // Assuming default group
    shuffleAnswers: "Yes", // Assuming default to 'Yes'
    timeLimit: 20, // Assuming default of 20 minutes
    multipleAttempts: "No", // Assuming default to 'No'
    showCorrectAnswers: "No", // Assuming default to 'No'
    accessCode: "", // Assuming no access code by default
    oneQuestionAtATime: "Yes", // Assuming default to 'Yes'
    webcamRequired: "No", // Assuming no webcam required by default
    lockQuestionsAfterAnswering: "No", // Assuming default to 'No'
    publish: "No",
    points: 0
  },
  
};


const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {

    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, action) => {
      state.quizzes = [
        { ...action.payload, _id: new Date().getTime().toString() },
          ...state.quizzes,
      ];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
      if (index !== -1) {
        // Update existing quiz
        state.quizzes[index] = action.payload;
      } else {
        // Add new quiz
        const newQuiz = {...action.payload, _id: new Date().getTime().toString()
        };
        state.quizzes.push(newQuiz); // Add to the start of the array
      }
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});


export const {setQuiz, setQuizzes, addQuiz, deleteQuiz, updateQuiz} = quizzesSlice.actions;
export default quizzesSlice.reducer;