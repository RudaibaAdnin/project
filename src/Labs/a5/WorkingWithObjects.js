import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {

    const [assignment, setAssignment] = useState({
        id: 1, title: "Assignment Title",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
      });
    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"

    const [module, setModule] = useState({
        id: 1, name: "Module Name",
        description: "Create a NodeJS server with ExpressJS",
        course: "RS101",
      });
    const Module_URL = "http://localhost:4000/a5/module"

    const fetchAssignment = async () => {
      const response = await axios.get(`${ASSIGNMENT_URL}`);
      setAssignment(response.data);
    };
    const updateTitle = async () => {
      const response = await axios
        .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
      setAssignment(response.data);
    };
    useEffect(() => {
      fetchAssignment();
    }, []);
  
  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary m-2"
      href="http://localhost:4000/a5/assignment">
        Get Assignment
      </a>
      <a className="btn btn-danger m-2"
      href="http://localhost:4000/a5/module">
        Get Module
      </a>

      <h4>Retrieving Properties</h4>
      <a className="btn btn-primary m-2"
      href="http://localhost:4000/a5/assignment/title">
        Get Title
      </a>
      <a className="btn btn-primary m-2"
      href="http://localhost:4000/a5/module/name">
        Get Name
      </a>
      <h4>Modifying Properties</h4>

      <input className="m-2" onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button className="btn btn-info m-2" onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button className="btn btn-info m-2" onClick={fetchAssignment} >
        Fetch Assignment
      </button>

      <h5 className="m-2" >Assignments</h5>
      
      <input className="m-2" type="text" 
        onChange={(e) => setAssignment({ ...assignment,
            title: e.target.value })}
        value={assignment.title}/><br/>
    
        <a className="btn btn-info m-2" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
            Update Assignment Title
        </a><br/>

          
      <input className="m-2" type="number" 
        onChange={(e) => setAssignment({ ...assignment,
            score: e.target.value })}
        value={assignment.score}/><br/>
    
        <a className="btn btn-info m-2" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
            Update Assignment Score
        </a><br/>

       <label> <input className="m-2" type="checkbox" 
        onChange={(e) => setAssignment({ ...assignment,
            completed: !assignment.completed })}
        value={assignment.completed}/> Completed </label><br/>
    
        <a className="btn btn-info m-2" href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
            Update Completed
        </a><br/>



<br/>

<h5 className="m-2" >Modules</h5>

      <input className="m-2" type="text" 
        onChange={(e) => setModule({ ...module,
            name: e.target.value })}
        value={module.name}/> <br/>

    <a className="btn btn-info m-2" href={`${Module_URL}/name/${module.name}`}>
        Update Module Name
      </a><br/>


      <textarea className="m-2"
        onChange={(e) => setModule({ ...module,
            description: e.target.value })}
        value={module.description}/> <br/>
     <a className="btn btn-info m-2" href={`${Module_URL}/description/${module.description}`}>
        Update Module Description
      </a>
    </div>


    
  );
}
export default WorkingWithObjects;