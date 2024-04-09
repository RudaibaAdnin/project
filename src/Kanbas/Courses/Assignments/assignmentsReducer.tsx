import { createSlice } from "@reduxjs/toolkit";
//import db from "../../Database";


const initialState = {
  assignments: [{ _id: "0", name: "New Assignment 123", description: "New Description", course: "random",
  dueDate: "2023-09-10",  availableDate: "2023-09-10",  untilDate: "2023-09-10"}],
  assignment: { _id: "0", name: "New Assignment 123", description: "New Description", course: "random",
   dueDate: "2023-09-10",  availableDate: "2023-09-10",  untilDate: "2023-09-10"},
};


const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {

    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, action) => {
      state.assignments = [
        { ...action.payload, _id: new Date().getTime().toString() },
          ...state.assignments,
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      const index = state.assignments.findIndex(assignment => assignment._id === action.payload._id);
      if (index !== -1) {
        // Update existing assignment
        state.assignments[index] = action.payload;
      } else {
        // Add new assignment
        const newAssignment = {...action.payload, _id: new Date().getTime().toString()
        };
        state.assignments.push(newAssignment); // Add to the start of the array
      }
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});


export const {setAssignment, setAssignments, addAssignment, deleteAssignment, updateAssignment} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;