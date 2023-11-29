export enum ApplicationStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export type Application = {
    id: number,
    description: string,
    offerId: number,
    developerId: number,
    status: ApplicationStatus,
    createdAt: string,
};

export type application = {
    id: number,
    status: ApplicationStatus,
    description: string,
    createdAt: string,
    developer: {
        id: number,
        firstName: string,
        lastName: string,
        user: {
            email: string,
        }
    }
};

export type CompanyApplication = {
    id: number,
    title: string,
    Application: application[],
};

export type DeveloperApplication = {
    id: number,
    description: string,
    status: ApplicationStatus,
    createdAt: string,
    offer: {
        id: number,
        title: string,
        company: {
            id: number,
            name: string,
        }
    }
};
