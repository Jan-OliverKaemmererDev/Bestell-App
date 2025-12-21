function getMealTemplate(categoryIndex, mealIndex) {
    let meal = myMeals[categoryIndex].meals[mealIndex];
    let basketIndex = findInBasket(meal.name);
    let buttonArea = getButtonHtml(categoryIndex, mealIndex, basketIndex);
    return `
        <div class="meal-card">
            <div class="meal-info">
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>
                <div class="price">${meal.price.toFixed(2).replace('.', ',')}€</div>
            </div>
            ${buttonArea}
        </div>`;
}

function getButtonHtml(catIdx, mealIdx, basketIdx) {
    if (basketIdx === -1) {
        return `<button onclick="addToBasket(${catIdx}, ${mealIdx})" class="add-btn">Add to basket</button>`;
    }
    let amount = basket[basketIdx].amount;
    return `
        <div class="added-badge-container">
            <span class="added-badge">Added ${amount}</span>
            <button onclick="addToBasket(${catIdx}, ${mealIdx})" class="plus-btn-orange">+</button>
        </div>`;
}

function getBasketItemTemplate(index) {
    let item = basket[index];
    let icon = item.amount > 1 ? '-' : '<img src="./assets/icons/trash.png" class="trash-icon">';
    let totalItemPrice = (item.price * item.amount).toFixed(2).replace('.', ',');
    return `
        <div class="basket-item">
            <div class="item-name-row">
                <span>${item.amount}x ${item.name}</span>
                <span>${totalItemPrice}€</span>
            </div>
            <div class="item-controls">
                <button onclick="changeQuantity(${index}, -1)">${icon}</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        </div>`;
}