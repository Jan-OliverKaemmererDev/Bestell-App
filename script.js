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
        basketContainer.style.display = 'none';
    } else{
        basketContainer.style.display = 'block';
        renderBasketItems(contentSection);
        calculateTotals();
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
    basket = [];
    saveAndRefresh();
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
    menu.classList.toggle('active');
}

function toggleMobileBasket() {
    var basket = document.getElementById('basket-container');
    
    if (basket.classList.contains('show-mobile')) {
        basket.classList.remove('show-mobile');
        setTimeout(function() {
            basket.style.display = 'none';
        }, 300);
    } else {
        basket.style.display = 'block';
        setTimeout(function() {
            basket.classList.add('show-mobile');
        }, 10);
    }
}