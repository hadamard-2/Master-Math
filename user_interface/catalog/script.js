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

const mathColors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Sky Blue
    "#FFA07A", // Orange
    "#98D8C8", // Light Green
    "#F7DC6F", // Yellow
    "#BB8FCE", // Purple
    "#82E0AA", // Lime Green
    "#F1948A", // Salmon Pink
    "#85C1E9", // Light Blue
    "#F8C471", // Gold
    "#73C6B6" // Sea Green
];

function getRandomBrightColor() {
    return mathColors[Math.floor(Math.random() * mathColors.length)];
}

const API_BASE_URL = 'http://localhost:5000';

async function fetchUnlockedModules() {
    const response = await fetch(`${API_BASE_URL}/api/unlocked_modules`);
    const data = await response.json();
    return data.modules || [];
}

async function fetchPrerequisites(courseName) {
    const response = await fetch(`${API_BASE_URL}/api/prerequisites/${courseName}`);
    const data = await response.json();
    return data.prerequisites || [];
}

function createTabButton(grade, index) {
    const tabButton = document.createElement('button');
    tabButton.textContent = grade;
    tabButton.addEventListener('click', () => activateTab(grade));

    if (index === 0) {
        tabButton.classList.add('active');
    }

    return tabButton;
}

function createModuleCard(module, unlockedModules) {
    const moduleCard = document.createElement('div');
    moduleCard.className = 'module-card';

    // Determine whether the module is unlocked
    const isUnlocked = unlockedModules.includes(module);

    // Construct the inner HTML based on whether the module is unlocked
    moduleCard.innerHTML = `
        <div class="color-block" style="background-color: ${getRandomBrightColor()};">
            ${isUnlocked ? '' : '<span class="material-symbols-rounded">lock</span>'}
        </div>
        <div class="module-title">${module}</div>
    `;

    // Add event listener based on module unlock status
    if (isUnlocked) {
        moduleCard.addEventListener('click', () => {
            window.location.href = '../content/index.html';
        });
    } else {
        moduleCard.addEventListener('click', async () => {
            const prerequisites = await fetchPrerequisites(module.replace(/\s+/g, '_').toLowerCase());
            alert(`To unlock this module, complete the following modules first:\n• ${prerequisites.join('\n• ')}`);
        });
    }

    return moduleCard;
}

function createTabPane(grade, index) {
    const tabPane = document.createElement('div');
    tabPane.className = 'tab-content';
    tabPane.id = grade.replace(' ', '');

    const moduleGrid = document.createElement('div');
    moduleGrid.className = 'grade-section';

    modules[grade].forEach((module) => {
        const moduleCard = createModuleCard(module);
        moduleGrid.appendChild(moduleCard);
    });

    tabPane.appendChild(moduleGrid);

    if (index === 0) {
        tabPane.classList.add('active');
    }

    return tabPane;
}

async function renderTabs() {
    const tabNav = document.getElementById('tabNav');
    const tabContent = document.getElementById('tabContent');

    const unlockedModules = await fetchUnlockedModules();

    Object.keys(modules).forEach((grade, index) => {
        const tabButton = createTabButton(grade, index);
        tabNav.appendChild(tabButton);

        const tabPane = createTabPane(grade, index, unlockedModules);
        tabContent.appendChild(tabPane);
    });
}

function createTabPane(grade, index, unlockedModules) {
    const tabPane = document.createElement('div');
    tabPane.className = 'tab-content';
    tabPane.id = grade.replace(' ', '');

    const moduleGrid = document.createElement('div');
    moduleGrid.className = 'grade-section';

    modules[grade].forEach((module) => {
        const moduleCard = createModuleCard(module, unlockedModules);
        moduleGrid.appendChild(moduleCard);
    });

    tabPane.appendChild(moduleGrid);

    if (index === 0) {
        tabPane.classList.add('active');
    }

    return tabPane;
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