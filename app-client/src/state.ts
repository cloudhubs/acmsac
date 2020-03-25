// import { AcademicArticle } from './model/AcademicArticle';
// import { SignInUser } from './model/SignInUser';
// import { ServerError } from './model/ServerError';
// import { SignUpUser } from './model/SignUpUser';
// import { ServerToken } from './model/ServerToken';
// import { createGlobalState } from 'react-hooks-global-state';

// let signUpUser: SignUpUser = new SignUpUser();
// let serverError: ServerError = new ServerError(true);
// let signInUser: SignInUser = new SignInUser();
// let serverToken: ServerToken = new ServerToken();

// export let { useGlobalState } = createGlobalState({
//         academicPapers: [],
//         signUpUser: signUpUser,
//         signInUser: signInUser,
//         serverError: serverError,
//         serverToken: serverToken,
//         authenticated: false
//     }
// );



import { Dispatch } from "react";
import { applyMiddleware } from "redux";
import { createStore } from "react-hooks-global-state";
import { State } from "./state/typeState";
import { Action } from "./state/action";
//model
import { ServerError } from "./model/ServerError";
import { ServerToken } from "./model/ServerToken";
import { SignInUser } from "./model/SignInUser";
import { SignUpUser } from "./model/SignUpUser";

const defaultState: State = {
    academicPapers: [],
    serverError: new ServerError(),
    serverToken: new ServerToken(),
    signInUser: new SignInUser(),
    signUpUser: new SignUpUser(),
    authenticated: false,
    track: "",
};



const LOCAL_STORAGE_KEY = "my_local_storage_key";
const parseState = (str: string | null): State | null => {
  try {
    const state = JSON.parse(str || "");
    // if (typeof state.count !== "number") throw new Error();
    // if (typeof state.person.age !== "number") throw new Error();
    // if (typeof state.person.firstName !== "string") throw new Error();
    // if (typeof state.person.lastName !== "string") throw new Error();
    return state as State;
  } catch (e) {
    return null;
  }
};
const stateFromStorage = parseState(localStorage.getItem(LOCAL_STORAGE_KEY));
console.log(stateFromStorage);
const initialState: State = stateFromStorage || defaultState;
console.log(initialState);
export const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "setServerToken":
            return {
                ...state,
                serverToken: action.serverToken
            }
        case "setAuthenticated":
            return {
                ...state,
                authenticated: true
            }
        case "setTrack":
          return {
            ...state,
            track: action.track
          }
          case "setAcademicPapers":
            return {
              ...state,
              academicPapers: action.academicPapers
            }
            case "logout":
            return {
              ...state,
              authenticated: false
            }
    //   case "increment":
    //     return {
    //       ...state,
    //       count: state.count + 1
    //     };
    //   case "setAge":
    //     return {
    //       ...state,
    //       person: {
    //         ...state.person,
    //         age: action.age
    //       }
    //     };
      default:
        return state;
    }
  };

const saveStateToStorage = ({ getState }: { getState: () => State }) => (
  next: Dispatch<Action>
) => (action: Action) => {
  const returnValue = next(action);
  console.log("-------------");
  console.log(getState());
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getState()));
  return returnValue;
};

export const { dispatch, useGlobalState } = createStore(
  reducer,
  initialState,
  applyMiddleware(saveStateToStorage)
);


