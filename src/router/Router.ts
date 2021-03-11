import * as express from "express";

export abstract class Router {

    public router: express.Router;
    protected Controller: any;
    private readonly handlers: any;

    constructor(controller: any) {
        this.Controller = this.handlers.prototype;
        this.router = express.Router();
    }
    protected handler(action: () => void): any {
        return (req: Request, res: Response) => action.call(new this.Controller(req, res));
    }
}
