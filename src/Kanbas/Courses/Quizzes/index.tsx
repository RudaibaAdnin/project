import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import {
  setQuizzes,
  setQuiz,
  addQuiz,
  deleteQuiz,
  updateQuiz,
} from "./quizzesReducer";
import "./index.css";
import {LabState} from "../../store";
import * as client from "./client";

function Quizzes() {
  const { courseId } = useParams();
  const quizzes = useSelector((state: LabState) => state.quizzesReducer.quizzes);
  const quiz = useSelector((state: LabState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId)); });
  };

  useEffect(() => {
    client.findQuizzesForCourse(courseId).then((quizzes) =>
        dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);
  
  const togglePublish = (quizId: string) => {
    // Find the quiz by ID
    const quizToToggle = quizzes.find(quiz => quiz._id === quizId);
    if (!quizToToggle) return; // If the quiz wasn't found, exit the function
  
    // Determine the new publish state
    const newPublishState = quizToToggle.publish === "yes" ? "no" : "yes";
    dispatch(updateQuiz({ ...quizToToggle, publish: newPublishState }));
    // Update the quiz on the backend
    client.updateQuiz({ ...quizToToggle, publish: newPublishState })
      .then((updatedQuiz) => {
        // Once the quiz is successfully updated on the backend, update the state
        //dispatch(updateQuiz(updatedQuiz)); // Assuming you have an 'updateQuiz' action that updates the quiz in your Redux store
      })
      .catch(error => {
        console.error("Failed to toggle publish state", error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <>
    <div className="row mt-5 m-3">
      <h2>Quizzes</h2>
        <div className="col-6">
            <input type="text" className="form-control w-20 p-2" placeholder="Search for Quizzes" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      <div className="col float-end">
        <span className="float-end">
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/add`} 
                onClick={() => dispatch(setQuiz({...quiz, _id: new Date().getTime().toString(), 
                name: "New Quiz 123", description: "New Description",  course: courseId, 
                dueDate: "2023-09-10",  availableDate: "2023-09-10",  untilDate: "2023-09-10", publish : "No"}))}>
                <button type="button" 
                className="btn btn-danger me-1">
                    <FaPlus />Quiz
                </button>
            </Link>
            <button type="button" className="btn btn-light border border-dark me-3 p-2"><FaEllipsisV/></button>
        </span>
      </div>
        <br />
        <br />
        <br />
        <br />


    <ul className="list-group">
      <li className="list-group-item wd-li">
      <div className="wd-li-div">
            <FaEllipsisV />Quizzes
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaEllipsisV className="ms-2" />
            </span>
      </div>
      <ul className="list-group wd-green">
          { quizzes.filter((quiz) => quiz.course === courseId && quiz.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((quiz) => (
              <li key={quiz._id} className="list-group-item wd-li-ul-li">
                <div>
                  <FaEllipsisV className="me-2" />
                  <Link className="wd-item"
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`} 
                    onClick={() => dispatch(setQuiz(quiz))}>
                    {quiz.name}
                  </Link>
                  <br />
                  <small className="text-muted p-2">{quiz.description}</small>
                  <span className="float-end">
                  <button className={`btn ${quiz.publish === "yes" ? "btn-secondary" : "btn-primary"} m-2`}
                      onClick={() => togglePublish(quiz._id)}
                    >
                      {quiz.publish === "yes" ? "Unpublish" : "Publish"}
                   </button>

                   <Link
                     to={`/Kanbas/Courses/${courseId}/Quizzes/Details/${quiz._id}`} 
                      onClick={() => dispatch(setQuiz(quiz))}>
                      <button className="btn btn-info m-2">Details</button>
                    </Link>
                    <Link
                     to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`} 
                      onClick={() => dispatch(setQuiz(quiz))}>
                      <button className="btn btn-warning m-2">Edit</button>
                    </Link>
                    <button className="btn btn-danger m-2" onClick={() => handleDelete(quiz._id)}>
                      Delete
                    </button>
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </div>
              </li>
            ))}
        </ul>
        </li>
        </ul>
      </div>
    </>
  );
}

export default Quizzes;
