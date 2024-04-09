import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAssignment,
  setAssignment,
  setAssignments
} from "../assignmentsReducer";
import { LabState} from "../../../store";
import * as client from "../client";


function AssignmentEditor() {
    
    const assignment = useSelector((state: LabState) => state.assignmentsReducer.assignment);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

   
    const handleUpdateAssignment= async () => {
      const status = await client.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    const handleSave = (e) => {
        dispatch(updateAssignment(assignment))
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
  return (
    <div>

    <br/> <br/>
    <div className="col-md-10">
        <label>Assignment Name</label>
          <input name="name"
                  value={assignment.name} 
                  className="form-control m-2"
                  onChange={(e) => dispatch(setAssignment({ ...assignment, name: e.target.value}))}/>
        <label>Assignment Description</label>
          <textarea name="description"
                    value={assignment.description} 
                    className="form-control m-2"
                    onChange={(e)=>dispatch(setAssignment({ ...assignment, description: e.target.value}))}/>


    <div className="card bg-light m-2">
          <div className="card-header">
            Assign
          </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label offset-sm-2">Due</label>
        </div>
        <div className="row mb-3">
           <div className="col-sm-8 offset-sm-2">
           <input value={assignment.dueDate} className="form-control" type="date"
             onChange={(e) =>dispatch(setAssignment({ ...assignment, dueDate: e.target.value}))}/>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label offset-sm-2">Available From</label>
          <label className="col-sm-4 col-form-label">Until</label>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4 offset-sm-2">
          <input value={assignment.availableDate} className="form-control" type="date"
             onChange={(e) =>dispatch(setAssignment({ ...assignment, availableDate: e.target.value}))}/>
          </div>
          <div className="col-sm-4">
          <input value={assignment.untilDate} className="form-control" type="date"
             onChange={(e) =>dispatch(setAssignment({ ...assignment, untilDate: e.target.value}))}/>
          </div>
        </div>
        </div>


        <button onClick={handleUpdateAssignment} className="btn btn-danger m-2 float-end">
             Save
        </button>
          <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
            className="btn btn-success m-2 float-end">
            Cancel
        </Link>

        
      </div>
    </div>
  );
}
export default AssignmentEditor;