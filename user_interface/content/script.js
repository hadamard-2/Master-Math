const data = {
    notes: [
        {
            id: "note1",
            title: "Introduction to Cryptography",
            content: "Cryptography is the study of securing information."
        },
        {
            id: "note2",
            title: "Encryption Basics",
            content: "Encryption transforms data into a secure format."
        },
        {
            id: "note3",
            title: "History of Cryptography",
            content: "Cryptography has been used for secure communication since ancient times."
        }
    ],
    exercises: [
        {
            title: "Basics Quiz",
            questions: [
                {
                    question: "What is the purpose of cryptography?",
                    options: [
                        "To secure communication",
                        "To create data"
                    ],
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