import { AcademicArticle } from './../model/AcademicArticle';
import { ServerError } from '../model/ServerError';
import { ServerToken } from '../model/ServerToken';
import { SignInUser } from '../model/SignInUser';
import { SignUpUser } from '../model/SignUpUser';
import { Track } from '../model/Track';
import {ServerMessage} from "../model/ServerMessage";
import {CurrentUser} from "../model/CurrentUser";
import { Session } from '../model/Session';

export type State = {
    reminderMessage: ServerMessage;
    trackDetail: Track,
    tracks: Track[];
    sessions: Session[];
    selectedSession: Session;
    selectedDay: Date | null,
    selectedTime: Date | null,
    selectedPaper: AcademicArticle;
    academicPapers: AcademicArticle[];
    serverError: ServerError;
    serverToken: ServerToken;
    signInUser: SignInUser;
    signUpUser: SignUpUser;
    authenticated: boolean;
    track: string;
    currentUser: CurrentUser;
};
