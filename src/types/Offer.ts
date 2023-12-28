
export enum Category {
    Frontend = 'Frontend',
    Backend = 'Backend',
    Fullstack = 'Fullstack',
    DevOps = 'DevOps',
    BI = 'BI',
    Data = 'Data',
    PM = 'PM',
    Design = 'Design',
};

export type Requirement = {
    name: string,
    level: 1 | 2 | 3 | 4 | 5,
};

export type CreateOfferDto = {
    title: string,
    description: string,
    category: Category,
    requirements: object,
    location: string,
    salaryLower?: number,
    salaryUpper?: number,
    latitude: number,
    longitude: number,
};

export type Offer = {
    id: number,
    title: string,
    description: string,
    category: Category,
    requirements: object,
    location: string,
    salaryLower?: number,
    salaryUpper?: number,
    latitude: number,
    longitude: number,
    createdAt: Date,
    companyId: number
};

export interface Filters extends Object {
    text?: string,
    category?: keyof typeof Category,
    location?: string,
    requirements?: string,
};
