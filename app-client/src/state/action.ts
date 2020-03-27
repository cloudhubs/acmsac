import { AcademicArticle } from './../model/AcademicArticle';
import { ServerToken } from './../model/ServerToken';
export type Action =
| { type: "setSelectedPaper", selectedPaper: AcademicArticle }  
| { type: "setAcademicPapers", academicPapers: AcademicArticle[] }  
| { type: "setAuthenticated" }
| { type: "logout" }
  | { type: "setTrack"; track: string } 
  | { type: "setServerToken"; serverToken: ServerToken };