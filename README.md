## Descripción

Crea una capa de abstracción para los Router y Controller, también agrega una interfaz de respuesta estandar que no es
obligatorio utilizarla.

## Uso

Primero installar usando `npm i common-clases`

### Router

Importar la dependencia `import { Router } from 'common-clases';`

Luego extender nuestra clase desde Router

```typescript
export class MyClassRouter extends Router {
}
```

Ahora en el constructor de nuestra clase tenemos que pasarle al super el controlador que manejará los endpoints que
agreguemos.

```typescript
 super(myController);
```
Después de esto podemos agregar las rutas que necesitemos.

```typescript
    this.router.get("/some-path", this.handler(this.Controller.myFunction));
    this.router.post("/some-path-s", this.handler(this.Controller.myFunctions));
```

El ejemplo completo quedaría de la siguiente forma:

````typescript
import { Router } from 'common-clases';

export class MyClassRouter extends Router {

    constructor() {
        super(myController);
        this.router.get("/some-path", this.handler(this.Controller.myFunction));
        this.router.post("/some-path-s", this.handler(this.Controller.myFunctions));
    }
}
````

Validación de esquemas

Se deben crear esquemas utilizando Joi para ello, importal la función de validación y agregarla a la lista de middlewares pasandole el esquema a validar.

````typescript
import { schemaValidator } from 'common-clases';
import { requestSchema } from './schemas';

...
this.router.get("/some-path", [schemaValidator(requestSchema)], this.handler(this.Controller.myFunction));


````

### Controller

Importar la dependencia `import {Controller} from "common-clases";`

Luego extender nuestra clase controller desde Controller.

```typescript
export class MyController extends Controller {
    
}
```
El contructor debe recibir request y response (interfaces de express) y pasarselos al super.
````typescript
    constructor(req: Request, res: Response) {
        super(req, res);
    }
````
Luego en las funciones puedes obtener datos del request o agregar al response usando this.

````typescript
    public myFunction() {
        const body = this.req.body;
        return this.res.json({}).send();
    }
````

Si se quiere utilizar la interfaz por defecto solo es necesario retornar:
```typescript
    return this.response({payload: {some: ""}});
```
Esto retorna un JSON con la siguiente estructura:
```json
{
  "status": {
    "code": number,
    "techCode": string,
    "description": string
  },
  "payload": any,
}
```
El ejemplo completo quedaría de la siguiente forma:
```typescript
import {Controller} from "common-clases";
import {Request, Response} from "express";

export class MyController extends Controller {
    
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    public myFunction() {
        const body = this.req.body;
        return this.res.json({}).send();
    }
}
```
