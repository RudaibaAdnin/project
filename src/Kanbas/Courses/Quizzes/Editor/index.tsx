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
import { parse } from "path";


function QuizEditor() {
    
    const quiz = useSelector((state: LabState) => state.quizzesReducer.quiz);
    const question = useSelector((state: LabState) => state.questionsReducer.question);
    const questions = useSelector((state: LabState) => state.questionsReducer.questions);
    const { courseId } = useParams();
    const { quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

   
    const handleUpdateQuiz= async () => {
      const status = await client.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };

    const handleSaveQuiz = async () => {
      const calculateTotalPoints = () => {
        let totalPoints = 0;
        questions.forEach((question) => {
          totalPoints += Number(question.points);
        });
        console.log(totalPoints);
        return totalPoints;
      };
      let totalPoints = calculateTotalPoints();
      console.log("Total Points:", totalPoints);
      if (quizId === "add") {
        // Create a new quiz
        const tempQuiz = { ...quiz, points: totalPoints };
        console.log("Points while adding:", tempQuiz.points);
        const newQuiz = await client.createQuiz(courseId, tempQuiz);
        dispatch(setQuiz(newQuiz)); // Assuming you have an action to set a single quiz
      } else {
        // Update existing quiz
        
        const tempQuiz = { ...quiz, points: totalPoints };
        console.log("Points while updating:", tempQuiz.points);
        await client.updateQuiz(tempQuiz);
        dispatch(updateQuiz(tempQuiz));
      }
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };

    const handleSave = (e) => {
        dispatch(updateQuiz(quiz))
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };

    const handleDelete = (questionId: string) => {
      clientQuestion.deleteQuestion(questionId);
      dispatch(deleteQuestion(questionId));
    };

    useEffect(() => {
      clientQuestion.findQuestionsForQuiz(courseId, quizId).then((questions) =>
          dispatch(setQuestions(questions))
      );
    }, [courseId, quizId]);

  return (
    <div>

    <br/> <br/>
    <div className="col-md-10">
    <label>Quiz Name</label>
<input name="name"
        value={quiz.name} 
        className="form-control m-2"
        onChange={(e) => dispatch(setQuiz({ ...quiz, name: e.target.value}))}/>

<label>Quiz Description</label>
<textarea name="description"
          value={quiz.description} 
          className="form-control m-2"
          onChange={(e)=>dispatch(setQuiz({ ...quiz, description: e.target.value}))}/>

<br/>
<br/>
<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/add`} 
                onClick={() => dispatch(setQuestion({...question, 
                _id: new Date().getTime().toString(), 
                name: "New Question 123", 
                description: "New Description",  
                course: courseId, 
                quiz: quizId, 
                type: "MULTIPLECHOICE", 
                options: '',
                correctAnswer: ''
                }))}>
                <button type="button" 
                className="btn btn-warning me-1">
                    <FaPlus /> Add Question
                </button>
</Link>

<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`} >
                <button type="button" 
                className="btn btn-success me-1">
                   Preview Quiz
                </button>
</Link>

<br/>
<br/>
<ul className="list-group wd-green">
          { questions.map((question) => (
              <li key={question._id} className="list-group-item wd-li-ul-li">
                <div>
                  <FaEllipsisV className="me-2" />
                  <Link className="wd-item"
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Questions/${question._id}`} 
                    onClick={() => dispatch(setQuestion(question))}>
                    {question.name}
                  </Link>
                  <br />
                  <small className="text-muted p-2">{question.description}</small>
                  <br />
                  <small className="text-muted p-2">Points: {question.points}</small>
                  <span className="float-end">
                    <Link
                     to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Questions/${question._id}`} 
                      onClick={() => dispatch(setQuestion(question))}>
                      <button className="btn btn-warning m-2">Edit</button>
                    </Link>
                    <button className="btn btn-danger m-2" onClick={() => handleDelete(question._id)}>
                      Delete
                    </button>
                    <FaEllipsisV className="ms-2" />
                  </span>
                </div>
              </li>
            ))}
        </ul>

<br/>
<br/>
{/* Quiz Type */}
<label>Quiz Type</label>
<select name="type"
        value={quiz.type} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, type: e.target.value}))}>
    <option value="Graded Quiz">Graded Quiz (default)</option>
    <option value="Practice Quiz">Practice Quiz</option>
    <option value="Graded Survey">Graded Survey</option>
    <option value="Ungraded Survey">Ungraded Survey</option>
</select>

{/* Assignment Group */}
<label>Assignment Group</label>
<select name="assignmentGroup"
        value={quiz.assignmentGroup} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value}))}>
    <option value="Quizzes">Quizzes (default)</option>
    <option value="Exams">Exams</option>
    <option value="Assignments">Assignments</option>
    <option value="Project">Project</option>
</select>

{/* Shuffle Answers */}
<label>Shuffle Answers</label>
<select name="shuffleAnswers"
        value={quiz.shuffleAnswers} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, shuffleAnswers: e.target.value}))}>
    <option value="Yes">Yes (default)</option>
    <option value="No">No</option>
</select>

{/* Time Limit */}
<label>Time Limit</label>
<input name="timeLimit"
       type="number"
       value={quiz.timeLimit} 
       className="form-control m-2"
       onChange={(e)=>dispatch(setQuiz({ ...quiz, timeLimit: e.target.value}))}/>

{/* Multiple Attempts */}
<label>Multiple Attempts</label>
<select name="multipleAttempts"
        value={quiz.multipleAttempts} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, multipleAttempts: e.target.value}))}>
    <option value="No">No (default)</option>
    <option value="Yes">Yes</option>
</select>

{/* Show Correct Answers */}
<label>Show Correct Answers</label>
<select name="showCorrectAnswers"
        value={quiz.showCorrectAnswers} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, showCorrectAnswers: e.target.value}))}>
    <option value="No">No (default)</option>
    <option value="Yes">Yes</option>
</select>

{/* Access Code */}
<label>Access Code</label>
<input name="accessCode"
       value={quiz.accessCode} 
       className="form-control m-2"
       placeholder="Leave blank for no access code"
       onChange={(e)=>dispatch(setQuiz({ ...quiz, accessCode: e.target.value}))}/>

{/* One Question at a Time */}
<label>One Question at a Time</label>
<select name="oneQuestionAtATime"
        value={quiz.oneQuestionAtATime} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, oneQuestionAtATime: e.target.value}))}>
    <option value="Yes">Yes (default)</option>
    <option value="No">No</option>
</select>

{/* Webcam Required */}
<label>Webcam Required</label>
<select name="webcamRequired"
        value={quiz.webcamRequired} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, webcamRequired: e.target.value}))}>
    <option value="No">No (default)</option>
    <option value="Yes">Yes</option>
</select>

{/* Lock Questions After Answering */}
<label>Lock Questions After Answering</label>
<select name="lockQuestionsAfterAnswering"
        value={quiz.lockQuestionsAfterAnswering} 
        className="form-select m-2"
        onChange={(e)=>dispatch(setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.value}))}>
        <option value="No">No (default)</option>
        <option value="Yes">Yes</option>
    </select>

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
           <input value={quiz.dueDate} className="form-control" type="date"
             onChange={(e) =>dispatch(setQuiz({ ...quiz, dueDate: e.target.value}))}/>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label offset-sm-2">Available From</label>
          <label className="col-sm-4 col-form-label">Until</label>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4 offset-sm-2">
          <input value={quiz.availableDate} className="form-control" type="date"
             onChange={(e) =>dispatch(setQuiz({ ...quiz, availableDate: e.target.value}))}/>
          </div>
          <div className="col-sm-4">
          <input value={quiz.untilDate} className="form-control" type="date"
             onChange={(e) =>dispatch(setQuiz({ ...quiz, untilDate: e.target.value}))}/>
          </div>
        </div>
        </div>


        <button onClick={handleSaveQuiz} className="btn btn-danger m-2 float-end">
             Save
        </button>
          <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
            className="btn btn-primary m-2 float-end">
            Cancel
        </Link>

        
      </div>
    </div>
  );
}
export default QuizEditor;