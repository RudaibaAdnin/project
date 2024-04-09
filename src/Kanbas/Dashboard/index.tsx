import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCourse,   deleteCourse,
  updateCourse,
  setCourse, setCourses } from "./coursesReducer";
import { LabState } from "../store";
import * as client from "./client";

function Dashboard({}) {
    const courses = useSelector((state: LabState) => state.coursesReducer.courses);
    const course = useSelector((state: LabState) => state.coursesReducer.course);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
   // const [filteredCourses, setFilteredCourses] = useState(courses);

    const handleUpdateCourse = async () => {
      const status = await client.updateCourse(course);
      dispatch(updateCourse(course));
    };
  
    const handleAddCourse = async () => {
      const status = await client.addCourse(course);
      dispatch(addCourse(course)); 
    };
  
    const handleDeleteCourse = async (courseID: string) => {
       const status = await client.deleteCourse(courseID);
        dispatch(deleteCourse(courseID));
    };

    // const handleSearch = () => {
    //   const term = searchTerm.toLowerCase();
    //   const filtered = courses.filter((course) => course.name.toLowerCase().includes(term));
    //   //setFilteredCourses(filtered);
    // };

    useEffect(() => {
      client.findAllCourses().then((courses) =>
          dispatch(setCourses(courses))
      );
    }, []);


  return (
    <div className="flex-fill m-4">
      <h1>Dashboard</h1>
      
      <br/><h3>Course</h3><br/>


       <div className="col-md-8 ms-4">
            <input type="text" className="form-control w-20 p-2" placeholder="Search for Courses" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>

      <br/>
      <br/> 


      <div className="col-md-8 ms-4">

      <h5>Add and Update Course</h5>
      <input value={course.name} className="form-control m-2"
             onChange={(e) => dispatch(setCourse({ ...course, name: e.target.value }))} />
      <input value={course.number} className="form-control m-2"
             onChange={(e) => dispatch(setCourse({ ...course, number: e.target.value }))} />
      <input value={course.startDate} className="form-control m-2" type="date"
             onChange={(e) => dispatch(setCourse({ ...course, startDate: e.target.value }))}/>
      <input value={course.endDate} className="form-control m-2" type="date"
             onChange={(e) => dispatch(setCourse({ ...course, endDate: e.target.value }))} />
        <button className="btn btn-success float-end m-2"
             onClick={handleAddCourse}> Add </button>

        <button className="btn btn-primary float-end m-2"
              onClick={handleUpdateCourse}> Update </button>

    </div>
      <br/>
      <br/>
      <br/>
      <div className="list-group col-md-8 m-4 mt-4 ms-4">
        <h5>Existing Courses</h5>
        {//courses.map((course) => (
         courses.filter((course) =>  course.name.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
         //filteredCourses.map((course) => (
          <Link key={course._id}
                to={`/Kanbas/Courses/${course._id}`}
                className="list-group-item">
            {course.name}
            {/* {course._id} */}
            <button className="btn btn-danger float-end m-2" 
                     onClick={(event) => { event.preventDefault(); handleDeleteCourse(course._id)}}>
                Delete
            </button>
            <button className="btn btn-warning float-end m-2"
                    onClick={(event) => { event.preventDefault(); dispatch(setCourse(course))}}> 
                Edit
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;