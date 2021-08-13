function correctQuestion(chosenOption, questionIndex){
    const question = chosenOption.parentElement;
    const options = question.querySelectorAll(".option");

    options.forEach((option, optionIndex) => {
        option.classList.add("blur");
        const isCorrect = thisQuizz.questions[questionIndex].answers[optionIndex].isCorrectAnswer;
        const optionClass = (isCorrect) ? "right" : "wrong";
        option.classList.add(optionClass);
    });
    chosenOption.classList.remove("blur");
}

function renderQuestions(){
    const screen = document.querySelector(`.${SCREENS.QUIZZ_QUESTIONS}`);
    const list = screen.querySelector("ul.questions");
    const banner = screen.querySelector(".banner");
    const bannerImg = banner.querySelector("img");
    const bannerTxt = banner.querySelector("h1");

    const black = "#000000";
    const white = "#FFFFFF";

    bannerImg.src = thisQuizz.image;
    bannerTxt.innerHTML = thisQuizz.title;
    thisQuizz.questions.forEach((question, index) => {

        const textColor = (isHexColorBright(question.color)) ? black : white;
        list.innerHTML += `
        <li class="question">
            <div class="title" style="color: ${textColor}; background-color: ${question.color}">${question.title}</div>
            <div class="options">
                <div class="option" onclick="correctQuestion(this, ${index})">
                    <div class="option-img">
                        <img src="${question.answers[0].image}" />
                    </div>
                    <span>${question.answers[0].text}</span>
                </div>
                <div class="option" onclick="correctQuestion(this, ${index})">
                    <div class="option-img">
                    <img src="${question.answers[1].image}" />
                    </div>
                    <span>${question.answers[1].text}</span>
                </div>
                <div class="option" onclick="correctQuestion(this, ${index})">
                    <div class="option-img">
                    <img src="${question.answers[2].image}" />
                    </div>
                    <span>${question.answers[2].text}</span>
                </div>
                <div class="option" onclick="correctQuestion(this, ${index})">
                    <div class="option-img">
                    <img src="${question.answers[3].image}" />
                    </div>
                    <span>${question.answers[3].text}</span>
                </div>
            </div>
        </li>
        `
    });
}

