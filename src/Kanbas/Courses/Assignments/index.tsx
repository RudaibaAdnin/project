import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import {
  setAssignments,
  setAssignment,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} from "./assignmentsReducer";
import "./index.css";
import {LabState} from "../../store";
import * as client from "./client";

function Assignments() {
  const { courseId } = useParams();
  const assignments = useSelector((state: LabState) => state.assignmentsReducer.assignments);
  const assignment = useSelector((state: LabState) => state.assignmentsReducer.assignment);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState("");
  const handleClose = () => setShowModal(false);
  const handleShow = (id) => {
    setCurrentAssignmentId(id); // Set the current assignment ID before showing the modal
    setShowModal(true);
  };
  const handleDeleteAssignment = () => {
    console.log(currentAssignmentId);
   // dispatch(deleteAssignment(currentAssignmentId)); // Use the current assignment ID for deletion
    client.deleteAssignment(currentAssignmentId).then((status) => {
      dispatch(deleteAssignment(currentAssignmentId)); });
    setShowModal(false);
  };

  useEffect(() => {
    client.findAssignmentsForCourse(courseId).then((assignments) =>
        dispatch(setAssignments(assignments))
    );
  }, [courseId]);
  


  return (
    <>
    <div className="row mt-5 m-3">
      <h2>Assignments</h2>
        <div className="col-6">
            <input type="text" className="form-control w-20 p-2" placeholder="Search for Assignments" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      <div className="col float-end">
        <span className="float-end">
            {/* <button type="button" className="btn btn-light border border-dark me-1"><FaPlus/>Group</button> */}
            <Link to={`/Kanbas/Courses/${courseId}/Assignments/add`} 
                onClick={() => dispatch(setAssignment({...assignment, _id: new Date().getTime().toString(), 
                name: "New Assignment 123", description: "New Description",  course: courseId, 
                dueDate: "2023-09-10",  availableDate: "2023-09-10",  untilDate: "2023-09-10"}))}>
                <button type="button" 
                className="btn btn-danger me-1">
                    <FaPlus />Assignment
                </button>
            </Link>
            <button type="button" className="btn btn-light border border-dark me-3 p-2"><FaEllipsisV/></button>
        </span>
      </div>


        {/* <Link
            to={`/Kanbas/Courses/${courseId}/Assignments/add`} 
            onClick={() => dispatch(setAssignment({...assignment, _id: new Date().getTime().toString(), name: "New Assignment 123", description: "New Description", course: courseId}))}>
            <button className="btn btn-warning m-2">Add</button>
        </Link> */}
        <br />
        <br />
        <br />
        <br />


    <ul className="list-group">
      <li className="list-group-item wd-li">
      <div className="wd-li-div">
            <FaEllipsisV />ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
      </div>
           <ul className="list-group wd-green">
          {//assignments.filter((assignment) => assignment.course === courseId)
           // .map((assignment) => (

          assignments.filter((assignment) => assignment.course === courseId && assignment.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((assignment) => (
              <li key={assignment._id} className="list-group-item wd-li-ul-li">
                <div>
                  <FaEllipsisV className="me-2" />
                  <Link className="wd-item"
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} 
                    onClick={() => dispatch(setAssignment(assignment))}>
                    {assignment.name}
                  </Link>
                  <br />
                  <small className="text-muted p-2">{assignment.description}</small>
                  <span className="float-end">
                    <Link
                     to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} 
                      onClick={() => dispatch(setAssignment(assignment))}>
                      <button className="btn btn-warning m-2">Edit</button>
                    </Link>
                    <button className="btn btn-danger m-2" onClick={() => handleShow(assignment._id)}>
                      Delete
                    </button>
                    <FaCheckCircle className="text-success" />
                    <FaPlusCircle className="ms-2" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </div>

                {showModal && (
                  <div className="modal" style={{ display: "block" }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">Are you sure you want to remove the assignment?</div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            No
                          </button>
                          <button type="button" className="btn btn-primary" onClick={handleDeleteAssignment}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
        </li>
        </ul>
      </div>
    </>
  );
}

export default Assignments;
