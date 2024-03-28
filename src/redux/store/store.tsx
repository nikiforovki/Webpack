import { createStore, combineReducers, compose } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { taskReducer } from "../reducers/taskReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
