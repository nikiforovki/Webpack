import { combineReducers } from "redux";
import tasks from "./tasks";
import {taskReducer} from "./taskReducer";


const rootReducer = () => combineReducers({
    tasks
})

export default rootReducer;