let rightAnswers = 0;

const getTotalAnswered = () => document.querySelectorAll(".answered").length;
const isQuizzFinished = () => getTotalAnswered() === thisQuizz.questions.length;
const getRate = () => Number(((rightAnswers/thisQuizz.questions.length)*100).toFixed());

const renderQuizzResult = () => {
    const container = document.querySelector(`.${SCREENS.QUIZZ_QUESTIONS} ul.questions`);


    container.innerHTML += ` 
    <div class="question result">
        <div class="title">${getRate()}% de acerto</div>
        <div class="result-box"> 
        <img src="${thisQuizz.levels[0].image}" />
        <p>${thisQuizz.levels[0].text}</p>
        </div>
    </div>`
}

function nextQuestion() {
    const questions = document.querySelectorAll("li.question");

    for ( let i = 0; i < questions.length; i++ ) {
        const options = questions[i].querySelector(".options");

        if (!options.classList.contains("answered")) {
            questions[i].scrollIntoView({block: "end", behavior: "smooth"});
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
    const screen = document.querySelector(`.${SCREENS.QUIZZ_QUESTIONS}`);
    const list = screen.querySelector("ul.questions");
    const banner = screen.querySelector(".banner");
    const bannerImg = banner.querySelector("img");
    const bannerTxt = banner.querySelector("h1");

    const black = "#000000";
    const white = "#FFFFFF";
    let htmlList = "";

    bannerImg.src = thisQuizz.image;
    bannerTxt.innerHTML = thisQuizz.title;

    thisQuizz.questions.forEach((question, indexQuestion) => {

        const textColor = (isHexColorBright(question.color)) ? black : white;
        htmlList += `
        <li class="question">
            <div class="title" style="color: ${textColor}; background-color: ${question.color}">${question.title}</div>
            <ul class="options">`;
        question.answers.forEach( answer => { htmlList += 
                `<li class="option" onclick="correctQuestion(this, ${indexQuestion})">
                    <div class="option-img">
                        <img src="${answer.image}" />
                    </div>
                    <span>${answer.text}</span>
                </li>`;});
        htmlList += `
            </ul> 
        </li>`;
    });

    list.innerHTML = htmlList;
}

