import { Person } from "./Person";
import { Comment } from "./Comment";
import { Presentation } from "./Presentation";

export class AcademicArticle {
    id: number;
    title: string;
    paperId: number;
    trackCode: string;
    type: string;
    sessionCode: string;
    sessionChair: string;
    date: string;
    paperAbstract: string;
    pageNumbers: string;
    acknowledgements: string;
    videoEmbed: string;
    doiUrl: string;
    acmUrl: string;
    hideFromPublic: boolean;
    isReleased: boolean;
    userCanView: boolean;
    presentation: Presentation;
    presenter: Person;
    authors: Person[] = [];
    comments: Comment[] = [];
}

