import { Person } from "./Person";
import { Comment } from "./Comment";

export type AcademicArticle = {
    id: number;
    title: string;
    paperId: number;
    trackCode: string;
    sessionCode: string;
    sessionChair: string;
    date: string;
    paperAbstract: string;
    pageNumbers: string;
    acknowledgements: string;
    videoEmbed: string;
    presentation: {
        original: string;
        download: string;
        embed: string;
    };
    presenter: Person;
    authors: Person[];
    comments: Comment[];
}

