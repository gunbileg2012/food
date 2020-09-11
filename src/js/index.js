require("@babel/polyfill");
import Search from './model/search';
import {elements, renderLoader, clearLoader} from './view/base';
import * as SearchView from './view/searchView';
import Recipe from './model/Recipe';
import {renderRecipe, clearRecipe, highlightSelectedRecipe} from './view/recipeView';
import List from './model/List';

/*
     WEB APP төлөв
     - Хайлтын query үр дүн гаргах
     - Тухайн үзүүлж байгаа жор
     - Лайкласан жорууд
*/

    const state = {};

    const controlSearch = async () =>{
        
        // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
        const query = SearchView.getInput();
        // 2) Шинээр хайлтан обьектийг үүсгэж өгнө

        if(query){
            state.search = new Search(query);
            // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
            SearchView.clearSearch();
            SearchView.clearSearchResult();
            renderLoader(elements.searchResultsDiv);
            // 4) Хайлтыг гүйцэтгэнэ
            await state.search.doSearch();
       
            // 5) Хайтлын үр дүнг дэлгэцэнд харуулна
            clearLoader();
            if(state.search.result === undefined) return alert('Хайлтад тохирох илэрц байхгүй');
            else SearchView.renderRecipes(state.search.result);
           // console.log(state.search.result);
        }
        
    };

    elements.searchForm.addEventListener('submit', e=>{
        e.preventDefault();
        controlSearch();     
    });

    elements.pageButtons.addEventListener("click", e=>{
        const btn = e.target.closest('.btn-inline');
        if(btn){
            SearchView.clearSearchResult(); 
            let page = parseInt(btn.dataset.goto);
            SearchView.renderRecipes(state.search.result, page);
        }
    });

    const controlRecipe = async () =>{

        // 1) URL - аас ID салгаж авна
        const id = window.location.hash.replace('#','');
        if(!id){return false;}
        state.recipe = new Recipe(id);
        clearRecipe();
        renderLoader(elements.recipeDiv);
        highlightSelectedRecipe(id);
        // 2) Жорын моделийг үүсгэж өгнө
        await state.recipe.getRecipe();
        // 3) UI дэлцэгийн бэлгэнэ

        // 5) Жорыг гүйцэтгэх хугацаа болно орцыг тодорхойлно
        state.recipe.calcTime(state.recipe);
        state.recipe.calcHumanCount(state.recipe);
        // 6) Жороо дэлгэцэнд харуулна
        renderRecipe(state.recipe);
        console.log(state);
    }

    //window.addEventListener("load", controlRecipe);
   // window.addEventListener("hashchange", controlRecipe);
    ['load', 'hashchange'].forEach(event=>  window.addEventListener(event, controlRecipe));

    
    elements.recipeDiv.addEventListener("click", e=>{
       if(e.target.matches('.recipe__btn, .recipe__btn, *')){
           console.log('btn');
       }
    });