import axios, {AxiosResponse} from 'axios'
import {IDataRes} from '../interfaces/HttpInterfaces'

export function GetRequest(url: string) {

    return axios
        .get<IDataRes>(url, {timeout: 10000,})

}
