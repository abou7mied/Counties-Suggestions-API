import { Request, Response } from 'express'
import { IRequestHandler } from '../interfaces/IRequestHandler'

export default class RequestHandler implements IRequestHandler {
  constructor (private readonly req: Request, private readonly res: Response) {

  }

  getHeaders (): any {
    return this.req.headers
  }

  getQuery (): any {
    return this.req.query
  }

  getBody (): any {
    return this.req.headers
  }

  status (code: number): void {
    this.res.status(code)
  }

  json (json: any): void {
    this.res.json(json)
  }
}
