import { Link, useLocation } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
//import { useParams } from "react-router";
//import { HiMiniBars3 } from "react-icons/hi2";
//import { courses, assignments, enrollments, grades, users } from "../../Database";

function CourseNavigation() {
  const links = ["Home", "Modules", "Quizzes", "Grades", "Assignments"];
  const { pathname } = useLocation();
  //const { courseId } = useParams();
  //const course = courses.find((course) => course._id === courseId);

  return (
   
    <ul className="wd-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>

  );
}
export default CourseNavigation;