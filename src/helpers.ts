import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Companies from "./api/companies";
import { Alert } from 'react-native';


export const getCompanyPictures = async () => {
    const pictures = new Map<number, string>;
    const companies = await Companies.getAll();
    for (const company of companies) {
        pictures[company.id] = company.avatar;
    };
    return pictures;
};

export const getCompaniesById = async () => {
    const companies = {};
    const companiesList = await Companies.getAll();
    for (const company of companiesList) {
        companies[company.id] = { name: company.name, location: company.location };
    };
    if (!Object.keys(companies))
        throw new Error('No companies found');
    return companies;
};

export const objectToQueryString = (object: object) => {
    let query = '';
    for (const [key, value] of Object.entries(object)) {
        query += `${key}=${value}&`
    }
    query = query.substring(0, query.length);
    return encodeURI(query);
};

export const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.2,
        base64: true,
    });

    if (!result.canceled) {
        if (result.assets?.length !== 1) {
            Alert.alert('Error', 'Please select only one image');
            return '';
        }
        const image = result.assets[0].base64;
        if (!image.includes('data:image/jpeg;base64,'))
            return `data:image/jpeg;base64,${image}`;
        else
            return image;
    }
};

export const validateMail = (email: string) => {
    if (!email) return false;
    const tester =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return false;

    const account = emailParts[0];
    const address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    const domainParts = address.split('.');
    if (
        domainParts.some((part) => {
            return part.length > 63;
        })
    )
        return false;

    if (!tester.test(email)) return false;
    return true;
};

export const validatePassword = (password: string) => {
    const tester =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) {
        return false;
    }
    if (!tester.test(password)) {
        return false;
    }
    return true;
};

export class Storage {
    static setItem = async (key: string, value: object) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.log('Error when saving to storage:');
            console.log(err);
        }
    };

    static getItem = async (key: string) => {
        try {
            const data = await AsyncStorage.getItem(key);
            if (data !== null)
                return JSON.parse(data);
            else
                throw new Error(`Data with key "${key}" not found in storage`);
        } catch (err) {
            console.log('Error when getting data from storage');
            console.log(err);
            return null;
        }
    };

    static removeItem = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (err) {
            console.log('Error when removing data from storage');
            console.log(err);
        }
    };

    static getKeys = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch (err) {
            console.log('Error when getting keys from storage');
            console.log(err);
        }
    };
};

export const parseSalary = (salaryLower: number, salaryUpper: number): string => {
    if (salaryLower || salaryUpper) {
        if (salaryLower && !salaryUpper) {
            return `From ${salaryLower}`;
        } else if (!salaryLower && salaryUpper) {
            return `Up to ${salaryUpper}`;
        }
        return `${salaryLower} - ${salaryUpper}`;
    }
    return 'Salary undisclosed';
};

