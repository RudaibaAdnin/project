import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../a4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../a4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../a4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../a4/ReduxExamples/todos/todosReducer";
import testReducer from "../a4/ReduxExamples/Test/testReducer";

export type TodoType = {
  id: string;
  title: string;
};

export interface LabState {
  helloReducer: { 
    message: string; 
  };
  counterReducer: { 
    count: number; 
  };
  addReducer: {
    sum: number;
  };
  todosReducer: {
    todos: TodoType[];
    todo: TodoType;
  };

  testReducer: {
    element: number,
    text: string,
    array: [],
  };

}
const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
    testReducer,
  },
});
export default store;