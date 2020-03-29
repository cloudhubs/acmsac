import {Person} from "./Person";
import {Reply} from "./Reply";

export type Comment = {
    id: any;
    date: any;
    user: Person;
    replies: [Reply];
    content: string;
}