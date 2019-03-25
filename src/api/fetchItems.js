import items from './mockItems';
import mockCategories from './mockCategories';

export const fetchItems = async () =>{
    return new Promise(resolve =>{
        resolve(items);
    });
};

export const fetchCategories = async ()=>{
    return new Promise(resolve =>{
        resolve(mockCategories);
    });
}