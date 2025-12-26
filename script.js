function init() {
    loadFromLocalStorage();
    renderMeals();
    updateBasketDisplay();
}

function renderMeals() {
    const containers = {
        'Burgers': document.getElementById('burger-items'),
        'Pizza': document.getElementById('pizza-items'),
        'Salads': document.getElementById('salad-items')
    };

    const values = Object.values(containers);
    for (let i = 0; i < values.length; i++) {
        let div = values[i];
        if (div) {
            div.innerHTML = '';
        }
    }

    for (let i = 0; i < myMeals.length; i++) {
        let categoryName = myMeals[i].category;
        
        let targetId = '';
        if(categoryName.includes('Burger')) targetId = 'burger-items';
        if(categoryName.includes('Pizza')) targetId = 'pizza-items';
        if(categoryName.includes('Salad')) targetId = 'salad-items';

        let container = document.getElementById(targetId);
        
        if (container) {
            for (let j = 0; j < myMeals[i].meals.length; j++) {
                container.innerHTML += getMealTemplate(i, j);
            }
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
    if (!basket[index]) return;

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
    let basketContainer = document.getElementById('basket-container');
    let contentSection = document.getElementById('basket-content');

    if (basket.length === 0) {
        // 1. Desktop-Ansicht: Warenkorb komplett ausblenden
        if (window.innerWidth > 768) {
            basketContainer.style.display = 'none';
        }
        
        // 2. Inhalt leeren (wichtig für die mobile Ansicht, falls sie noch offen ist)
        contentSection.innerHTML = '<p class="empty-msg">Your basket is empty!</p>';
        
        // 3. Totale Werte auf 0 setzen oder Bereich ausblenden
        document.getElementById('subtotal').innerText = '0,00€';
        document.getElementById('final-total').innerText = '0,00€';
    } else {
        // Warenkorb anzeigen und befüllen
        basketContainer.style.display = 'block';
        renderBasketItems(contentSection);
        calculateTotals();
    }

    // Mobile Badge aktualisieren
    if (typeof updateMobileBadge === 'function') {
        updateMobileBadge();
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
    let deliveryFee = 4.99;
    let total = subtotal + deliveryFee;

    document.getElementById('subtotal').innerText = formatPrice(subtotal);
    document.getElementById('final-total').innerText = formatPrice(total);
    document.getElementById('btn-total').innerText = formatPrice(total);
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + '€';
}

function checkout() {
    if (basket.length === 0) return;
    basket = [];

    saveAndRefresh();

    if (typeof toggleMobileBasket === 'function') {
        let basketContainer = document.getElementById('basket-container');
        if (basketContainer && basketContainer.classList.contains('mobile-open')) {
            toggleMobileBasket();
        }
    }

    showConfirmationMessage();
}

function showConfirmationMessage() {
    let overlay = document.getElementById('message-overlay');
    let msg = document.getElementById('order-confirmation');

    overlay.style.display = 'block';
    msg.style.display = 'block';

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
    if (data) {
        basket = data;
    }
}

function toggleMenu() {
    let menu = document.getElementById('side-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}