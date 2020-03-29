import { AcademicArticle } from './../model/AcademicArticle';
import { ServerToken } from './../model/ServerToken';
import { Track } from '../model/Track';

export type Action =
| { type: "setTracks", tracks: Track[] }  
| { type: "setSelectedPaper", selectedPaper: AcademicArticle }  
| { type: "setAcademicPapers", academicPapers: AcademicArticle[] }  
| { type: "setAuthenticated" }
| { type: "logout" }
  | { type: "setTrack"; track: string } 
  | { type: "setServerToken"; serverToken: ServerToken };