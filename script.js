function init() {
    loadFromLocalStorage();
    renderMeals();
    updateBasketDisplay();
}

function renderMeals() {
    clearMealContainers();
    for (let i = 0; i < myMeals.length; i++) {
        renderCategoryMeals(i);
    }
}

function clearMealContainers() {
    let ids = ['burger-items', 'pizza-items', 'salad-items'];
    for (let i = 0; i < ids.length; i++) {
        let element = document.getElementById(ids[i]);
        if (element) {
            element.innerHTML = '';
        }
    }
}

function renderCategoryMeals(catIdx) {
    let categoryName = myMeals[catIdx].category;
    let targetId = getTargetId(categoryName);
    let container = document.getElementById(targetId);
    
    if (container) {
        for (let j = 0; j < myMeals[catIdx].meals.length; j++) {
            container.innerHTML += getMealTemplate(catIdx, j);
        }
    }
}

function getTargetId(categoryName) {
    if (categoryName.includes('Burger')) return 'burger-items';
    if (categoryName.includes('Pizza')) return 'pizza-items';
    if (categoryName.includes('Salad')) return 'salad-items';
    return '';
}

function findInBasket(name) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === name) return i;
    }
    return -1;
}

function addToBasket(catIdx, mealIdx) {
    let meal = myMeals[catIdx].meals[mealIdx];
    let index = findInBasket(meal.name);
    if (index === -1) {
        basket.push({ "name": meal.name, "price": meal.price, "amount": 1 });
    } else {
        basket[index].amount++;
    }
    saveAndRefresh();
}

function changeQuantity(index, change) {
    basket[index].amount += change;
    if (basket[index].amount <= 0) {
        removeItemFromBasket(index);
    } else {
        saveAndRefresh();
    }
}

function removeItemFromBasket(index) {
    basket.splice(index, 1);
    if (basket.length === 0) {
        let container = document.getElementById('basket-container');
        if (container) {
            container.classList.remove('show-mobile');
        }
    }
    saveAndRefresh();
}

function saveAndRefresh() {
    saveToLocalStorage();
    renderMeals();
    updateBasketDisplay();
}

function updateBasketDisplay() {
    let basketContainer = document.getElementById('basket-container');
    let isMobileOpen = basketContainer.classList.contains('show-mobile');
    updateBasketIconStyle(isMobileOpen);
    updateMobileBadge();
    renderBasketContentLogic();
    handleResponsiveBasket(basketContainer, isMobileOpen);
}

function updateBasketIconStyle(isMobileOpen) {
    let basketIcon = document.querySelector('.basket-nav img');
    if (basketIcon) {
        basketIcon.style.filter = isMobileOpen 
            ? "invert(53%) sepia(88%) saturate(1518%) hue-rotate(345deg) brightness(96%) contrast(92%)" 
            : "none";
    }
}

function renderBasketContentLogic() {
    let contentSection = document.getElementById('basket-content');
    let totalsContainer = document.getElementById('basket-totals-container');
    if (basket.length === 0) {
        renderEmptyMobileBasket(contentSection);
        if (totalsContainer) totalsContainer.style.display = 'none';
    } else {
        renderBasketItems(contentSection);
        calculateTotals();
        if (totalsContainer) totalsContainer.style.display = 'block';
    }
}

function handleResponsiveBasket(container, isMobileOpen) {
    if (window.innerWidth <= 768) {
        container.style.display = isMobileOpen ? 'block' : 'none';
        if (isMobileOpen) {
            container.classList.add('no-scroll');
        } else {
            container.classList.remove('no-scroll');
        }
    } else {
        container.style.display = (basket.length > 0) ? 'block' : 'none';
        container.classList.remove('no-scroll');
    }
}

function renderEmptyMobileBasket(contentSection) {
    contentSection.innerHTML = getEmptyBasketTemplate();
}

function updateMobileBadge() {
    let totalAmount = 0;
    let badge = document.getElementById('nav-cart-count');
    for (let i = 0; i < basket.length; i++) {
        totalAmount += basket[i].amount;
    }
    if (badge) {
        badge.innerText = totalAmount;
        badge.style.display = totalAmount > 0 ? 'flex' : 'none';
    }
}

function renderBasketItems(container) {
    container.innerHTML = '';
    for (let i = 0; i < basket.length; i++) {
        container.innerHTML += getBasketItemTemplate(i);
    }
}

function calculateTotals() {
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        subtotal += (basket[i].price * basket[i].amount);
    }
    let total = subtotal + 4.99;
    document.getElementById('subtotal').innerText = formatPrice(subtotal);
    document.getElementById('final-total').innerText = formatPrice(total);
    document.getElementById('btn-total').innerText = formatPrice(total);
}

function checkout() {
    if (basket.length === 0) return;
    basket = [];
    document.getElementById('basket-container').classList.remove('show-mobile');
    saveAndRefresh();
    showConfirmationMessage();
}

function showConfirmationMessage() {
    document.getElementById('message-overlay').style.display = 'block';
    document.getElementById('order-confirmation').style.display = 'block';
    setTimeout(closeConfirmation, 4000);
}

function closeConfirmation() {
    let overlay = document.getElementById('message-overlay');
    let msg = document.getElementById('order-confirmation');
    if (overlay) overlay.style.display = 'none';
    if (msg) msg.style.display = 'none';
}

function saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function loadFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("basket"));
    if (data) basket = data;
}

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('active');
}

function toggleMobileBasket() {
    document.getElementById('basket-container').classList.toggle('show-mobile');
    updateBasketDisplay();
}