import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import YouTubePage from "./YouTube";
import store from "./store";
import { Provider } from "react-redux";


function Kanbas() {
    return(
       <div>
         <Provider store={store}>
            <div className="d-flex" style={{ flexGrow: 1 }}>
               <KanbasNavigation />
               <div style={{ flexGrow: 1 }}>
               <Routes>
                  
                  <Route path="/" element={<Navigate to="Dashboard" />} />
                  <Route path="Account/*" element={<Account/>} />
                  <Route path="Dashboard" element={
                        <Dashboard/>} />
                   <Route path="Courses/:courseId/*" element= <Courses /> />
                   <Route path="YouTube" element={
                        <YouTubePage/>} />

               </Routes>
               </div>
         </div>
         </Provider>
       </div>
       
    );
 }
 export default Kanbas

