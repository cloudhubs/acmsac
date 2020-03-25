import { AcademicArticle } from './../model/AcademicArticle';
import { ServerToken } from './../model/ServerToken';
export type Action =
//   | { type: "increment" }
//   | { type: "decrement" }
//   | { type: "setFirstName"; firstName: string }
| { type: "setAcademicPapers", academicPapers: AcademicArticle[] }  
| { type: "setAuthenticated" }
  | { type: "setTrack"; track: string } 
  | { type: "setServerToken"; serverToken: ServerToken };