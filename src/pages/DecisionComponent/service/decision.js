import axios from "axios";
 
export const addDecision = (decision) => {
    return axios.post('https://66b0477a6a693a95b5383ecc.mockapi.io/decision', decision)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error adding the decision!", error);
            throw error;
        });
};