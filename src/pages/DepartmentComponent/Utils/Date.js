import {format, isValid, parse} from 'date-fns';


export const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return isValid(date) ? format(date, 'dd/MM/yyyy') : '';
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};
export const convertDateToISO = (dateString) => {
    try {
        const date = parse(dateString, 'dd/MM/yyyy', new Date());
        return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
    } catch (error) {
        console.error('Error converting date:', error);
        return '';
    }
};

