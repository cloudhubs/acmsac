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
    userCanEdit: boolean;
    presentation: Presentation;
    presenter: Person;
    authors: Person[] = [];
    comments: Comment[] = [];
    primaryStart: Date;
    primaryEnd: Date;
    secondaryStart: Date | null;
    secondaryEnd: Date | null;
}

export const mapArticleBackendToFrontend: (p: AcademicArticle) => AcademicArticle = (p: AcademicArticle) => ({
    ...p,
    primaryStart: new Date(p.primaryStart),
    primaryEnd: new Date(p.primaryEnd),
    secondaryStart: p.secondaryStart ? new Date(p.secondaryStart) : null,
    secondaryEnd: p.secondaryEnd ? new Date(p.secondaryEnd) : null,
});
