//import { courses, assignments, enrollments, grades, users } from "../../Database";
import ModuleList from "../Modules/List";
import { FaCheck, FaThList, FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { useParams } from "react-router";

function Home() {
  const { courseId } = useParams();
  //const course = courses.find((course) => course._id === courseId);

  return (
    <div>

    <br/>
    <h5>Home</h5>
      <div className="d-flex">
        <ModuleList />
      <div className="flex-grow-0 m-2 ms-5 d-none d-lg-block" style={{"width": "250px"}}>
        <h2>Course Status</h2>
        <button type="button" className="btn btn-light border border-dark m-1 ms-4"> Publish</button>
          <button type="button" className="btn btn-light border border-dark m-1"> Unpublish</button>
            <ul className="list-group wd-course-status pt-5">
                <li className="list-group-item">
                <div>
                    <FaEllipsisV className="me-2" />  Week 1
                    <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                    </span>
                </div>
                </li>
                <li className="list-group-item">
                <div>
                    <FaEllipsisV className="me-2" />  Week 2
                    <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                    </span>
                </div>
                </li>
                <li className="list-group-item">
                <div>
                    <FaEllipsisV className="me-2" />  Week 3
                    <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                    </span>
                </div>
                </li>
            </ul>
            <h5 className="ms-4 mt-4"> To Do</h5>
            <hr/>
            <ul className="wd-to-do">
              <li><a href="#"><FaCheck/>  Grade A1</a><br/><small className="text-muted p-2"> 30 Points</small></li>
              <li><a href="#"><FaCheck/>  Grade A2</a><br/><small className="text-muted p-2"> 20 Points</small></li>
            </ul>
            <h5 className="ms-4 mt-4"> Coming Up</h5>
            <hr/>
            <ul className="wd-to-do">
              <li><a href="#"><FaThList/>  Lecture 1</a><br/><small className="text-muted p-2"> January</small></li>
              <li><a href="#"><FaThList/>  Lecture 2</a><br/><small className="text-muted p-2"> February</small></li>
              <li><a href="#"><FaThList/>  Lecture 3</a><br/><small className="text-muted p-2"> March</small></li>
            </ul>
      </div>
      </div>
    </div>
  );
}
export default Home;