import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { LabState } from "../../../store";
import "../index.css";
import { setQuestions } from "./Questions/questionsReducer";
import * as clientQuestion from "./Questions/client";

function Preview() {
    const quiz = useSelector((state: LabState) => state.quizzesReducer.quiz);
    const questions = useSelector((state: LabState) => state.questionsReducer.questions);
    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();
    const handleAnswerChange = (id, newAnswer) => {
    };

    // Fetch questions for the current quiz on component mount
    useEffect(() => {

        clientQuestion.findQuestionsForQuiz(courseId, quizId).then((questions) => {
            dispatch(setQuestions(questions));
        });
    }, [dispatch, courseId, quizId]);

    // Function to render question inputs based on their type
    
        const renderQuestionTypeInputs = (question) => {
            if (question.type === "MULTIPLECHOICE") {
                return (
                    <div>
                        {question.options?.split(',').map((option, index) => (
                            <div key={index} className="form-check">
                                <input
                                    type="radio"
                                    name={`question-${question._id}`}
                                    className="form-check-input"
                                    id={`option-${index}`}
                                    value={option}
                                />
                                <label className="form-check-label" htmlFor={`option-${index}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            } else if (question.type === "TRUEFALSE") {
                return (
                    <div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name={`question-${question._id}`}
                                id="trueOption"
                                value="True"
                            />
                            <label className="form-check-label" htmlFor="trueOption">True</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name={`question-${question._id}`}
                                id="falseOption"
                                value="False"
                            />
                            <label className="form-check-label" htmlFor="falseOption">False</label>
                        </div>
                    </div>
                );
            } else if (question.type === "BLANKS") {
                return (
                    <div className="col-md-5">
                        {question.options?.split(',').map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control mt-2"
                                placeholder={`Answer ${index + 1}`}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                );
            } else {
                return null;
            }
        };
        


    return (
      
        <div className="col-md-10">
              <br /> <br />
            <h4>Preview: {quiz.name}</h4>
            {/* <p>{quiz.description}</p> */}
            <br /> <br />
            <ul className="list-group">
                {questions.map((question) => (
                    <li key={question._id} className="list-group-item">
                        <p className="text-muted">{question.name}</p>
                        <h5>{question.description}</h5>
                        {renderQuestionTypeInputs(question)}
                    </li>
                ))}
            </ul>

            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`} className="btn btn-primary mt-3 float-end">
                Back to Quiz
            </Link>
            <br />
            <br />

            
        </div>
    );
}

export default Preview;
