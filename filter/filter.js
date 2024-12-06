// js script for expanding the results section when clicked

const resultsDiv = document.querySelector('#results');
const resultsHeader = document.querySelector('.resultsHead');
const toolbar = document.querySelector('.toolbar')

toggleButtons();

// make the filter buttons not clickable if the results aren't expanded :D
function toggleButtons() {

    const buttons = document.querySelectorAll('.button');

    if (!resultsDiv.classList.contains('expanded')) {
        buttons.forEach((button) => {
            button.style.pointerEvents = 'none';
        })
    }
    else {
        buttons.forEach((button) => {
            button.style.pointerEvents = 'auto';
        })
    }
}

resultsHeader.addEventListener('click', () => {
    resultsDiv.classList.toggle('expanded');

    toggleButtons();
});

// ajax for showing cafe list

document.addEventListener("DOMContentLoaded", () => {
  
    fetch('fetch_cafes.php')
        .then(response => response.json())
        .then(cafes => {
            document.querySelector('.cafelist').innerHTML = '';
            
            cafes.forEach((cafe) => {
                const cafeDiv = document.createElement('div');
                cafeDiv.classList.add('cafe');

                const cafeImg = document.createElement('img');
                cafeImg.classList.add('cafeimg');
                cafeImg.src = "./assets/placeholder.jpg";
                cafeDiv.appendChild(cafeImg);

                const cafeName = document.createElement('h2');
                cafeName.classList.add('cafeName');
                cafeName.innerHTML = cafe.name;
                cafeDiv.appendChild(cafeName);

                const cafeRating = document.createElement('span');
                if (cafe.rating > 4.6) {
                    cafeRating.innerHTML = "☕☕☕☕☕ (" + cafe.rating + ")"
                } else {
                    cafeRating.innerHTML = "☕☕☕☕ (" + cafe.rating + ")"
                }
                cafeDiv.appendChild(cafeRating);

                const cafeLocation = document.createElement('p');
                cafeLocation.innerHTML = "📍 " + cafe.location.city;
                cafeDiv.appendChild(cafeLocation);

                const cafeDist = document.createElement('span');
                cafeDist.innerHTML = cafe.location.distance;
                cafeDiv.appendChild(cafeDist);

                document.querySelector('.cafelist').appendChild(cafeDiv);
            })
        })
});