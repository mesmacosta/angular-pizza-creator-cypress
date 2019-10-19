export class StubbedAPI {
    public method: string
    public name: string
    public status: number
    public regex: string
    public response: string

    public constructor(method: string, name: string, regex: string, response: string, status?: number) {
        this.method = method
        this.name = name
        this.regex = regex
        this.response = response
        this.status = status
    }

}
