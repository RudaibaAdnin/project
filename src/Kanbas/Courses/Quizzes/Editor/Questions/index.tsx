import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestion, setQuestion, setQuestions } from "./questionsReducer";
import { LabState } from "../../../../store";
import * as client from "./client";

function QuestionEditor() {
  const question = useSelector((state: LabState) => state.questionsReducer.question);
  const { courseId, quizId, questionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize blanks with question.options or an empty array if undefined
  const [blanks, setBlanks] = useState(question.options?.split(',').map((answer, index) => ({ id: index, answer })) || []);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);



  const handleUpdateQuestion = async () => {
      const updatedOptions = blanks.map(blank => blank.answer).join(',');
      const updatedQuestion = { ...question, options: updatedOptions, correctAnswer: correctAnswer };
      await client.updateQuestion(updatedQuestion);
      dispatch(updateQuestion(updatedQuestion));
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };


  const handleSaveQuestion = async () => {
    if (questionId === "add") {
      // Create a new quiz
      const updatedOptions = blanks.map(blank => blank.answer).join(',');
      const updatedQuestion = { ...question, options: updatedOptions, correctAnswer: correctAnswer };
      const newQuiz = await client.createQuestion(courseId, quizId, updatedQuestion);
      dispatch(setQuestion(newQuiz)); // Assuming you have an action to set a single quiz
    } else {
      // Update existing quiz
      const updatedOptions = blanks.map(blank => blank.answer).join(',');
      const updatedQuestion = { ...question, options: updatedOptions, correctAnswer: correctAnswer };
      await client.updateQuestion(updatedQuestion);
      dispatch(updateQuestion(question));
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  
  const addBlank = () => {
    setBlanks([...blanks, { id: Date.now(), answer: '' }]);
  };

  const removeBlank = (id) => {
    setBlanks(blanks.filter(blank => blank.id !== id));
  };

  const handleAnswerChange = (id, newAnswer) => {
    const updatedBlanks = blanks.map(blank => 
      blank.id === id ? { ...blank, answer: newAnswer } : blank
    );
    setBlanks(updatedBlanks);
  };

  const handleCorrectAnswerChange = (answer) => {
    setCorrectAnswer(answer);
    // Optionally update the Redux store if needed
    dispatch(setQuestion({ ...question, correctAnswer: answer }));
  };


  const renderQuestionTypeInputs = (question) => {
    if (question.type === "MULTIPLECHOICE") {
              return (
                    <div>
                        Add choices for multiple choice question here
                        <button className="btn btn-success justify-content-end m-2" onClick={addBlank}>Add Choice</button> <br/><br/>
                        {blanks.map((blank, index) => (
                            <div key={blank.id} className="row mb-2"> {/* Use the 'row' class to create a horizontal group */}
                                <div className="col-md-1 d-flex align-items-center"> {/* Adjust 'col-md-1' as needed for the radio button size */}
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        className="form-check-input"
                                        checked={correctAnswer === blank.answer}
                                        onChange={() => handleCorrectAnswerChange(blank.answer)}
                                    />
                                </div>
                                <div className="col-md-4"> {/* This column will expand to fill the available space */}
                                    <textarea
                                        value={blank.answer}
                                        className="form-control"
                                        onChange={(e) => handleAnswerChange(blank.id, e.target.value)}
                                        placeholder={`Choice ${index + 1}`}
                                    />
                                </div>
                                <div className="col-md-2 d-flex align-items-center justify-content-end"> {/* Column for the remove button */}
                                    <button className="btn btn-warning" onClick={() => removeBlank(blank.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

              );
            } else if (question.type === "TRUEFALSE") {
                return (
                
                <div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="trueFalseOption"
                        id="trueOption"
                        value="True"
                        checked={correctAnswer === "True"}
                        onChange={() => handleCorrectAnswerChange("True")}
                    />
                    <label className="form-check-label" htmlFor="trueOption">
                        True
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="trueFalseOption"
                        id="falseOption"
                        value="False"
                        checked={correctAnswer === "False"}
                        onChange={() => handleCorrectAnswerChange("False")}
                    />
                    <label className="form-check-label" htmlFor="falseOption">
                        False
                    </label>
                </div>
            </div>);
             } else if (question.type === "BLANKS") {
                return (
                    <div>
                        Add answers for fill in the blanks here
                        <button className="btn btn-success m-2" type="button" onClick={addBlank}>Add Blank</button> 
                        {blanks.map((blank, index) => (
                            <div key={blank.id} className="row mb-2">
                                <div className="col-auto d-flex align-items-center">
                                    <label className="m-2">Answer {index + 1}</label>
                                </div>
                                <div className="col-md-5">
                                    <input
                                        type="text"
                                        className="form-control m-2"
                                        value={blank.answer}
                                        onChange={(e) => handleAnswerChange(blank.id, e.target.value)}
                                        placeholder="Answer"
                                    />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-warning m-2" type="button" onClick={() => removeBlank(blank.id)}>Remove</button>
                                </div>
                            </div>
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
            <label>Question Name</label>
            <input
                name="name"
                value={question.name}
                className="form-control m-2"
                onChange={(e) => dispatch(setQuestion({ ...question, name: e.target.value }))}
            />
            <label>Question Text</label>
            <textarea
                name="description"
                value={question.description}
                className="form-control m-2"
                onChange={(e) => dispatch(setQuestion({ ...question, description: e.target.value }))}
            />
            <label>Points Value</label> {/* Add this label */}
            <input
                type="number" 
                name="points"
                value={question.points || ''}
                className="form-control m-2"
                onChange={(e) => dispatch(setQuestion({ ...question, points: parseInt(e.target.value) || 0 }))}
                min="0" 
            />
            <label>Question Types</label>
            <select
                name="type"
                value={question.type}
                className="form-select m-2"
                onChange={(e) => dispatch(setQuestion({ ...question, type: e.target.value }))}
            >
                <option value="MULTIPLECHOICE">Multiple Choice</option>
                <option value="TRUEFALSE">True False</option>
                <option value="BLANKS">Fill in the Blanks</option>
            </select>


            <br/>
               {renderQuestionTypeInputs(question)} 

            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={handleSaveQuestion} className="btn btn-danger m-2 float-end">
                Save
            </button>
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`} className="btn btn-primary m-2 float-end">
                Cancel
            </Link>
        </div>
    );
}

export default QuestionEditor;
