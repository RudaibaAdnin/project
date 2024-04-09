import React, { useState } from "react";
function StringStateVariables() {
  const [firstName, setFirstName] = useState("John");
  return (
    <div>
      <h2>String State Variables</h2>
      <p>{firstName}</p>
      <input
        className="form-control"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}/>
    </div>
  );
}


// function StringStateVariables() {

//   const [person, setPerson] = useState({name: "John", age: 28});
//   const [element, setElement] = useState([1,2,3,4])
//   const addElement = () => {
//     setElement([0, ...element])
//   };

//   const deleteElement = (index: number) => {
//     setElement(element.filter((item, i) => i!=index));
//   };


//   return(
//     <div>
//       <input type="text" className="form-control" value={person.name} onChange={(e)=> setPerson({...person, name:e.target.value}) } />
//       <p>{person.name}</p>
//       <input type="text" className="form-control" value={person.age} onChange={(e)=> setPerson({...person, age: parseInt(e.target.value)}) } />
//       <p>{person.age}</p>
//       <button onClick={() => addElement()}>Add</button> 
//       <ul>
//         {element.map((item, index) => (
//         <li key={index}>{item}
//           <button onClick={() => deleteElement(index)}>Delete</button></li>))}
//       </ul>
//     </div>
//   );
// }

export default StringStateVariables;