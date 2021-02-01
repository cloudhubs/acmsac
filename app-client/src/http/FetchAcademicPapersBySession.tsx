import { AcademicArticle } from "../model/AcademicArticle";
import { dispatch } from "../state";
import { ServerToken } from "../model/ServerToken";

const setPapers = (papers: AcademicArticle[]) => dispatch({
    academicPapers: papers.map(p => ({
        ...p,
        primaryStart: new Date(p.primaryStart),
        primaryEnd: new Date(p.primaryEnd),
        secondaryStart: new Date(p.secondaryStart),
        secondaryEnd: new Date(p.secondaryEnd),
    })),
    type: 'setAcademicPapers',
});

const FetchAcademicPapersBySession = {

    async getAcademicPapersBySession(token: ServerToken, sessionCode: string) {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  `/presentations/session/${sessionCode}`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            }
        });
        if (response != null){
            const body = await response.json();
            if (!body.error) {
                setPapers(body)
            } else {
                console.log(body.message);
            }
        } else {
            console.log("server error");
        }
    }
}
export default FetchAcademicPapersBySession;
