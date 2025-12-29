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
    let totalsContainer = document.getElementById('basket-totals-container');

    updateMobileBadge();

    if (basket.length === 0) {
        basketContainer.classList.remove('show-mobile');
        if (totalsContainer) {
            totalsContainer.style.display = 'none';
        }

        if (window.innerWidth <= 768) {
            renderEmptyMobileBasket(contentSection);
            basketContainer.style.display = 'none'; 
            basketContainer.classList.add('no-scroll');
        } else {
            basketContainer.style.display = 'none';
        }
    } else {
        basketContainer.classList.remove('no-scroll');
        if (totalsContainer) {
            totalsContainer.style.display = 'block';
        }

        if (window.innerWidth <= 768) {
            basketContainer.style.display = basketContainer.classList.contains('show-mobile') ? 'block' : 'none';
        } else {
            basketContainer.style.display = 'block';
        }

        renderBasketItems(contentSection);
        calculateTotals();
    }
}

function renderEmptyMobileBasket(container) {
    container.innerHTML = `
        <div class="empty-basket-mobile">
            <p class="empty-title">Nothing here yet.</p>
            <p class="empty-subtitle">Go ahead and choose something delicious!</p>
            <img src="./assets/icons/shopping_cart.svg" alt="Empty Basket" class="empty-basket-icon">
        </div>
    `;
    document.getElementById('basket-totals-container').style.display = 'none';
}

function updateMobileBadge() {
    var totalAmount = 0;
    var badge = document.getElementById('nav-cart-count');
    for (var i = 0; i < basket.length; i++) {
        totalAmount += basket[i].amount;
    }

    if (badge) {
        badge.innerText = totalAmount;
        if (totalAmount > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
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
    let basketContainer = document.getElementById('basket-container');
    
    if (basketContainer.classList.contains('show-mobile')) {
        basketContainer.classList.remove('show-mobile');
        setTimeout(function() {
            basketContainer.style.display = 'none';
        }, 300);
    } else {
        basketContainer.style.display = 'block';
        setTimeout(function() {
            basketContainer.classList.add('show-mobile');
        }, 10);
    }
}