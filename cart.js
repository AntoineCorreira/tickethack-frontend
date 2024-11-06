document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // Vérifie que le script est chargé

    const totalPriceElement = document.getElementById('total');
    const purchaseButton = document.querySelector('.purchase');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    function updateTotalPrice() {
        console.log('Updating total price'); // Vérifie que la fonction est appelée
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.getAttribute('data-price'));
            total += price;
        });
        totalPriceElement.innerText = total + '€';
    }

    function deleteItem(itemId) {
        console.log('Deleting item:', itemId); // Vérifie que la fonction est appelée
        const item = document.getElementById(itemId);
        item.remove();
        updateTotalPrice();
    }

    purchaseButton.addEventListener('click', function() {
        console.log('Purchase button clicked'); // Vérifie que le bouton est cliqué
        const selectedItems = [];
        document.querySelectorAll('.cart-item').forEach(item => {
            const id = item.id;
            selectedItems.push(id);
        });
        window.location.href = `bookings.html?trips=${JSON.stringify(selectedItems)}`;
    });

    // Attach delete event to buttons
    deleteButtons.forEach(button => {
        console.log('Attaching click event to delete button'); // Vérifie que l'événement est attaché
        button.addEventListener('click', function() {
            const itemId = this.closest('.cart-item').id;
            console.log('Delete button clicked for:', itemId); // Vérifie que le bouton delete est cliqué
            deleteItem(itemId);
        });
    });

    // Mise à jour initiale du prix total
    updateTotalPrice();
});
