import * as express from 'express';
import { ObjectSchema, ValidationOptions } from 'joi';

const OPTS: ValidationOptions = {
  abortEarly: false,
  stripUnknown: true,
};

export function schemaValidator(schema: ObjectSchema) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.method === 'GET' ? req.params : req.body;
    const { error } = schema.validate(params, OPTS);
    if (error) {
      return res.status(400).json({
        errors: [
          {
            status: 400,
            source: { pointer: req.path },
            title: 'error interno',
            detail: 'Invalid Request Schema',
          },
        ],
      });
    } else {
      return next();
    }
  };
}
