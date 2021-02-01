import { dispatch } from "../state";
import { ServerToken } from "../model/ServerToken";
import { Session } from "../model/Session";

const setSessions = (sessions: any[]) => {
  let sessions_new = sessions.map<Session>((s: any) => ({
    trackCode: s.trackCode,
    sessionCode: s.sessionCode,
    sessionChair: s.sessionChair,
    primaryStart: new Date(s.primaryStart),
    primaryEnd: new Date(s.primaryEnd),
    secondaryStart: new Date(s.secondaryStart),
    secondaryEnd: new Date(s.secondaryEnd),
  }));
  dispatch({
    sessions: sessions_new,
    type: "setAllSessions",
  });
}

const FetchSession = {
  async getSessions(token: ServerToken) {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URL + `/sessions/`,
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
        setSessions(body);
      } else {
        console.log(body.message);
      }
    } else {
      console.log("server error");
    }
  },

  // async getCodes(token: ServerToken) {
  //   const response = await fetch(
  //     process.env.REACT_APP_API_BASE_URL + `/sessions/codes`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token.accessToken}`,
  //       },
  //     }
  //   );
  //   if (response != null) {
  //     const body = await response.json();
  //     if (!body.error) {
  //       setSessionNames(body);
  //     } else {
  //       console.log(body.message);
  //     }
  //   } else {
  //     console.log("server error");
  //   }
  // },
};
export default FetchSession;
