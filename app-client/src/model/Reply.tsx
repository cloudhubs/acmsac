import {Person} from "./Person";

export type Reply = {
    id: any;
    date: any;
    user: Person;
    content: string;
    blocked: boolean;
}