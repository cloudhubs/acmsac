import { Person } from "./Person";
import { Comment } from "./Comment";
import { Presentation } from "./Presentation";

export type AcademicArticle = {
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
    presentation: Presentation;
    presenter: Person;
    authors: Person[];
    comments: Comment[];
}

