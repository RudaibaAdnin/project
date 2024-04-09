import React from "react";
import { deleteTodo} from "./todosReducer";
import { LabState,TodoType } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

function TodoItem() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <>
    {todos.map((todo: TodoType) => (
     <li key={todo.id} className="list-group-item">
      <button onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}> Edit </button>
      {todo.title}
    </li>
    ))}
    </>
  );
}
export default TodoItem;