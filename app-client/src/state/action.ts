import { AcademicArticle } from './../model/AcademicArticle';
import { ServerToken } from './../model/ServerToken';
import { Track } from '../model/Track';
import {ServerMessage} from "../model/ServerMessage";

export type Action =
| { type: "setReminderMessage", reminderMessage: ServerMessage }
| { type: "setTrackDetail", trackDetail: Track }
| { type: "setTracks", tracks: Track[] }
| { type: "setSelectedPaper", selectedPaper: AcademicArticle }
| { type: "setAcademicPapers", academicPapers: AcademicArticle[] }  
| { type: "setAuthenticated" }
| { type: "logout" }
  | { type: "setTrack"; track: string } 
  | { type: "setServerToken"; serverToken: ServerToken };
