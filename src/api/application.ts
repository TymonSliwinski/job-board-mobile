import axios from "axios";
import { BACKEND_URL } from '@env';
import { ApplicationStatus, CompanyApplication, DeveloperApplication } from '../types/Application';

const axiosInstance = axios.create({ baseURL: BACKEND_URL, validateStatus(status) {
    return true;
}});

export default class Application {
    static getAll = async (accessToken: string): Promise<CompanyApplication[] | DeveloperApplication[]> => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const response = await axiosInstance.get('applications', config);
            if (response.status === 200) {
                return response.data;
            }
            throw new Error(response.data.message);
        } catch (err) {
            console.log(err.message);
            return err.message;
        }
    }

    static resolveStatus = async (id: number, status: ApplicationStatus, accessToken: string) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const response = await axiosInstance.post(`applications/${id}/status`, { status }, config);
            if (response.status === 200 && response.data.status === status) {
                return true;
            }
            throw new Error(response.data.message);
        } catch (err) {
            console.log(err.message);
            return err.message;
        }
    }


    static apply = async (offerId: number, description: string, accessToken: string) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };
        try {
            const response = await axiosInstance.post('applications', { offerId, description }, config);
            if (response.status === 201) {
                return true;
            }
            throw new Error(response.data.message);
        } catch (err) {
            console.log(err.message);
            return err.message;
        }
    }
}