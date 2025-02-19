import { UserType } from "./user"

export type HistoryType = {
    _id?: string,
    user: string | UserType,
    category: string,
    totalPoint: number,
    totalCorrect: number,
    result: number,
    type: number,   
    createdAt?: string,
    updatedAt?: string
}