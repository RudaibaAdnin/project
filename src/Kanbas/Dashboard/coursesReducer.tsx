import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  courses: [{ name: "New Course Name", description: "", author: "", number: "New Course Number",
  startDate: "2023-09-10", endDate: "2023-12-15", _id: new Date().getTime().toString() }],
  course: { name: "New Course Name", description: "", author: "", number: "New Course Number",
  startDate: "2023-09-10", endDate: "2023-12-15", _id: new Date().getTime().toString() },
};


const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, action) => {
      state.courses = [...state.courses, { ...action.payload, _id: new Date().getTime().toString() }];
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((course) => {
        if (course._id === action.payload._id) {
          return action.payload;
        } else {
          return course;
        }
      });
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});


export const { setCourse, setCourses, addCourse, deleteCourse,
  updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;