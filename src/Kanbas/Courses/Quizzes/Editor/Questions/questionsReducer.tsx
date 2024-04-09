import { createSlice } from "@reduxjs/toolkit";
//import db from "../../Database";


const initialState = {
  questions: [{ _id: "0", name: "New Question 123", description: "Question description",  points: "0", course: "random", type: "MULTIPLECHOICE"}],
  question: { _id: "0", name: "New Question 123", description: "Question description",  points: "0", course: "random", type: "MULTIPLECHOICE"},
};


const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {

    setQuestions: (state, action) => {
      state.questions= action.payload;
    },

    addQuestion: (state, action) => {
      state.questions = [
        { ...action.payload, _id: new Date().getTime().toString() },
          ...state.questions,
      ];
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      const index = state.questions.findIndex(question => question._id === action.payload._id);
      if (index !== -1) {
        // Update existing question
        state.questions[index] = action.payload;
      } else {
        // Add new question
        const newQuestion = {...action.payload, _id: new Date().getTime().toString()
        };
        state.questions.push(newQuestion); // Add to the start of the array
      }
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});


export const {setQuestion, setQuestions, addQuestion, deleteQuestion, updateQuestion} = questionsSlice.actions;
export default questionsSlice.reducer;