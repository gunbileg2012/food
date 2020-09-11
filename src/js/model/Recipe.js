import axios from "axios";

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            let result = await axios('https://forkify-api.herokuapp.com/api/get?rId='+this.id);
            this.publisher = result.data.recipe.publisher;
            this.ingredients = result.data.recipe.ingredients;
            this.image_url = result.data.recipe.image_url;
            this.recipe_id = result.data.recipe.recipe_id;
            this.social_rank = result.data.recipe.social_rank;
            this.title = result.data.recipe.title;
            this.source_url = result.data.recipe.source_url;
           // return this.result = result.data.recipes;
        }catch(error){
            console.log(error);
        }
    }

    calcTime(){

        // Найрлага бүрт ойролцоогоор 5 минут зарцуулна
        this.time = this.ingredients.length * 5;
    }

    calcHumanCount(){
        this.HumanNumber = 4;

    }
}