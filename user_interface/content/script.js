const data = {
    notes: [
        {
            id: "note1",
            title: "Introduction to Calculus",
            content: "Calculus is the mathematical study of change, rates of change, and functions."
        },
        {
            id: "note2",
            title: "Limits",
            content: "A limit is the value that a function approaches as the input approaches a certain value."
        },
        {
            id: "note3",
            title: "Derivatives",
            content: "A derivative is the rate of change of a function at a particular point."
        },
        {
            id: "note4",
            title: "Integrals",
            content: "An integral is the area under the curve of a function."
        },
    ],
    exercises: [
        {
            title: "Limits Quiz",
            questions: [
                {
                    question: "What is the limit of x as x approaches 2?",
                    options: ["1", "2", "3"],
                    answer: 1
                },
                {
                    question: "What is the limit of (x^2 - 4)/(x - 2) as x approaches 2?",
                    options: ["0", "2", "4"],
                    answer: 2
                },
                {
                    question: "What is the limit of 1/x as x approaches 0?",
                    options: ["0", "infinity", "undefined"],
                    answer: 2
                }
            ]
        },
        {
            title: "Derivatives Quiz",
            questions: [
                {
                    question: "What is the derivative of x^2?",
                    options: ["2x", "x^2", "x"],
                    answer: 0
                },
                {
                    question: "What is the derivative of sin(x)?",
                    options: ["cos(x)", "sin(x)", "-cos(x)"],
                    answer: 1
                },
                {
                    question: "What is the derivative of e^x?",
                    options: ["e^x", "x", "1/e^x"],
                    answer: 0
                }
            ]
        },
        {
            title: "Integrals Quiz",
            questions: [
                {
                    question: "What is the integral of x^2?",
                    options: ["x^3/3", "2x", "x^2/2"],
                    answer: 0
                },
                {
                    question: "What is the integral of cos(x)?",
                    options: ["sin(x)", "-sin(x)", "cos(x)"],
                    answer: 1
                },
                {
                    question: "What is the integral of e^x?",
                    options: ["e^x", "x", "1/e^x"],
                    answer: 0
                }
            ]
        }
    ]
};

// Generate slides dynamically
const slidesContainer = document.getElementById('slides-container');

data.notes.forEach(note => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.id = note.id;
    slide.innerHTML = `
        <h1>${note.title}</h1>
        <div class="note">
            <p>${note.content}</p>
        </div>
    `;
    slidesContainer.appendChild(slide);
});

data.exercises.forEach((exercise, exerciseIndex) => {
    exercise.questions.forEach((question, questionIndex) => {
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
        slidesContainer.appendChild(slide);
    });
});

// Show the first slide
const slides = document.querySelectorAll('.slide');
slides[0].classList.add('active');

// Slide navigation logic
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));