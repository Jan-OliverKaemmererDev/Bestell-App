function getMealTemplate(categoryIndex, mealIndex) {
    let meal = myMeals[categoryIndex].meals[mealIndex];
    let category = myMeals[categoryIndex].category;
    let basketIndex = findInBasket(meal.name);
    let imagePath = "./assets/meals/" + category + "/" + meal.name + ".jpg";
    
    return `
        <div class="meal-card">
            <div class="meal-main-content">
                ${getMealImageHtml(meal.name, imagePath)}
                <div class="meal-info">
                    <h3>${meal.name}</h3>
                    <p>${meal.description}</p>
                    <div class="price">${formatPrice(meal.price)}</div>
                </div>
            </div>
            <div class="meal-action-area">
                ${getButtonHtml(categoryIndex, mealIndex, basketIndex)}
            </div>
        </div>`;
}

function getMealImageHtml(name, path) {
    let mealClass = name.toLowerCase().replace(/\s+/g, '-');
    return `
        <div class="meal-image-container">
            <img src="${path}" alt="${name}" class="meal-img img-${mealClass}" 
                 onerror="this.src='./assets/img/logo02.svg'">
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
    let totalItemPrice = (item.price * item.amount).toFixed(2).replace('.', ',');

    return `
        <div class="basket-item">
            <div class="item-name-row">
                <span>${item.amount}x ${item.name}</span>
                <span>${totalItemPrice}€</span>
            </div>
            <div class="item-controls">
                ${getBasketControlsHtml(index, item.amount)}
            </div>
            ${getQuickDeleteHtml(index, item.amount)}
        </div>`;
}

function getBasketControlsHtml(index, amount) {
    let icon = amount > 1 ? '-' : '<img src="./assets/icons/delete-default.svg" class="trash-icon">';
    return `
        <button onclick="changeQuantity(${index}, -1)">${icon}</button>
        <span style="font-weight:bold;">${amount}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>`;
}

function getQuickDeleteHtml(index, amount) {
    if (amount <= 1) return '';
    return `
        <button class="quick-delete-btn" onclick="removeItemFromBasket(${index})">
            <img src="./assets/icons/delete-default.svg" class="trash-icon">
        </button>`;
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + '€';
}

function getEmptyBasketTemplate() {
    return `
    <div class="empty-basket-mobile">
        <p class="empty-title">Nothing here yet.</p>
        <p>Choose your favorite meals and order them here.</p><br>
        <img src="./assets/icons/shopping_cart.svg" alt="Empty Basket" class="empty-basket-icon">
    </div>`;
}