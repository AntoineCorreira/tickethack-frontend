function deleteItem(itemId) {
    const itemContainer = document.getElementById(itemId);
    if (itemContainer) {
        itemContainer.remove();
        updateTotal();
    }
}

function updateTotal() {
    const item1Price = document.getElementById('price1') ? parseInt(document.getElementById('price1').innerText.replace('€', '')) : 0;
    const item2Price = document.getElementById('price2') ? parseInt(document.getElementById('price2').innerText.replace('€', '')) : 0;
}