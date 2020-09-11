import { elements } from './base';
export const renderItem = item => {
    let html = ` <li class="shopping__item" data-itemid="${item.id}">
                <p class="shopping__description">${item.item}</p>
                <button class="shopping__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>`;
    elements.shoppingListDiv.insertAdjacentHTML('beforeend', html);
}

export const clearListRender = ()=>elements.shoppingListDiv.innerHTML = "";

export const deleteItem = id => {
    const deleteItem = document.querySelector(`[data-itemid="${id}"]`);
    deleteItem.parentElement.removeChild(deleteItem);
};