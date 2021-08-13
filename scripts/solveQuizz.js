function renderQuestions(){
    const screen = document.querySelector(`.${SCREENS.QUIZZ_QUESTIONS}`);
    const list = screen.querySelector("ul.questions");
    const banner = screen.querySelector(".banner");
    const bannerImg = banner.querySelector("img");
    const bannerTxt = banner.querySelector("h1");

    bannerImg.src = thisQuizz.image;
    bannerTxt.innerHTML = thisQuizz.title;
    thisQuizz.questions.forEach(question => {
        list.innerHTML += `
        <li class="question">
            <div class="title" style="background-color: ${question.color}">${question.title}</div>
            <div class="options">
                <div class="option">
                    <div class="option-img">
                        <img src="${question.answers[0].image}" />
                    </div>
                    <span>${question.answers[0].text}</span>
                </div>
                <div class="option">
                    <div class="option-img">
                    <img src="${question.answers[1].image}" />
                    </div>
                    <span>${question.answers[1].text}</span>
                </div>
                <div class="option">
                    <div class="option-img">
                    <img src="${question.answers[2].image}" />
                    </div>
                    <span>${question.answers[2].text}</span>
                </div>
                <div class="option">
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

