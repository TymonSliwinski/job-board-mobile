
// const filtersValues: Filters = {
//     text?: string,
//     category?: Category,
//     location?: string,
//     requirements?: string,
// }

import { Category } from "../types/Offer";


export const experience = {
    1: 'Nice to have',
    2: 'Junior',
    3: 'Regular',
    4: 'Senior',
    5: 'Master'
};

const filtersValues = {
    category: Object.values(Category),
    
};

export default filtersValues;
