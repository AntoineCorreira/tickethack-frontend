document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // Vérifie que le script est chargé

    const totalPriceElement = document.getElementById('total');
    const purchaseButton = document.querySelector('.purchase');

    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.getAttribute('data-price'));
            total += price;
        });
        console.log('Total Price Updated:', total); // Ajout de log
        totalPriceElement.innerText = total.toFixed(2) + '€';
    }

    function deleteItem(itemId) {
        const item = document.getElementById(itemId);
        if (item) {
            item.remove();
            console.log('Item Removed:', itemId); // Ajout de log
            updateTotalPrice();
        }
    }

    purchaseButton.addEventListener('click', function() {
        const selectedItems = [];
        document.querySelectorAll('.cart-item').forEach(item => {
            const id = item.id;
            const price = item.getAttribute('data-price');
            const detailsElement = item.querySelector('.details');
            const timeElement = item.querySelector('.time');

            if (detailsElement && timeElement) { // Vérifie que les éléments existent
                const details = detailsElement.innerText;
                const time = timeElement.innerText;

                selectedItems.push({ id, price, details, time });
            } else {
                console.error('Details or time element not found for item:', id);
            }
        });

        console.log('Selected Items:', selectedItems); // Ajout de log

        // Vérification si le panier est vide
        if (selectedItems.length === 0) {
            window.location.href = 'noticket.html'; // Redirection vers la page "No Tickets in your cart"
        } else {
            // Redirection vers bookings.html avec les données des trajets
            window.location.href = `bookings.html?trips=${encodeURIComponent(JSON.stringify(selectedItems))}`;
        }
    });

    // Attacher l'événement de suppression aux boutons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.closest('.cart-item').id;
            deleteItem(itemId);
        });
    });

    // Mise à jour initiale du prix total
    updateTotalPrice();
});
