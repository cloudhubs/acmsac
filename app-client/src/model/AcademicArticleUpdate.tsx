import { Person } from "./Person";
import { Comment } from "./Comment";
import { Presentation } from "./Presentation";
import { AcademicArticle } from "./AcademicArticle";

export class AcademicArticleUpdate {
    title: string;
    trackCode: string;
    sessionCode: string;
    date: string;
    paperAbstract: string;
    pageNumbers: string;
    acknowledgements: string;
    videoUrl: string;
    slidesUrl: string;
    doiUrl: string;
    constructor(old: AcademicArticle) {
        this.title = old.title;
        this.trackCode = old.trackCode;
        this.sessionCode = old.sessionCode;
        this.date = old.date;
        this.paperAbstract = old.paperAbstract;
        this.pageNumbers = old.pageNumbers;
        this.acknowledgements = old.acknowledgements;
        this.doiUrl = old.doiUrl;

        this.videoUrl = "";
        this.slidesUrl = "";
    }
}

