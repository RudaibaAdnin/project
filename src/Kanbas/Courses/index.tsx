import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import QuizEditor from "./Quizzes/Editor";
import QuestionEditor from "./Quizzes/Editor/Questions";
import Preview from "./Quizzes/Editor/preview";
import QuizDetail from "./Quizzes/Editor/detail";
import Grades from "./Grades";
import Quizzes from "./Quizzes";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
//import db from "../Database";
import { LabState } from "../store";



function Courses() {
  const links = ["Home", "Modules", "Quiz", "Grades", "Assignments"];
  const { pathname } = useLocation();
  const { courseId } = useParams();
  //const course = db.courses.find((course) => course._id === courseId);
  const course = useSelector((state: LabState) => state.coursesReducer.course);

  return (
    <div>
     <div className="d-none d-md-block">
        <ol className="breadcrumb m-4">
              <li className="breadcrumb-item" style={{ "color": "red", fontSize:20 }}><HiMiniBars3 /> Course {course?.name}</li>
              <li className="breadcrumb-item active" style={{fontSize:20 }}>{links.map((link, index) =>(pathname.includes(link) ? link : ""))}</li>
          </ol>
         <CourseNavigation />
      </div>


        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "300px", top: "40px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Grades" element={<Grades/>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>} />
            <Route path="Quizzes" element={<Quizzes/>} />
            <Route path="Quizzes/:quizId" element={<QuizEditor/>} />
            <Route path="Quizzes/Details/:quizId" element={<QuizDetail/>} />
            <Route path="Quizzes/:quizId/Questions/:questionId" element={<QuestionEditor/>} />
            <Route path="Quizzes/:quizId/Preview" element={<Preview/>} />
          </Routes>
        </div>
      </div>

  );
}

export default Courses

