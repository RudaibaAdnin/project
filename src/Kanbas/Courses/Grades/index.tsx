import { courses, assignments, enrollments, grades, users } from "../../Database";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaCog, FaArrowCircleRight, FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import { useParams } from "react-router-dom";



function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  const course = courses.find((course) => course._id === courseId);

  return (
    <div className="flex-fill">
      <br/>
      <h2>Grades</h2>

      <span className="float-end m-4">
          <button type="button" className="btn btn-light border border-dark m-1"><FaArrowAltCircleRight/> Import</button>
          <button type="button" className="btn btn-light border border-dark m-1 dropdown-toggle" data-toggle="dropdown"><FaArrowAltCircleLeft/> Export</button>
         <button type="button" className="btn btn-light border border-dark m-1 p-2 me-3"><FaCog/></button>
        </span>
        <br/><br/>
        <div className="row">
          <div className="col-md-5">
            <label>Student Names</label>
            <input type="text" className="form-control" placeholder="Search Students"/>
          </div>
          <div className="col-md-5">
            <label>Assignment Names</label>
            <input type="text" className="form-control" placeholder="Search Assignments"/>
          </div>
        </div>


      <div className="table-responsive me-4 mt-5">
            <table width="100%" className="table table-bordered table-striped">
          <thead>
            <th>Student Name</th>
            {as.map((assignment) => (<th>{assignment.name}</th>))}
          </thead>

          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                  <td>{user?.firstName} {user?.lastName}</td>
                  {assignments.map((assignment) => {
                    const grade = grades.find((grade) => {
                      return grade.student === enrollment.user &&
                             grade.assignment === assignment._id &&
                             grade.course === courseId;
                    });
                    return grade ? (<td>{grade.grade}</td>) : null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;