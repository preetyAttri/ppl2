import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReducerRegister from "../reducers/reducerRegister";
import ReducerLogin from "../reducers/reducerLogin";
import ReducerForget from "../reducers/reducerForget";
import ReducerReset from "../reducers/reducerReset";
import ReducerTimeline from "../reducers/reducerTimeline";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  combineReducers({
    ReducerRegister: ReducerRegister,
    ReducerLogin: ReducerLogin,
    ReducerForget: ReducerForget,
    ReducerReset: ReducerReset,
    ReducerTimeline: ReducerTimeline
  })
);
export default Store;
