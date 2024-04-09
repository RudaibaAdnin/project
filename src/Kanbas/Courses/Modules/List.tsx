import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import "./index.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import db from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import { setModules, setModule, addModule, deleteModule, updateModule} from "./modulesReducer";
import { LabState} from "../../store";
import * as client from "./client";
import { useNavigate } from 'react-router-dom';

function ModuleList() {
  const {courseId } = useParams();
  const modules = useSelector((state: LabState) => state.modulesReducer.modules);
  const module = useSelector((state: LabState) => state.modulesReducer.module);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    client.findModulesForCourse(courseId).then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {dispatch(addModule(module)); });
    navigate(0);
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };


  return (

    <>

  <div className="flex-fill">
      <hr/>
      <h2>Modules</h2>
      {/* <span className="float-end">
      <button type="button" className="btn btn-light border border-dark m-1"> Collapse All</button>
      <button type="button" className="btn btn-light border border-dark m-1"> View Progress</button>
      <select className="btn btn-light border border-dark">
          <option>Publish All</option>
          <option>Publish all items and modules</option>
          <option>Unpublish</option>
      </select>
      <button type="button" className="btn btn-danger m-1"><FaPlus/> Module</button>
      </span> */}
 
      <hr/>
      <div className="col-md-11">
        <input value={module.name} 
                className="form-control ms-4 m-2"
                onChange={(e) => dispatch(setModule({ ...module, name: e.target.value}))}/>
        <textarea value={module.description} 
                  className="form-control ms-4 m-2"
                  onChange={(e) => dispatch(setModule({ ...module, description: e.target.value}))}/>
         
        <button className="btn btn-success float-end m-2"
                onClick={handleAddModule}> 
                Add 
        </button>
       <button className="btn btn-primary float-end m-2"
                onClick={handleUpdateModule}> 
                Update 
        </button> 

      </div>

      <br/>
      <br/>
      <br/>
      <br/> 

       <div className="col-md-11">
          <input
            type="text"
            placeholder="Search Modules"
            className="form-control ms-4 m-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <br/>
        <br/>
      {//modules.filter((module) => module.course === courseId).map((module, index) => (
         modules.filter((module) => module.course === courseId && module.name.toLowerCase().includes(searchTerm.toLowerCase()))
         .map((module, index) => (
        <ul className="list-group m-4">
          <li key={index} className="list-group-item wd-li p-2">
            <div>
              <FaEllipsisV className="me-2" />
              {module.name} <br/>
              <small className="text-muted p-2">{module.description}</small>
            {/* <p>{module._id}</p> */}
          
            <span className="float-end">

                <button className="btn btn-warning m-2"
                  onClick={(event) => {dispatch(setModule(module))}}> 
                  Edit
                </button>

                <button className="btn btn-danger m-2"
                  onClick={() => handleDeleteModule(module._id)}> 
                  Delete
                </button> 
          
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
              
            </div>
          </li>

          {/* <ul className="list-group">
                {module.lessons?.map((lesson: lessonType) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
          </ul>
           */}
          </ul>))}
          </div>
    </>
  );
}
export default ModuleList;
