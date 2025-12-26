function toggleMobileBasket() {
    let basketContainer = document.getElementById('basket-container');
    if (basketContainer) {
        basketContainer.classList.toggle('mobile-open');
    }
}

function updateMobileBadge() {
    let badge = document.getElementById('mobile-basket-badge');
    if (!badge) return;

    let totalItems = 0;
    for (let i = 0; i < basket.length; i++) {
        totalItems += basket[i].amount;
    }

    if (totalItems > 0) {
        badge.innerText = totalItems;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
        // Wenn leer, schließe den mobilen Warenkorb automatisch
        let basketContainer = document.getElementById('basket-container');
        if (basketContainer) basketContainer.classList.remove('mobile-open');
    }
}