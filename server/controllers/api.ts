import { BaseController, Route, NextFunction } from './'
// import { Model } from '../models'

export class ApiController extends BaseController {

  static basePath = '/api/v1'

  static routes: Route[] = [
    { path: '/', action: 'rootIndex', root: true },
    { path: '/', action: 'index' },
   // { verb: 'post', path: '/', action: 'create' },
  ]

  /**
   * redirect on the good route
   * 
   * @param {NextFunction} next 
   * @memberof ApiController
   */
  public rootIndex(next: NextFunction) {
    this.res.redirect(301, '/api/v1')
  }

  /**
   * index
   * 
   * @param {NextFunction} next 
   * @memberof ApiController
   */
  public index(next: NextFunction) {
    const data = {
      name: 'Michel',
      age: 30,
      country: 'Germany',
    }
    this.res.json(data)
  }

  /**
   * Action qui créé une Todo
   * 
   * @param {NextFunction} next 
   * @memberof ApiController
   */
  public create(next: NextFunction) {
    console.log(this.req.body)
  //  const todo = new Todo(this.req.body)

    // todo.save().then(() => {
      // this.res.json(todo)
    // }).catch(next) // On oublie pas le catch !!!!!
  }
}
