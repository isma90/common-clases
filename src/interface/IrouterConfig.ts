import * as express from "express";

export interface IrouterConfig {
    path: string;
    middleware: any[];
    handler: express.Router;
}