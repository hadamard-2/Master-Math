document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/unlocked_modules')
        .then(response => response.json())
        .then(data => {
            console.log('Unlocked Modules:', data.modules);
        })
        .catch(error => console.error('Error:', error));
});


const modules = {
    "Grade 9": [
        "Further on Sets",
        "The Number System",
        "Solving Equations",
        "Solving Inequalities",
        "Introduction to Trigonometry",
        "Regular Polygons",
        "Congruency and Similarity",
        "Vectors in Two Dimensions",
        "Statistics and Probability"
    ],
    "Grade 10": [
        "Relations and Functions",
        "Polynomials Functions",
        "Exponential and Logarithmic Functions",
        "Trigonometric Functions",
        "Circles",
        "Solid Figures",
        "Coordinate Geometry"
    ],
    "Grade 11": [
        "Relations and Functions",
        "Rational Expressions and Rational Functions",
        "Matrices",
        "Determinants and Their Properties",
        "Vectors",
        "Transformations of the Plane",
        "Statistics",
        "Probability"
    ],
    "Grade 12": [
        "Sequences and Series",
        "Introduction to Calculus",
        "Statistics",
        "Introduction to Linear Programming",
        "Mathematical Applications in Business"
    ]
};

const brightColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#82E0AA',
    '#F1948A', '#85C1E9', '#F8C471', '#73C6B6'
];

function getRandomBrightColor() {
    return brightColors[Math.floor(Math.random() * brightColors.length)];
}

function renderTabs() {
    const tabNav = document.getElementById('tabNav');
    const tabContent = document.getElementById('tabContent');

    Object.keys(modules).forEach((grade, index) => {
        // Create tab button
        const tabButton = document.createElement('button');
        tabButton.textContent = grade;
        tabButton.addEventListener('click', () => activateTab(grade));
        tabNav.appendChild(tabButton);

        // Create tab content
        const tabPane = document.createElement('div');
        tabPane.className = 'tab-content';
        tabPane.id = grade.replace(' ', '');

        const moduleGrid = document.createElement('div');
        moduleGrid.className = 'grade-section';

        modules[grade].forEach((module) => {
            const moduleCard = document.createElement('div');
            moduleCard.className = 'module-card';
            moduleCard.innerHTML = `
                <div class="color-block" style="background-color: ${getRandomBrightColor()};"></div>
                <div class="module-title">${module}</div>
            `;
            moduleCard.addEventListener('click', () => alert(`You clicked on ${module}`));
            moduleGrid.appendChild(moduleCard);
        });

        tabPane.appendChild(moduleGrid);
        tabContent.appendChild(tabPane);

        // Activate the first tab by default
        if (index === 0) {
            tabButton.classList.add('active');
            tabPane.classList.add('active');
        }
    });
}

function activateTab(grade) {
    // Deactivate all tabs
    document.querySelectorAll('.tab-nav button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activate the selected tab
    document.querySelector(`.tab-nav button:nth-child(${Object.keys(modules).indexOf(grade) + 1})`).classList.add('active');
    document.getElementById(grade.replace(' ', '')).classList.add('active');
}

document.addEventListener('DOMContentLoaded', renderTabs);