
//
import axios from "axios";

const API_LIABILITY = "https://66b2f5cb7fba54a5b7eaec0b.mockapi.io/list_debt";


export const fetch_ListLiability =async () =>{
    try{
        const response = await axios.get(API_LIABILITY);
        return response.data;
    }catch (e){
        console.log("error",e);
    }
}
export const get_LiabilityById = async (id)=>{
    try{
        const response = await axios.get(`${API_LIABILITY}/${id}`);
        console.log("data",response);
        return response.data;
    }catch (e){
        console.log("error",e);
    }
}