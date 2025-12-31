function getMealTemplate(categoryIndex, mealIndex) {
    const meal = myMeals[categoryIndex].meals[mealIndex];
    const basketIndex = findInBasket(meal.name);
    const { imagePath, specialStyle } = getMealImageSettings(meal.name, myMeals[categoryIndex].category);

    return `
        <div class="meal-card">
            <div class="meal-main-content">
                <div class="meal-image-container">
                    <img src="${imagePath}" alt="${meal.name}" class="meal-img img-${meal.name.toLowerCase().replace(/\s+/g, '-')}" style="${specialStyle}" onerror="this.src='./assets/img/logo02.svg'">
                </div>
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

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + '€';
}

function getMealImageSettings(mealName, category) {
    let imagePath = `./assets/meals/${category}/${mealName}.jpg`;
    let specialStyle = "";

    if (["Pizza Chorizo", "Funghi", "Quattro Formaggi with Chicken"].includes(mealName)) {
        imagePath = `./assets/meals/Pizza (30cm)/pizza.jpg`;
        if (mealName === "Pizza Chorizo") specialStyle = "object-position: left;";
        if (mealName === "Funghi") specialStyle = "object-position: center;";
        if (mealName === "Quattro Formaggi with Chicken") specialStyle = "object-position: right;";
    }
    return { imagePath, specialStyle };
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
    let icon = item.amount > 1 ? '-' : '<img src="./assets/icons/delete-default.svg" class="trash-icon">';
    let totalItemPrice = (item.price * item.amount).toFixed(2).replace('.', ',');
    return `
        <div class="basket-item">
            <div class="item-name-row">
                <span>${item.amount}x ${item.name}</span>
                <span>${totalItemPrice}€</span>
            </div>
            <div class="item-controls">
                <button onclick="changeQuantity(${index}, -1)">${icon}</button>
                <span style="font-weight:bold;">${item.amount}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        </div>`;
}