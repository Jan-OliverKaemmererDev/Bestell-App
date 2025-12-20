function getMealTemplate(categoryIndex, mealIndex) {
    let meal = myMeals[categoryIndex].meals[mealIndex];
    let basketIndex = basket.findIndex(function(item) { return item.name === meal.name; });
    let buttonHtml = getButtonHtml(categoryIndex, mealIndex, basketIndex);
    
    return `
        <div class="meal-card">
            <div class="meal-description">
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>
                <p class="price">${meal.price.toFixed(2).replace('.', ',')}€</p>
            </div>
            ${buttonHtml}
        </div>`;
}

function getButtonHtml(catIdx, mealIdx, basketIdx) {
    if (basketIdx === -1) {
        return `<button onclick="addToBasket(${catIdx}, ${mealIdx})" class="add-btn">Add to basket</button>`;
    }
    return `
        <div class="added-badge">
            <span>Added ${basket[basketIdx].amount}</span>
            <button onclick="addToBasket(${catIdx}, ${mealIdx})" class="plus-btn">+</button>
        </div>`;
}

function getBasketItemTemplate(index) {
    let item = basket[index];
    let icon = item.amount > 1 ? '-' : '<img src="../assets/icons/delete-default.svg" class="trash-icon">';
    
    return `
        <div class="basket-item">
            <div class="item-info">
                <span>${item.amount}x ${item.name}</span>
                <span>${(item.price * item.amount).toFixed(2).replace('.', ',')}€</span>
            </div>
            <div class="item-controls">
                <button onclick="changeQuantity(${index}, -1)">${icon}</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        </div>`;
}