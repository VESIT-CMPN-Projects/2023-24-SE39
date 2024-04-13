document.addEventListener('DOMContentLoaded', function () {
    const legalCasesContainer = document.getElementById('legalCasesContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const sortByFilter = document.getElementById('sortByFilter');

    let originalCases; // To store the original cases for resetting

    // Fetch legal cases from JSON file
    fetch(prevCases)
        .then(response => response.json())
        .then(data => {
            originalCases = data;
            // Initial rendering
            renderLegalCases(data);

            // Event listeners
            searchButton.addEventListener('click', () => searchLegalCases(data));
            sortByFilter.addEventListener('change', () => sortLegalCases(data));
        })
        .catch(error => console.error('Error fetching data:', error));

    // Functions
    function renderLegalCases(cases) {
        legalCasesContainer.innerHTML = '';
        cases.forEach(legalCase => {
            const caseBox = document.createElement('div');
            const ifHeadlineNull = legalCase.expanded_headline;
            const ifAdditionalNUll = legalCase.additional_content;
            let content = ``;
            if(ifHeadlineNull!=null){
                content+=`<p>${legalCase.expanded_headline}</p>`;   
            }
            if(ifAdditionalNUll != null){
                content+=`<p>${legalCase.additional_content}</p>`;   
            }
            caseBox.classList.add('legalCaseBox');
            caseBox.innerHTML = `
            <h3>${legalCase.title}</h3>
            <div class="content">${content}</div>
            <button class="readMoreBtn">Read More</button>
            `;

            legalCasesContainer.appendChild(caseBox);
            const readMoreBtn = caseBox.querySelector('.readMoreBtn');
            readMoreBtn.addEventListener('click', () => toggleContentVisibility(caseBox));
        });
    }

    function searchLegalCases(cases) {
        const searchTerm = searchInput.value ? searchInput.value.toLowerCase() : '';
        
        console.log('Search Term:', searchTerm);
    
        const filteredCases = cases.filter(legalCase => {
            const titleMatch = legalCase.title && legalCase.title.toLowerCase().includes(searchTerm);
            const headlineMatch = legalCase.expanded_headline && legalCase.expanded_headline.toLowerCase().includes(searchTerm);
            const contentMatch = legalCase.additional_content && legalCase.additional_content.toLowerCase().includes(searchTerm);
    
            return titleMatch || headlineMatch || contentMatch;
        });
    
        console.log('Filtered Cases:', filteredCases);
    
        renderLegalCases(filteredCases);
    }
    
    
    function sortLegalCases(cases) {
        const sortBy = sortByFilter.value;
        let sortedCases;

        if (sortBy === 'asc') {
            sortedCases = [...cases].sort((a, b) => getYear(a.title) - getYear(b.title));
        } else if (sortBy === 'desc') {
            sortedCases = [...cases].sort((a, b) => getYear(b.title) - getYear(a.title));
        } else {
            sortedCases = cases;
        }

        renderLegalCases(sortedCases);
    }

    function getYear(title) {
        const yearMatch = title.match(/\b\d{4}\b/);
        return yearMatch ? parseInt(yearMatch[0]) : 0;
    }
    function toggleContentVisibility(caseBox) {
        const content = caseBox.querySelector('.content');
        const readMoreBtn = caseBox.querySelector('.readMoreBtn');

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            readMoreBtn.innerText = 'Read More';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            readMoreBtn.innerText = 'Read Less';
        }
    }
});