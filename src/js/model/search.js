require("@babel/polyfill");
import axios from 'axios';

export default class Search {

    constructor(query){
        this.query = query;
    }

    async doSearch(){
        try{
            let result = await axios('https://forkify-api.herokuapp.com/api/search?q='+this.query);
            return this.result = result.data.recipes;
            //result = await axios('https://forkify-api.herokuapp.com/api/get?rId='+recipes[1].recipe_id);
        }catch(error){
            console.log(error);
        }
    }
}