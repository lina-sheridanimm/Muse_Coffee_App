const resultsDiv = document.querySelector('#results');
const resultsHeader = document.querySelector('.resultsHead');
const toolbar = document.querySelector('.toolbar')

resultsHeader.addEventListener('click', () => {
    resultsDiv.classList.toggle('expanded');
});
