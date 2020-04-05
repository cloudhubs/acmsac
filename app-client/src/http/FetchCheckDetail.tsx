import { AcademicArticle } from "../model/AcademicArticle";
import { dispatch } from "../state";
import {ServerError} from "../model/ServerError";

const setSelectedPaper = (selectedPaper: AcademicArticle) => dispatch({
    selectedPaper: selectedPaper,
    type: 'setSelectedPaper',
});


const setServerError = (serverError: ServerError) => dispatch({
    serverError: serverError,
    type: 'setServerError'
});

const FetchCheckDetail = {
    async getAcademicPaper(email, paperId) {
        try {
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/check/' + email + '/' + paperId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            if (response != null) {
                const body = await response.json();
                if (!body.error) {
                    setSelectedPaper(body)
                } else {
                    setServerError({message: body.message, success: false});
                }
            } else {
                this.setError();
            }
        } catch (e){
            console.log("server error");
            this.setError();
        }
    },
    setError(){
        setServerError({message: "Detail not found", success: false});
    }
}
export default FetchCheckDetail;
