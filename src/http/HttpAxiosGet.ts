import axios from 'axios'
import { IDataRes } from '../interfaces/HttpInterfaces'

// eslint-disable-next-line valid-jsdoc
/**
 * It returns Response.
 * @url {string} this url address.
 */
export function GetRequest(url: string) {
    return axios.get<IDataRes>(url, { timeout: 10000 })
}
