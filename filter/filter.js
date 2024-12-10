// js script for expanding the results section when clicked

const resultsDiv = document.querySelector('#results');
const resultsHeader = document.querySelector('.resultsHead');
const toolbar = document.querySelector('.toolbar')
const profilepic = document.querySelector(".profileImg");

// get profile photo for the logged in user
document.addEventListener('DOMContentLoaded', () => {
    fetch('fetch_profilepic.php')
        .then(response => response.json())
        .then(data => {
            profilepic.src = `../profile/assets/users/${data.portrait_image}`;
        })
})

toggleButtons();

// make the filter buttons not clickable if the results aren't expanded :D
function toggleButtons() {

    const buttons = document.querySelectorAll('.filterButton');

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

function listCafes(filter = null) {
    
    fetch('fetch_cafes.php')
        .then(response => response.json())
        .then(cafes => {

            if (filter) {
                cafes = cafes.filter(filter);
            }

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
}

// showing cafe list

document.addEventListener("DOMContentLoaded", () => {
  
    listCafes();
});


// function to handle toggle of the filters
let currentFilter = null;

function toggleFilter(filter, buttonId) {

    const button = document.querySelector(`#${buttonId}`)
    const allButtons = document.querySelectorAll(".filterButton");

    if (currentFilter === filter) {
        listCafes();
        currentFilter = null;
        allButtons.forEach(btn => btn.classList.remove("active"));
    }
    else {
        listCafes(filter);
        currentFilter = filter;
        // remove active from all buttons to ensure one is highlighted at a time
        allButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active"); // only highlight the active button
    }

    allButtons.forEach(btn => (btn.style.pointerEvents = "auto"));
}

// filter options for the predefined buttons 

function highestRatedCafes(cafe) {
    return cafe.rating > 4.6;
}

document.querySelector("#toprated").addEventListener("click", () => {
    toggleFilter(highestRatedCafes, "toprated");
})

function offersTakeout(cafe) {
    return cafe.amenities.includes('Offers Takeout');
}

document.querySelector("#takeout").addEventListener("click", () => {
    toggleFilter(offersTakeout, "takeout");
})

function nonCoffeeOptions(cafe) {
    return cafe.drinks.includes('Non-coffee Options')
}

document.querySelector("#noncoffee").addEventListener("click", () => {
    toggleFilter(nonCoffeeOptions, "noncoffee")
})

// handling filter menu
const filterMenu = document.querySelector("#filters");

// helper function to collect all the selected filter values
function collectFilters() {
    let filters = {
        distance: document.querySelector('input[name="distance"]:checked')?.value,
        ambience: document.querySelector('input[name="ambience"]:checked')?.value,
        meals: Array.from(document.querySelectorAll('input[name="meal"]:checked')).map(input => input.value),
        drinks: Array.from(document.querySelectorAll('input[name="drink"]:checked')).map(input => input.value),
        goodFor: Array.from(document.querySelectorAll('input[name="goodfor"]:checked')).map(input => input.value),
        amenities: Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(input => input.value)
    };

    return filters;
}

// function for checking the filters based on user input
function filterCafes(cafe, filters) {
    if (filters.distance && filters.distance !== 'anydistance' && cafe.location.distance !== filters.distance) {
        return false;
    }

    if (filters.ambience && cafe.ambience !== filters.ambience) {
        return false; 
    }

    if (filters.meals.length > 0 && !filters.meals.every(meal => cafe.meals.includes(meal))) {
        return false; 
    }

    if (filters.drinks.length > 0 && !filters.drinks.every(drink => cafe.drinks.includes(drink))) {
        return false;
    }

    if (filters.goodFor.length > 0 && !filters.goodFor.every(goodFor => cafe.good_for.includes(goodFor))) {
        return false;
    }

    if (filters.amenities.length > 0 && !filters.amenities.every(amenity => cafe.amenities.includes(amenity))) {
        return false;
    }

    return true;
}

// List cafes based on multiple filters :') tried to reuse the previous function but the logic got too complicated :')
function listCafesMultiple() {
    fetch('fetch_cafes.php')
        .then(response => response.json())
        .then(cafes => {
            let filters = collectFilters();

            let filteredCafes = cafes.filter(cafe => filterCafes(cafe, filters));

            const cafeListContainer = document.querySelector('.cafelist');
            cafeListContainer.innerHTML = '';

            if (filteredCafes.length === 0) {
                const message = document.createElement('div');
                message.classList.add('noresult');
                message.innerHTML = "No cafes found matching your filters ☹";
                cafeListContainer.appendChild(message);
            }
            else {
                filteredCafes.forEach((cafe) => {
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
            }
        });
}

//toggle sort by 
function toggleSortBy() {

    const button = document.querySelector('#sortby');

    document.querySelectorAll(".filterButton").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active")
}

document.querySelector("#filterButton").addEventListener("click", (event) => {
    event.preventDefault(); 

    if (!resultsDiv.classList.contains('expanded')) {
        resultsDiv.classList.add('expanded');
    }

    listCafesMultiple(); 

    filterMenu.classList.remove("active");
    toggleSortBy();
    toggleButtons();
});

document.querySelector("#sortby").addEventListener("click", () => {
    filterMenu.classList.toggle("active");
})

document.querySelector("#closefilter").addEventListener("click", () => {
    filterMenu.classList.remove("active");
})

// revert filter options

function resetFilters() {
    const filterForm = document.querySelector("#filters");

    const radioButtons = filterForm.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
        radio.checked = false;
    });

    const checkboxes = filterForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    })

    filterMenu.classList.remove('active');
    listCafes();
}

document.querySelector("#revertfilter").addEventListener("click", () => {
    document.querySelector("#sortby").classList.remove("active");
    resetFilters();
})