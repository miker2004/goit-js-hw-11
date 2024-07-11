import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("searchButton");
    const gallery = document.getElementById("gallery");
    const loader = document.querySelector('.loader');

    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();
        loader.style.opacity = 1; 

        const q = searchBar.value.trim();
        if (q === '') {
            iziToast.show({
                title: 'Input Required',
                message: 'Please enter a search term.',
                color: 'yellow'
            });
            loader.style.opacity = 0; 
            return;
        }

        const orientation = "horizontal";
        const safesearch = "true";
        const apiKey = "44886630-c76369955f218994c10c946a0";

        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(q)}&image_type=photo&orientation=${orientation}&safesearch=${safesearch}`;

        try {
            loader.style.display = 'block'; // Pokaż loader

            const response = await fetch(url);
            const data = await response.json();

            if (data.hits.length === 0) {
                iziToast.show({
                    title: 'No results',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    color: 'white'
                });
            } else {
                displayImages(data.hits);
            }

            searchBar.value = ''; 
        } catch (error) {
            console.error('Error fetching data:', error);
            iziToast.show({
                title: 'Error',
                message: 'Failed to fetch images. Please try again later.',
                color: 'red'
            });
        } finally {
            loader.style.display = 'none';
            loader.style.opacity = 0; 
        }
    });

    function displayImages(images) {
        gallery.innerHTML = '';
        images.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.classList.add('image-card');
            imageCard.innerHTML = `
                <a href="${image.largeImageURL}" class="gallery-link">
                    <img src="${image.webformatURL}" alt="${image.tags}">
                </a>
                <div class="image-info">
                    <p><strong>Likes:</strong> ${image.likes}</p>
                    <p><strong>Views:</strong> ${image.views}</p>
                    <p><strong>Comments:</strong> ${image.comments}</p>
                    <p><strong>Downloads:</strong> ${image.downloads}</p>
                </div>
            `;
            gallery.appendChild(imageCard);
        });

        new SimpleLightbox('.gallery-link');
    }
});