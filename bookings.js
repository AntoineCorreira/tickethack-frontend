document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Fonction pour calculer le temps restant jusqu'au départ
    function getTimeRemaining(departureTime) {
        const now = new Date();
        const departure = new Date(departureTime);
        const timeDifference = departure - now;

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return timeDifference > 0 ? `${hours} hours and ${minutes} minutes` : `Departed`;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const tripsParam = urlParams.get('trips');
    console.log('Encoded Trips Param:', tripsParam);

    if (tripsParam) {
        const trips = JSON.parse(decodeURIComponent(tripsParam));
        const selectedTripsElement = document.getElementById('selected-trips');
        const totalPriceElement = document.getElementById('total-price');

        if (selectedTripsElement && totalPriceElement) {
            selectedTripsElement.innerHTML = '';
            totalPriceElement.innerText = '0€';

            let totalPrice = 0;

            trips.forEach(trip => {
                if (trip.details && trip.time && trip.price && parseFloat(trip.price) > 0) {
                    const departureTime = `2024-11-06T${trip.time}:00`;
                    const timeRemaining = getTimeRemaining(departureTime);

                    const bookingInfoElement = document.createElement('div');
                    bookingInfoElement.className = 'booking-info';
                    bookingInfoElement.innerHTML = `
                        <span class="route">${trip.details}</span>
                        <span class="time">${trip.time}</span>
                        <span class="price">${trip.price}€</span>
                        <span class="departure-time">Departure in ${timeRemaining}</span>
                    `;
                    selectedTripsElement.appendChild(bookingInfoElement);

                    totalPrice += parseFloat(trip.price);
                    console.log('Current Total Price:', totalPrice);
                } else {
                    console.log('Ignoring trip with incomplete or invalid data:', trip);
                }
            });

            totalPriceElement.innerText = `${totalPrice}€`;
            console.log('Final Total Price:', totalPrice);
        } else {
            console.error('Element with ID "selected-trips" or "total-price" not found');
        }
    } else {
        console.error('No trips parameter found');
    }
});
