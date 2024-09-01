// Global variables
let questionBank;
let totalQuestions = 0;
let answeredQuestions = 0;
let scorePerTopic = {};
let currentSlide = 0;
let slides;

// DOM elements
const slidesContainer = document.getElementById('slides-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Fetch and initialize
function initializeTest() {
    fetch('diagnostic_test.json')
        .then(response => response.json())
        .then(data => {
            questionBank = data;
            totalQuestions = calculateTotalQuestions();
            generateSlides();
            slides = document.querySelectorAll('.slide');
            showSlide(0);
            initializeNavigation();
            showProgress();
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

function calculateTotalQuestions() {
    return questionBank.exercises.reduce((sum, exercise) => sum + exercise.questions.length, 0);
}

// Slide generation
function generateSlides() {
    questionBank.exercises.forEach((exercise, exerciseIndex) => {
        exercise.questions.forEach((question, questionIndex) => {
            const slide = createSlide(exercise, question, exerciseIndex, questionIndex);
            slidesContainer.appendChild(slide);
        });
    });
}

function createSlide(exercise, question, exerciseIndex, questionIndex) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.id = `exercise${exerciseIndex + 1}_question${questionIndex + 1}`;
    slide.innerHTML = `
        <h1>${exercise.title}</h1>
        <div class="exercise">
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map((option, optionIndex) => `
                    <label class="option">
                        <input type="radio" name="question${exerciseIndex}_${questionIndex}" value="${optionIndex}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    return slide;
}

// Navigation
function initializeNavigation() {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    slidesContainer.addEventListener('change', handleAnswer);
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Answer handling
function handleAnswer(event) {
    if (event.target.type === 'radio') {
        const slideId = event.target.closest('.slide').id;
        const [exerciseIndex, questionIndex] = slideId.match(/\d+/g).map(Number);
        const exercise = questionBank.exercises[exerciseIndex - 1];
        const question = exercise.questions[questionIndex - 1];
        const selectedOption = Number(event.target.value);

        if (!question.answered) {
            question.answered = true;
            answeredQuestions++;
            showProgress();
        }

        if (selectedOption === question.answer) {
            scorePerTopic[question.topic] = (scorePerTopic[question.topic] || 0) + 1;
        }

        if (answeredQuestions === totalQuestions) {
            showSummary();
        }
    }
}

// Progress tracking
function showProgress() {
    const progressDiv = document.getElementById('progress') || createProgressElement();
    progressDiv.textContent = `Answered: ${answeredQuestions} / ${totalQuestions}`;
}

function createProgressElement() {
    const progressDiv = document.createElement('div');
    progressDiv.id = 'progress';
    document.body.insertBefore(progressDiv, slidesContainer);
    return progressDiv;
}

// Summary
function showSummary() {
    const summary = calculateSummary();
    console.log('Student Report:', summary);
    displaySummaryUI(summary);
    updateMasteryLevels(summary);
}

function calculateSummary() {
    const summary = {};
    questionBank.exercises.forEach(exercise => {
        exercise.questions.forEach(question => {
            const totalTopicQuestions = exercise.questions.filter(q => q.topic === question.topic).length;
            const correctAnswers = scorePerTopic[question.topic] || 0;
            const percentage = (correctAnswers / totalTopicQuestions) * 100;
            summary[question.topic] = Math.round(percentage);
        });
    });
    return summary;
}

function displaySummaryUI(summary) {
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'summary';
    summaryDiv.innerHTML = `
        <h2>Diagnostic Test Summary</h2>
        <ul>
            ${Object.entries(summary).map(([topic, score]) => `
                <li>${topic}: ${score}%</li>
            `).join('')}
        </ul>
        <p>Updating mastery levels...</p>
    `;
    
    slidesContainer.innerHTML = '';
    slidesContainer.appendChild(summaryDiv);
    
    // Hide navigation buttons
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
}

// New function to update mastery levels
function updateMasteryLevels(summary) {
    const updatePromises = Object.entries(summary).map(([topic, score]) => {
        const masteryLevel = score;
        return updateMasteryLevel(topic, masteryLevel);
    });

    Promise.all(updatePromises)
        .then(() => {
            const summaryDiv = document.querySelector('.summary');
            summaryDiv.innerHTML += '<p>Mastery levels updated successfully!</p>';
        })
        .catch(error => {
            console.error('Error updating mastery levels:', error);
            const summaryDiv = document.querySelector('.summary');
            summaryDiv.innerHTML += '<p>Error updating mastery levels. Please try again later.</p>';
        });
}

function updateMasteryLevel(moduleName, masteryLevel) {
    return fetch('http://127.0.0.1:5000/update_mastery_level', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            module_name: moduleName,
            mastery_level: masteryLevel
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log(`Mastery level for ${moduleName} updated successfully to ${masteryLevel}`);
        } else {
            throw new Error(`Error updating mastery level for ${moduleName}: ${data.error}`);
        }
    });
}

// Initialize the test
initializeTest();