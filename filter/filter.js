// js script for expanding the results section when clicked

const resultsDiv = document.querySelector('#results');
const resultsHeader = document.querySelector('.resultsHead');
const toolbar = document.querySelector('.toolbar')

resultsHeader.addEventListener('click', () => {
    resultsDiv.classList.toggle('expanded');
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

                const cafeName = document.createElement('h2');
                cafeName.textContent = cafe;

                cafeDiv.appendChild(cafeName);

                document.querySelector('.cafelist').appendChild(cafeImg);
                document.querySelector('.cafelist').appendChild(cafeDiv);
            })
        })
});