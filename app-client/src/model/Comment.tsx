import {Person} from "./Person";

export type Comment = {
    id: any;
    date: any;
    user: Person;
    replies: [];
    content: string;
}