import { elements} from './base';
export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};

export const clearSearch = () =>{elements.searchInput.value = '';}
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.pageButtons.innerHTML = '';
}
export const renderRecipes = (recipes, page = 1, resPerPage = 5) => {

    const start = (page - 1) * resPerPage;
    const end = page *resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, Math.ceil(recipes.length /resPerPage))
};

const createBbutton = (page, type, dir) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
                                                <span>Хуудас ${page}</span>
                                                    <svg class="search__icon">
                                                        <use href="img/icons.svg#icon-triangle-${dir}"></use>
                                                    </svg>
                                                </button>
                                            `;

const renderButtons = (page, totalPages)=>{
    let button;

    if(page === 1 && totalPages > 1){
        button = createBbutton(2, 'next', 'rigth');
    } else if(page < totalPages) {
        button = createBbutton(page -1, 'prev', 'left'),
        button += createBbutton(page +1, 'next', 'rigth');
    } else if(page === totalPages ){
        button = createBbutton(page-1, 'prev', 'left');
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', button);
};

