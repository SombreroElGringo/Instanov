import * as express from 'express';
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import chalk from 'chalk'
import methodOverride = require('method-override')

import { ApiController }  from './controllers/api';

/**
 * Options of the server
 * 
 * @interface ServerOptions
 */
interface ServerOptions {
    /**
     * Port of the server
     * 
     * @type {number}
     * @memberof ServerOptions
     */
    readonly port?: number
}

/**
 * Our class Server for create our web server
 * 
 * @export
 * @class Server
 */
export class Server {
    public options: ServerOptions
    public app: express.Application

    /**
     * Creates an instance of Server.
     * @param {ServerOptions} [options={}] 
     * @memberof Server
     */
    constructor (options: ServerOptions = {}) {
        const defaults: ServerOptions = {
            port: 8080,
        }
      
        this.options = { ...defaults, ...options }
      
        this.app = express()
      
        this.useInitialMiddlewares()
      
        this.useControllersRouting()
          
        this.useFallbackMiddlewares()
    }

    /**
     * Configuration of our middlewares
     * 
     * @memberof Server
     */
    public useInitialMiddlewares () {
        
        this.app.set('json spaces', 2);

        this.app.use(logger('dev'))

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded())
        this.app.use(cookieParser('yalla'))

        this.app.use(methodOverride())        
    }

    /**
     * Add some fallback middlewares to the response
     * 
     * @memberof Server
     */
    public useFallbackMiddlewares () {
        this.app.use(this.notFoundMiddleware)
        this.app.use(this.errorMiddleware)
    }

    /**
     * Connexion of the differents controllers to the app
     * 
     * @memberof Server
     */
    public useControllersRouting () {
        const router = express.Router()
        ApiController.connect(router)

        this.app.use(router)
    }

    /**
     * Run the server
     * 
     * @memberof Server
     */
    public run () {
        this.app.listen(this.options.port, () => {
            console.log(`${chalk.green('✓')} App is running on port ${this.options.port}`)
        })
    }

    /**
     * A middleware for handle error 404
     * 
     * @private
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @memberof Server
     */
    private notFoundMiddleware(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        res.statusCode = 404
        res.end('Not found!')
    }

    /**
     * A middelware others handle errors
     * 
     * @private
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @memberof Server
     */
    private errorMiddleware(
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        res.status(err.status || 500)
        res.json({ error: {
            message: err.message || 'Unknown error',
        }})
    }

}