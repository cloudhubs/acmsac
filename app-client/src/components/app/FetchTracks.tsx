import { useHistory, useParams } from "react-router-dom";
import { AcademicArticle } from "../../model/AcademicArticle";
import { dispatch, useGlobalState } from "../../state";
import { ServerToken } from "../../model/ServerToken";

const setAuthorsPapers = (authorsPapers: AcademicArticle[]) => dispatch({
    academicPapers: authorsPapers,
    type: 'setAcademicPapers',
  });

const FetchTracks = {

    

    async getAcademicPapers(track, history, token: ServerToken) {
        
        let url = "";
        if (track === "all"){
            url = process.env.REACT_APP_API_BASE_URL +  '/tracks'
        } else {
            url = process.env.REACT_APP_API_BASE_URL +  '/tracks/' + track
        }
        const response = await fetch(url , {            

            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            }
            });
            console.log(response);
            if (response != null){
                const body = await response.json();
                if (!body.error) {
                    setAuthorsPapers(body)
                    console.log(body);
                } else {
                  console.log(body.message);
                }
            } else {
              console.log("server error");
            }
    }
}
export default FetchTracks;