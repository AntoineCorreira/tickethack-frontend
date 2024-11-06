document.querySelector("#Search").addEventListener('click', function () {
    const trip = {
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value,
        date: document.querySelector('#date').value,
    }
    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(trip)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.result) {
            let tripsHTML = '';
            for (let i=0; i < data.trips.length; i++) {
                const date = new Date(data.trips[i].date)
                tripsHTML += `
                <div class="tripsContainer">
                    <div class='trip'>${data.trips[i].departure} > ${data.trips[i].arrival}</div>
                    <div class='time'>${date.getHours().toString().padStart(2,0)}:${date.getMinutes().toString().padStart(2,0)}</div>
                    <div class='price'>${data.trips[i].price}€</div>
                    <div class="bookBtnContainer"><button class="book" type="submit">Book</button></div>
                </div>
                `;
            }
            document.querySelector('#resultContainer').innerHTML = tripsHTML;

            document.querySelectorAll('.book').forEach(book => {
                book.addEventListener('click', (store) => {
                    const tripId = store.target.getAttribute('trip-id');
                    localStorage.setItem("selectedTrip", tripId);
                    window.location.href = "cart.hmtl"
                })
            });
        } else if (!data.result) {
            document.querySelector('#resultMessageContainer p').textContent = data.error;
            document.querySelector('#imgContainer').innerHTML = `<img src="./images/notfound.png">`
        }
    })
})
