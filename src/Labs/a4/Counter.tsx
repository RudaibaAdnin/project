import React, { useState } from "react";
function Counter() {
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Up</button>
      <button onClick={() => setCount(count - 1)}>Down</button>
    </div>
  );
}


// import { useState } from "react";
// import React from "react";

// function Counter(){

//   const[value, setValue]=useState('prova');
//   return (
//     <div>
//       <h2>Value: {value}</h2>
//       <button onClick={()=>setValue('rudaiba')}>Value</button>
//     </div>
//   );
// }
export default Counter;