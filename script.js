const questions = [
    {
        question: " Which historical figure is nicknamed 'The Little Corporal'?",
        answers: [
            {text: "Julius Caesar", correct: false},
            {text: "Napoleon Bonaparte", correct: true},
            {text: "Genghis Khan", correct: false},
            {text: "William the Conqueror", correct: false},
        ]
    },

    {
        question: " What is the name of the point on the Earth's surface directly opposite the North Pole?",
        answers: [
            {text: "Arctic Circle", correct: false},
            {text: "South Pole", correct: false},
            {text: "Equator", correct: false},
            {text: "Antipode", correct: true},
        ]
    },

    {
        question: "In which William Shakespeare play does the famous line 'To be or not to be, that is the question' appear?",
        answers: [
            {text: "Romeo and Juliet", correct: false},
            {text: "Macbeth", correct: false},
            {text: "Hamlet", correct: true},
            {text: "A Midsummer Night's Dream", correct: false},
        ]
    },

    {
        question: "What is the world's driest non-polar desert?",
        answers: [
            {text: "Sahara Desert", correct: false},
            {text: "Atacama Desert", correct: true},
            {text: "Gobi Desert", correct: false},
            {text: "Kalahari Desert", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const buttons = document.createElement("button");
        buttons.innerHTML = answer.text;
        buttons.classList.add("btn");
        answerButton.appendChild(buttons);

        if(answer.correct){
            buttons.dataset.correct = answer.correct;
        }

        buttons.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(buttons =>{
        if(buttons.dataset.correct === "true"){
            buttons.classList.add("correct");
        }
        buttons.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again !";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
    
});

startQuiz();