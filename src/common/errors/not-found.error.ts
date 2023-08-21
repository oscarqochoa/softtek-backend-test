export class NotFoundError extends Error {

    private _status: number = 404;

    public get status(): number {
        return this._status;
    }

    public set status(value: number) {
        this._status = value;
    }

    private _message: string = '';

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

    constructor(
        message: string,
        status: number = 404
    ) {
        super(message);

        this.message = message;
        this.status = status;
    }

    toJSON() {
        return {
            message: this.message,
            status: this.status
        };
    }
}