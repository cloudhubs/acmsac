
export class ServerError {
    constructor(success: boolean){
        this.success = success;
    }
    success: boolean;
    message: string;
}