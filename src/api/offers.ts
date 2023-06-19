import axios from "axios";
import { BACKEND_URL } from '@env';
import { Filters, Offer } from "../types/Offer";
import { objectToQueryString } from "../helpers";

const axiosInstance = axios.create({ baseURL: BACKEND_URL });

export default class Offers {
    static getAll = async (filters?: Filters) => {
        try {
            let query = '?';
            if (filters) {
                query += objectToQueryString(filters);
            }
            const offers: Array<Offer> = await (await axiosInstance.get('offers/' + query)).data.data;
            return offers;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static getOne = async (id: number) => {
        try {
            const offer: Offer = await (await axiosInstance.get(`offers/${id}`)).data.data;
            return offer;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static add = async (offer: Offer, accessToken: string) => {
        const config = {
            headers :{
                Authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const result = axiosInstance.post('/offers', offer, config);
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static delete = async (id: number, accessToken: string) => {
        const config = {
            headers :{
                Authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const result = axiosInstance.delete(`/offers/${id}`, config);
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    static update = async (offer: Offer, accessToken: string) => {
        const config = {
            headers :{
                Authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const result = axiosInstance.put(`/offers/${offer.id}`, offer, config);
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

