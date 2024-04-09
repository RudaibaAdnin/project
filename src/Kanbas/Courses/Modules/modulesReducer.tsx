import { createSlice } from "@reduxjs/toolkit";
//import db from "../../Database";


const initialState = {
  modules: [{_id: new Date().getTime().toString(), name: "New Module 123", description: "New Description", course: "random"}],
  module: { _id: new Date().getTime().toString(), name: "New Module 123", description: "New Description", course: "random"},
};


const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state,  action) => {
      state.modules = [...state.modules, { ...action.payload, _id: new Date().getTime().toString() }];
    },
    // addModule: (state, action) => {
    //   state.modules = [
    //     { ...action.payload, _id: new Date().getTime().toString() },
    //       ...state.modules,
    //   ];
    // },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter((module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});

export const { setModules, setModule, addModule, deleteModule, updateModule} = modulesSlice.actions;
export default modulesSlice.reducer;