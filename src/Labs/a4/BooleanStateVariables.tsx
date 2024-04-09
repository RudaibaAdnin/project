import React, { useState } from "react";
function BooleanStateVariables() {
  const [done, setDone] = useState(true);
  return (
    <div>
      <h2>Boolean State Variables</h2>
      <p>{done ? "Done" : "Not done"}</p>
      <label className="form-control">
        <input type="checkbox" checked={done} onChange={() => setDone(!done)} /> Done </label>
      {done && <div className="alert alert-success"> Yay! you are done</div>}
    </div>
  );
}


// import { useState } from "react";
// import react from "react";

// function BooleanStateVariables(){
//   const [flag, setFlag] = useState(false);
//   return(
//     <div>
//       <p>{flag?"True" : "False"}</p>
//       <label><input type="checkbox" checked={flag} onChange={()=>setFlag(!flag)}/> Flag </label>
//       {flag && <div className="alert alert-success"> selected </div>}
//     </div>
//   );
// }

export default BooleanStateVariables;