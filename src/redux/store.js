import { combineReducers, createStore } from "redux";
import { Reducer } from "./Reducer";

const totalReducers = combineReducers({ darkMode: Reducer });
export const store = createStore(totalReducers);
