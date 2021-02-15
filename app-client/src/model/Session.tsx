import {
  AcademicArticle,
  mapArticleBackendToFrontend,
} from "./AcademicArticle";

export class Session {
    sessionName: string;
    trackCode: string;
    sessionCode: string;

    primaryChair1: string;
    primaryChair2: string;
    primaryMeetingLink: string;
    primaryStart: Date;
    primaryEnd: Date;

    secondaryChair1: string | null;
    secondaryChair2: string | null;
    secondaryMeetingLink: string | null;
    secondaryStart: Date | null;
    secondaryEnd: Date | null;

    presentations: AcademicArticle[];
}

/**
 * Takes a Session returned from the backend--which is, more or less, coercable to a
 * Session, and translates the dates into the correct format.
 *
 * @param jsonSession
 */
export const mapSessionBackendToFrontend: (jsonSession: Session) => Session = (
  jsonSession: Session
) => ({
  ...jsonSession,
    primaryStart: new Date(jsonSession.primaryStart),
    primaryEnd: new Date(jsonSession.primaryEnd),
    secondaryStart: jsonSession.secondaryStart
      ? new Date(jsonSession.secondaryStart)
      : null,
    secondaryEnd: jsonSession.secondaryEnd
      ? new Date(jsonSession.secondaryEnd)
      : null,

    presentations: jsonSession.presentations.map<AcademicArticle>(
      mapArticleBackendToFrontend
    ),
});

/**
 * Checks if a session spans multiple days in this timezone
 * @param session The session to check on
 */
export const isCrossDaySession = (session: Session): boolean => {
    let baseline = session.primaryStart.getDay();
    return (
      baseline !== session.primaryEnd.getDay() ||
      baseline !== session.secondaryStart?.getDay() ||
      baseline !== session.secondaryEnd?.getDay()
    );
};
