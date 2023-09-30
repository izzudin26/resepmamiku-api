import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'

export const BASE_URL: string = "https://resepmamiku.com"

@Injectable()
export class HttpRequestService {
    public http: AxiosInstance;
    constructor() {
        this.http = axios.create()
    }
}
