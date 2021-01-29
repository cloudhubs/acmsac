import { dispatch } from "../state";
import { ServerToken } from "../model/ServerToken";
import { Session } from "../model/Session";
import { Presentation } from "../model/Presentation";

const setPresentations = (presentations: Presentation[]) =>
  dispatch({
    presentations: presentations,
    type: "setPresentations",
  });

const FetchPresentationsBySession = {
  async getPresentations(token: ServerToken, session: Session) {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URL + `/presentations/session/${session.sessionCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );
    if (response != null) {
      const body = await response.json();
      if (!body.error) {
        setPresentations(body);
      } else {
        console.log(body.message);
      }
    } else {
      console.log("server error");
    }
  },
};
export default FetchPresentationsBySession;