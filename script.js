const questions = [
    {
        question: "A process is a _______.",
        answer: [
            { text: "Single thread of execution.", correct: false },
            { text: "Program in the execution", correct: true },
            { text: "Program in the memory", correct: false },
            { text: "Task", correct: false }
        ]
    },
    {
        question: "Which of the following is a structured programming technique that graphically represents the detailed steps required to solve a program?",
        answer: [
            { text: "Object-oriented programming", correct: false },
            { text: "Pseudocode", correct: false },
            { text: "Flowchart", correct: true },
            { text: "Top-down design", correct: false }
        ]
    },
    {
        question: "Which of the following is the extension of Notepad?",
        answer: [
            { text: ".txt", correct: true },
            { text: ".xls", correct: false },
            { text: ".ppt", correct: false },
            { text: ".bmp", correct: false }
        ]
    },
    {
        question: "Which type of program acts as an intermediary between a user of a computer and the computer hardware?",
        answer: [
            { text: "Operating system", correct: true },
            { text: "User thread", correct: false },
            { text: "Superuser thread", correct: false },
            { text: "Application program", correct: false }
        ]
    },
    {
        question: "What is the full form of DRAM?",
        answer: [
            { text: "Dynamic Remote Access Memory", correct: false },
            { text: "Dynamic Random-Access Memory", correct: true },
            { text: "Dependent Remote Access Memory", correct: false },
            { text: "Dependent Random-Access Memory", correct: false }
        ]
    },
    {
        question: "Consider the following path C:\Device\Module\Module 1. What is name of the file in this path?",
        answer: [
            { text: "Device", correct: false },
            { text: "Module", correct: false },
            { text: "C", correct: false },
            { text: "Module 1", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();