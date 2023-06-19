
export enum Category {
    Frontend,
    Backend,
    Fullstack,
    DevOps,
    BI,
    Data,
    PM,
    Design,
};

export type Offer = {
    id: number,
    title: string,
    description: string,
    category: Category,
    requirements: string,
    location: string,
    salaryLower?: number,
    salaryUpper?: number,
    createdAt: Date,
    companyId: number
};

export interface Filters extends Object {
    text?: string,
    category?: keyof typeof Category,
    location?: string,
    requirements?: string,
};
