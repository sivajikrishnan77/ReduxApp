import api from './client';

export const getProducts = async () =>{
    try{
        const response = await api.get('/products');
        return response.data.products;
    }catch(error){
        console.log("Product API error:",error);
        throw error;
    }
};

