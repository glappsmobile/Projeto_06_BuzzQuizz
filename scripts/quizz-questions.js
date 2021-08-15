let rightAnswers = 0;

const getTotalAnswered = () => document.querySelectorAll(".answered").length;
const isQuizzFinished = () => getTotalAnswered() === thisQuizz.questions.length;
const getRate = () => Number(((rightAnswers/thisQuizz.questions.length)*100).toFixed());
const getContrastColor = (hexColor) => (isHexColorBright(hexColor)) ? "#000000" : "#FFFFFF";

function removeResult() {
    const screen = document.querySelector(`.${SCREENS.QUIZZ_QUESTIONS}`);
    const result = screen.querySelector("div.result");
    const restart_button = screen.querySelector("button");
    const back_button = screen.querySelector("span.back");

    result.remove();
    restart_button.remove();
    back_button.remove();
}

const renderQuizzResult = () => {
    const container = document.querySelector(`.${SCREENS.QUIZZ_QUESTIONS}`);

    const level = thisQuizz.levels.sort((a, b) => b.minValue - a.minValue).filter((item) => item.minValue <= getRate())[0];

    container.innerHTML += ` 
    <div class="question result">
        <div class="title white">${getRate()}% de acerto: ${level.title}</div>
        <div class="result-box"> 
        <img src="${level.image}" alt="Imagem ${level.title}" />
        <p>${level.text}</p>
        </div>
    </div>
    <button onclick="renderQuestions();">Reiniciar Quizz</button>
    <span onclick="goToQuizzList();" class="back">Voltar pra home</span>`;

    setTimeout(() => {container.scrollIntoView({block: "end", behavior: "smooth"})}, 2000);
}

function nextQuestion() {
    const questions = document.querySelectorAll("li.question");

    for ( let i = 0; i < questions.length; i++ ) {
        const options = questions[i].querySelector(".options");

        questions[i].scrollIntoView({block: "end", behavior: "smooth"});

        if (options !== null && !options.classList.contains("answered")) {
            break;
        }
    }
}

function correctQuestion(chosenOption, indexQuestion){
    const question = chosenOption.parentElement;
    question.classList.add("answered");
    const options = question.querySelectorAll(".option");

    options.forEach((option, indexOption) => {
        option.classList.add("blur");
        option.removeAttribute("onClick");
        const isCorrect = thisQuizz.questions[indexQuestion].answers[indexOption].isCorrectAnswer;
        const optionClass = (isCorrect) ? "right" : "wrong";
        option.classList.add(optionClass);

        if (isCorrect && option === chosenOption) { rightAnswers++; }
    });

   chosenOption.classList.remove("blur");

   if (isQuizzFinished()) { 
       renderQuizzResult(); 
    } else {
        setTimeout(nextQuestion, 2000);
    }
}

function renderQuestions(){
    rightAnswers = 0;
    sortQuizzQuestions();
    const screen = document.querySelector(`.${SCREENS.QUIZZ_QUESTIONS}`);
    const list = screen.querySelector("ul.questions");
    const banner = screen.querySelector(".banner");
    const bannerImg = banner.querySelector("img");
    const bannerTxt = banner.querySelector("h1");
    let htmlList = "";
    const result = screen.querySelector("div.result");
    if ( result != undefined ) {
        removeResult();
        screen.scrollIntoView({behavior: "smooth"});
    }

    bannerImg.src = thisQuizz.image;
    bannerTxt.innerHTML = thisQuizz.title;

    thisQuizz.questions.forEach((question, indexQuestion) => {

        const textColor = getContrastColor(question.color);

        htmlList += `
        <li class="question">
            <div class="title" style="color: ${textColor}; background-color: ${question.color}">${question.title}</div>
            <ul class="options">`;
        question.answers.forEach( (answer, i) => { htmlList += 
                `<li class="option" onclick="correctQuestion(this, ${indexQuestion})">
                    <div class="option-img">
                        <img src="${answer.image}" alt="Alternativa ${i}"/>
                    </div>
                    <span>${answer.text}</span>
                </li>`;});
        htmlList += `
            </ul> 
        </li>`;
    });

    list.innerHTML = htmlList;
}

