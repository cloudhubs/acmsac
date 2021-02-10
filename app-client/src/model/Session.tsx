export class Session {
    sessionName: string;
    trackCode: string;
    sessionCode: string;
    sessionChair: string;

    primaryMeetingLink: string;
    primaryStart: Date;
    primaryEnd: Date;

    secondaryMeetingLink: string | null;
    secondaryStart: Date | null;
    secondaryEnd: Date | null;
}
