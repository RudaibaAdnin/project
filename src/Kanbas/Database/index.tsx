import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json"
import users from "./users.json"
import enrollments from "./enrollments.json"
import grades from "./grades.json"


export {  courses, modules, assignments, users, enrollments, grades  };

// const courses = [
//     {
//       name: "Course 1",
//       number: "Number 1",
//       startDate: "2023-09-10",
//       endDate: "2023-12-15",
//       _id: "1"
//     },
//     {
//       name: "Course 2",
//       number: "Number 2",
//       startDate: "2023-10-15",
//       endDate: "2023-12-20",
//       _id: "2"
//     },
//     {
//       name: "Course 3",
//       number: "Number 3",
//       startDate: "2023-11-20",
//       endDate: "2024-02-28",
//       _id: "3"
//     }
//     // Add more course objects as needed
//   ];
  
const db = {
    courses: courses, 
    modules: modules,
    assignments: assignments,
    users: users,
    enrollments: enrollments,
    grades: grades

}
  
export default db;