document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceElement = document.getElementById('total');
    const purchaseButton = document.querySelector('.purchase');
    
    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.getAttribute('data-price'));
            total += price;
        });
        totalPriceElement.innerText = total + '€';
    }

    function deleteItem(itemId) {
        const item = document.getElementById(itemId);
        item.remove();
        updateTotalPrice();
    }

    purchaseButton.addEventListener('click', function() {
        const selectedItems = [];
        document.querySelectorAll('.cart-item').forEach(item => {
            const id = item.id;
            selectedItems.push(id);
        });
        window.location.href = `bookings.html?trips=${JSON.stringify(selectedItems)}`;
    });

    updateTotalPrice();

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.closest('.cart-item').id;
            deleteItem(itemId);
        });
    });
});
