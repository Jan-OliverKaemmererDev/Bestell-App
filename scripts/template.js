function getMealTemplate(categoryIndex, mealIndex) {
    let meal = myMeals[categoryIndex].meals[mealIndex];
    let category = myMeals[categoryIndex].category;
    let basketIndex = findInBasket(meal.name);
    let buttonArea = getButtonHtml(categoryIndex, mealIndex, basketIndex);

    let imagePath = `./assets/meals/${category}/${meal.name}.jpg`;
    let imageClass = "meal-img";
    let specialStyle = "";

    // Spezielle Logik für Pizza (alle nutzen das gleiche Bild pizza.jpg)
    if (meal.name === "Pizza Chorizo" || meal.name === "Funghi" || meal.name === "Quattro Formaggi with Chicken") {
        imagePath = `./assets/meals/Pizza (30cm)/pizza.jpg`;
        imageClass += " pizza-shift";
        
        if (meal.name === "Pizza Chorizo") specialStyle = "object-position: left;";
        if (meal.name === "Funghi") specialStyle = "object-position: center;";
        if (meal.name === "Quattro Formaggi with Chicken") specialStyle = "object-position: right;";
    }

    return `
        <div class="meal-card">
            <div class="meal-main-content">
                <div class="meal-image-container">
                    <img src="${imagePath}" alt="${meal.name}" class="${imageClass}" style="${specialStyle}" onerror="this.src='./assets/img/logo02.svg'">
                </div>
                <div class="meal-info">
                    <h3>${meal.name}</h3>
                    <p>${meal.description}</p>
                    <div class="price">${meal.price.toFixed(2).replace('.', ',')}€</div>
                </div>
            </div>
            <div class="meal-action-area">
                ${buttonArea}
            </div>
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
    let icon = item.amount > 1 ? '-' : '<img src="../assets/icons/delete-default.svg" class="trash-icon">';
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