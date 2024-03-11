import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { taskReducer } from '../reducers/taskReducer';
import { composeWithDevTools } from '@redux-devtools/extension'; // Убедитесь, что вы импортируете из правильного пакета

const rootReducer = combineReducers({
    tasks: taskReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // Используйте composeWithDevTools
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;















//Работает почти 14:56 08.03

// import { applyMiddleware, compose, createStore } from "redux";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import rootReducer from "../reducers/tasks";
// import { thunk } from "redux-thunk";
//
// const composeEnhancers = composeWithDevTools || compose;
// const composedMiddleware = applyMiddleware(thunk);
//
// const store = createStore(rootReducer, composeEnhancers(composedMiddleware));
//
// export default store;







// import { createStore, combineReducers } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import tasksReducer from "../reducers/tasks";
//
// const rootReducer = combineReducers({
//     tasks: tasksReducer
// });
//
// const initialState = {};
//
// const store = createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools() // composeWithDevTools для интеграции с Redux DevTools
// );
//
// export default store;

