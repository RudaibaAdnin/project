import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import "../index.css";
import {
  updateQuiz,
  setQuiz,
  setQuizzes
} from "../quizzesReducer";
import { updateQuestion, setQuestion, setQuestions, deleteQuestion } from "./Questions/questionsReducer";
import { LabState} from "../../../store";
import * as client from "../client";
import * as clientQuestion from "./Questions/client"


function QuizDetail() {
    
    const quiz = useSelector((state: LabState) => state.quizzesReducer.quiz);
    //const question = useSelector((state: LabState) => state.questionsReducer.question);
    //const questions = useSelector((state: LabState) => state.questionsReducer.questions);
     const { courseId, quizId } = useParams();
    const navigate = useNavigate();
   // const dispatch = useDispatch();

  return (
    <div>
      <br/> <br/>
      <div className="col-md-10">
        <label>Quiz Name</label>
        <input name="name"
               value={quiz.name} 
               className="form-control m-2"
               readOnly/>

        <label>Quiz Description</label>
        <textarea name="description"
                  value={quiz.description} 
                  className="form-control m-2"
                  readOnly/>

        <br/>
        <br/>

        {/* Quiz Type */}
        <label>Quiz Type</label>
        <input name="type"
                value={quiz.type} 
                className="form-control m-2"
                readOnly/>
     

        {/* Assignment Group */}
        <label>Assignment Group</label>
        <input  name="assignmentGroup"
                value={quiz.assignmentGroup} 
                className="form-control m-2"
                readOnly/>
        

        {/* Shuffle Answers */}
        <label>Shuffle Answers</label>
        <input name="shuffleAnswers"
                value={quiz.shuffleAnswers} 
                className="form-control m-2"
                readOnly/>
        

        {/* Time Limit */}
        <label>Time Limit</label>
        <input name="timeLimit"
               type="number"
               value={quiz.timeLimit} 
               className="form-control m-2"
               readOnly/>

        {/* Multiple Attempts */}
        <label>Multiple Attempts</label>
        <input name="multipleAttempts"
                value={quiz.multipleAttempts} 
                className="form-control m-2"
                readOnly/>
        

        {/* Show Correct Answers */}
        <label>Show Correct Answers</label>
        <input name="showCorrectAnswers"
                value={quiz.showCorrectAnswers} 
                className="form-control m-2"
                readOnly/>
     

        {/* Access Code */}
        <label>Access Code</label>
        <input name="accessCode"
               value={quiz.accessCode} 
               className="form-control m-2"
               readOnly/>

        {/* One Question at a Time */}
        <label>One Question at a Time</label>
        <input name="oneQuestionAtATime"
                value={quiz.oneQuestionAtATime} 
                className="form-control m-2"
                readOnly>
        </input>

        {/* Webcam Required */}
        <label>Webcam Required</label>
        <input name="webcamRequired"
                value={quiz.webcamRequired} 
                className="form-control m-2"
                readOnly/>
       

        {/* Lock Questions After Answering */}
        <label>Lock Questions After Answering</label>
        <input name="lockQuestionsAfterAnswering"
                value={quiz.lockQuestionsAfterAnswering} 
                className="form-control m-2"
                readOnly>
        </input>

        <br/>
        <br/>

        <div className="card bg-light">
          <div className="card-header">
            Assign
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label offset-sm-2">Due</label>
          </div>
          <div className="row mb-3">
            <div className="col-sm-8 offset-sm-2">
              <input value={quiz.dueDate} className="form-control" type="date" readOnly/>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label offset-sm-2">Available From</label>
            <label className="col-sm-4 col-form-label">Until</label>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 offset-sm-2">
              <input value={quiz.availableDate} className="form-control" type="date" readOnly/>
            </div>
            <div className="col-sm-4">
              <input value={quiz.untilDate} className="form-control" type="date" readOnly/>
            </div>
          </div>
        </div>

        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
            className="btn btn-primary m-2 float-end">
            Back
        </Link>

      </div>
   
</div>
  );
}
export default QuizDetail;