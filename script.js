function init() {
    loadFromLocalStorage();
    renderMeals();
    updateBasketDisplay();
}

function renderMeals() {
    let content = document.getElementById('menu-container');
    content.innerHTML = '';
    for (let i = 0; i < myMeals.length; i++) {
        content.innerHTML += `<h2 class="category-title">${myMeals[i].category}</h2>`;
        for (let j = 0; j < myMeals[i].meals.length; j++) {
            content.innerHTML += getMealTemplate(i, j);
        }
    }
}

function findInBasket(name) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === name) {
            return i;
        }
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
        basket.splice(index, 1);
    }
    saveAndRefresh();
}

function saveAndRefresh() {
    saveToLocalStorage();
    renderMeals();
    updateBasketDisplay();
}

function updateBasketDisplay() {
    let container = document.getElementById('basket-container');
    let content = document.getElementById('baket-content');
    if (basket.length === 0) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'block';
    renderBasketItems(content);
    calculateTotals();
}

function renderBasketItems(content) {
    content.innerHTML = '';
    for (let i = 0; i < basket.length; i++) {
        content.innerHTML += getBasketItemTemplate(i);
    }
}

function calculateTotals() {
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        subtotal += (basket[i].price * basket[i].amount);
    }
    let total = subtotal + 4.99;
    document.getElementById('subtotal').innerText = subtotal.toFixed(2).replace('.', ',') + '€';
    document.getElementById('final-total').innerText = total.toFixed(2).replace('.', ',') + '€';
    document.getElementById('btn-total').innerText = total.toFixed(2).replace('.', ',') + '€';
    document.getElementById('order-btn').disabled = false;
}

function checkout() {
    basket = [];
    saveAndRefresh();
    showConfirmationMessage();
}

function showConfirmationMessage() {
    let msg = document.createElement('div');
    msg.className = 'order-message';
    msg.innerHTML = '<h3>Bestellung abgeschickt!</h3><p>Vielen Dank für Ihren Testkauf.</p>';
    document.body.appendChild(msg);
    setTimeout(function() { msg.remove(); }, 3000);
}

function saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function loadFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("basket"));
    if (data) {
        basket = data;
    }
}

function toggleMenu() {
    let menu = document.getElementById('side-menu');
    menu.classList.toggle('active');
}