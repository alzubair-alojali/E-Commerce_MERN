import { type Request } from "express"

export interface IextendUserRequest extends Request {
    user?: any
}