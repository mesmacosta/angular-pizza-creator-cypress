import { StubbedAPI } from './stubbed-api'

export interface IPageData {
    name: string
    url: string
    apis?: StubbedAPI[]
}
