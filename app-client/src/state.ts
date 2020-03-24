import { SignInUser } from './model/SignInUser';
import { ServerError } from './model/ServerError';
import { SignUpUser } from './model/SignUpUser';
import { ServerToken } from './model/ServerToken';
import { createGlobalState } from 'react-hooks-global-state';

let signUpUser: SignUpUser = new SignUpUser();
let serverError: ServerError = new ServerError(true);
let signInUser: SignInUser = new SignInUser();
let serverToken: ServerToken = new ServerToken();

export let { useGlobalState } = createGlobalState({
        academicPapers: [],
        signUpUser: signUpUser,
        signInUser: signInUser,
        serverError: serverError,
        serverToken: serverToken,
        authenticated: false
    }
);





