import React, { useState } from "react";
function Quiz() {


    const handleClick = (parameter = "Hello") => {
        console.log(parameter)
      };
      const hello = () => {
        console.log("Hello World!");
      };
    return(
       <div>
          <h1>Quiz</h1>
 
          <button onClick={hello}>
          Click Hello</button>
       </div>
    );
 }
export default Quiz