import { Person } from "./Person";
import { Comment } from "./Comment";

export class Track {
    id: number;
    code: string;
    name: string;
    trackUrl: string;
    videoEmbed: string;
    message: string;
    chairs: Person[];
    comments: Comment[];
  }
