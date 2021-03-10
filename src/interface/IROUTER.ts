import * as express from "express";

export interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}