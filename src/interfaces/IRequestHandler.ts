export type IRequestHandlerFactory = (req: Express.Request, res: Express.Response) => IRequestHandler

export interface IRequestHandler {
  getHeaders: () => { [key: string]: any }

  getQuery: () => any

  getBody: () => any

  status: (code: number) => void

  json: (json: any) => void
}
