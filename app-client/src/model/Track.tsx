import { Person } from "./Person";

export class Track {
    id: number;
    code: string;
    name: string;
    trackUrl: string;
    videoEmbed: string;
    message: string;
    chairs: Person[];
  }
