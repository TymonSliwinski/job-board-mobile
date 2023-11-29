import axios from "axios";
import { Company } from "../types/User";

const axiosInstance = axios.create({ baseURL: process.env.EXPO_PUBLIC_BACKEND_URL });

export default class Companies {
    static getAll = async () => {
        try {
            const companies: Array<Company> = await (await axiosInstance.get('companies/')).data;
            return companies;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    static getOne = async (id: number) => {
        try {
            const company: Company = await (await axiosInstance.get(`companies/${id}`)).data;
            return company;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

