export class ErrorApp extends Error {
    public readonly status: number;

    constructor( message: string, status = 400 ){
        super( message )
        this.status = status;
    }
}

export class BadRequestError extends ErrorApp {

    constructor( message: string ){
        super( message, 400 )
    }
}

export class NotFoundError extends ErrorApp {

    constructor( message: string ){
        super( message, 404 )
    }
}

export class UnauthorizedError extends ErrorApp {

    constructor( message: string ){
        super( message, 401 )
    }
}