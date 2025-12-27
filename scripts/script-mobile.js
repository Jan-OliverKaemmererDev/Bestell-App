function openMobileBasket() {
    var basket = document.getElementById('basket-container');
    if (basket) {
        basket.style.display = 'block';
        setTimeout(function() {
            basket.classList.add('mobile-open');
        }, 10);
    }
}

function closeMobileBasket() {
    var basket = document.getElementById('basket-container');
    if (basket) {
        basket.classList.remove('mobile-open');
        
        setTimeout(function() {
            if (!basket.classList.contains('mobile-open')) {
            
                if (window.innerWidth <= 768) {
                    basket.style.display = 'none';
                }
            }
        }, 300);
    }
}