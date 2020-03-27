import { AcademicArticle } from './../model/AcademicArticle';
import { ServerError } from '../model/ServerError';
import { ServerToken } from '../model/ServerToken';
import { SignInUser } from '../model/SignInUser';
import { SignUpUser } from '../model/SignUpUser';

export type State = {
    selectedPaper: AcademicArticle;
    academicPapers: AcademicArticle[];
    serverError: ServerError;
    serverToken: ServerToken;
    signInUser: SignInUser;
    signUpUser: SignUpUser;
    authenticated: boolean;
    track: string;
};