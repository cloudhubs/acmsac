import { Dispatch } from "react";
import { createStore } from "react-hooks-global-state";
import { applyMiddleware } from "redux";
//model
import { ServerError } from "./model/ServerError";
import { ServerToken } from "./model/ServerToken";
import { SignInUser } from "./model/SignInUser";
import { SignUpUser } from "./model/SignUpUser";
import { Action } from "./state/action";
import { State } from "./state/typeState";
import {Track} from "./model/Track";
import {ServerMessage} from "./model/ServerMessage";
import {AcademicArticle} from "./model/AcademicArticle";



// {
//   id: 0,
//       title: "",
//     paperId: 0,
//     trackCode: "",
//     type: "",
//     sessionCode: "",
//     sessionChair: "",
//     date: "",
//     paperAbstract: "",
//     pageNumbers: "",
//     acknowledgements: "",
//     videoEmbed: "",
//     acmUrl: "",
//     doiUrl: "",
//     presentation: {
//   original: "",
//       download: "",
//       embed: "",
// },
//   presenter: {
//     name: "",
//         email: "",
//         affiliation: "",
//         country: "",
//         orcid: "",
//         linkedInUrl: "",
//         googleScholarUrl: "",
//         bio: "",
//         picUrl: ""
//   },
//   authors: [],
//       comments: []
// },

const defaultState: State = {
  reminderMessage: {
    success: false,
    message: "",
  },
  trackDetail: new Track(),
  tracks: [],
  selectedPaper: new AcademicArticle(),
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
const initialState: State = stateFromStorage || defaultState;
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
        authenticated: false,
        selectedPaper: new AcademicArticle(),
        academicPapers: [],
      }
    case "setSelectedPaper":
      return {
        ...state,
        selectedPaper: action.selectedPaper,
        serverError: new ServerError()
      }
    case "setTracks":
      return {
        ...state,
        tracks: action.tracks
      }
    case "setTrackDetail":
      return {
        ...state,
        trackDetail: action.trackDetail
      }
    case "setReminderMessage":
      return {
        ...state,
        reminderMessage: action.reminderMessage
      }
    case "setServerError":
      return {
        ...state,
        // selectedPaper: new AcademicArticle(),
        // academicPapers: [],
        serverError: action.serverError

      }
    default:
      return state;
  }
};

const saveStateToStorage = ({ getState }: { getState: () => State }) => (
  next: Dispatch<Action>
) => (action: Action) => {
  const returnValue = next(action);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getState()));
  return returnValue;
};

export const { dispatch, useGlobalState } = createStore(
  reducer,
  initialState,
  applyMiddleware(saveStateToStorage)
);


