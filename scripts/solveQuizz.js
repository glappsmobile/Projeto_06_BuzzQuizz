function renderQuestions(quizz){
    console.log(quizz);
    const list = document.querySelector(".screen-quizz-questions ul.questions");

    quizz.questions.forEach(question => {
        list.innerHTML += `
        <li class="question">
            <div class="title">${question.title}</div>
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

