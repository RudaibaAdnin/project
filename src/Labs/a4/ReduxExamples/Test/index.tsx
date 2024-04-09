import {inc, dec, sum} from "./testReducer";
import { useSelector, useDispatch } from "react-redux";
import { LabState } from "../../../store";



function Test(){

    const { element, array, text } = useSelector((state: LabState) => state.testReducer);
    const dispatch = useDispatch();
    const a=2, b=3;
    return(
        <div>
            <h2>{element}</h2>
            <h2>{array}</h2>
            <h2>{text}</h2>
            <button onClick={() => dispatch(inc())}> Increment </button>
            <button onClick={() => dispatch(dec())}> Decrement </button>
            <button onClick={()=> dispatch(sum({a,b}))}> Add </button>
        </div>
    );
}

export default Test;