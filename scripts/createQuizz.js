const quizzInCreation = {}
const SHOW_ERROR = true;

function setInputError(input, errorMessage){
    let parent = input.parentElement;
    let span = parent.querySelector(`span.error`);

    if (errorMessage.length > 0){
        span.innerHTML = errorMessage;
        input.classList.add("invalid");
    } else {
        span.innerHTML = "";
        input.classList.remove("invalid");
    }
}

function inputNumberCheck(input, min, max, showError){
    if (input.value.length === 0 ) { 
        if (showError) { setInputError(input, `A quantidade deve ser entre ${min} e ${max}`) };
        return false; 
    }

    if (input.value < min) {
        input.value = min;
    } else if (input.value > max){
        input.value = max;
    }

    setInputError(input, "");
    return true;
}

function inputMinLengthCheck(input, minLength, showError){
    if (input.value.length < minLength) { 
        if (showError) { setInputError(input, `O texto deve conter no mínimo ${minLength} letras`); }
        return false;
    } else {
        setInputError(input, false);
        return true;
    }
}

function inputUrlCheck(input, showError){
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;

    if (!matchpattern.test(input.value)){
        if (showError) { setInputError(input, "O valor informado não é uma URL válida"); }
        return false;
    } else {
        setInputError(input, false);
        return true;
    }
}

function inputHexColorCheck(input, showError){
    const matchpattern = /^#[0-9A-F]{6}$/i;

    if (!matchpattern.test(input.value)){
        if (showError) { setInputError(input, "O valor informado não é uma cor em hexadecimal"); }
        return false;
    } else {
        setInputError(input, false);
        return true;
    }
}


function goToCreateQuizz(){
    openScreen(SCREENS.CREATE_QUIZZ);
    openSubscreen(SUBSCREENS.CREATE_BASIC);
}

function goToQuizzList(){
    openScreen(SCREENS.QUIZZ_LIST);
}

function uncollapse(element){
    const listItem = element.parentElement;
    const kind = listItem.classList[0];
    const siblings = document.querySelectorAll(`.${kind}`);
    siblings.forEach(sibling => sibling.classList.add("collapsed"));
    listItem.classList.remove("collapsed");
}

function renderCreateQuestionForm(quantityQuestions){
    const subscreen = document.querySelector(`.${SUBSCREENS.CREATE_QUESTIONS}`);
    const list = subscreen.querySelector("ul.questions");

    for (let i = 1; i <= quantityQuestions; i++) {

        let visibility = (i === 1) ?  "" : "collapsed";

        list.innerHTML += `
        <li id="question-${i}" class="question ${visibility}">
            <div class="holder" onclick="uncollapse(this)">
                <span> Pergunta ${i}</span>
                <img src="assets/icon-create.png"/>
            </div>
            <div class="body">
                <h2>Pergunta ${i}</h2>
                <div class="input-group no-margin-top main">
                    <div class="text input-container">
                        <span class="error"></span>
                        <input type="text" onblur="inputMinLengthCheck(this, 20);" placeholder="Texto da pergunta">
                    </div> 
                    <div class="color input-container">
                        <span class="error"></span>
                        <input type="text" placeholder="Cor de fundo da pergunta">
                    </div> 
            </div>
            <h2>Resposta correta</h2>
            <div class="input-group no-margin-top right-answer">
                <div class="text input-container">
                    <span class="error"></span>
                    <input type="text" onblur="inputMinLengthCheck(this, 1);" placeholder="Resposta correta">
                </div> 
                <div class="url input-container">
                    <span class="error"></span>
                    <input type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem">
                </div> 
            </div>
            <h2>Respostas incorreta</h2>
            <div class="input-group no-margin-top wrong-answer-1">
                <div class="text input-container">
                    <span class="error"></span>
                    <input onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 1">
                <div class="url input-container">
                    <span class="error"></span>
                    <input type="text"  onblur="inputUrlCheck(this)"placeholder="URL da imagem 1">
            </div>
            <div class="input-group wrong-answer-2">
                <div class="text input-container">
                    <span class="error"></span>
                    <input onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 2">
                </div>
                <div class="url input-container">
                    <span class="error"></span>
                    <input type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem 2">
                </div>
            </div>
            <div class="input-group wrong-answer-3">
                <div class="text input-container">
                    <span class="error"></span>
                    <input onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 3">
                </div>
                <div class="url input-container">
                    <span class="error"></span>
                    <input type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem 3">
                </div>
            </div>
        </li>`;
    }
}



function goToNextPage(){
    const screen = document.querySelector(`.${current.screen}`);

    if (current.screen === SCREENS.CREATE_QUIZZ){
        const subscreen = screen.querySelector(`.${current.subscreen}`);

        if (current.subscreen === SUBSCREENS.CREATE_BASIC) {
            const title = subscreen.querySelector(".title input");
            const url = subscreen.querySelector(".url input");
            const quantityQuestions = subscreen.querySelector(".quantity-questions input");
            const quantityLevels = subscreen.querySelector(".quantity-levels input");

            inputMinLengthCheck(title, 20, SHOW_ERROR);
            inputUrlCheck(url, SHOW_ERROR);
            inputNumberCheck(quantityQuestions, 3, 10, SHOW_ERROR);
            inputNumberCheck(quantityLevels, 2, 10, SHOW_ERROR);

            const isValid = subscreen.querySelectorAll("input.invalid").length === 0;

            if (isValid) {
                quizzInCreation.title = title.value;
                quizzInCreation.image = url.value;
                quizzInCreation.quantityQuestions = Number(quantityQuestions.value);
                quantityLevels.quantityLevels =  Number(quantityLevels.value);
                renderCreateQuestionForm(Number(quantityQuestions.value));
                openSubscreen(SUBSCREENS.CREATE_QUESTIONS);
            }
            return;
        } 

        if (current.subscreen === SUBSCREENS.CREATE_QUESTIONS) {

            const questions = subscreen.querySelectorAll(".question");

            questions.forEach (question => {
                const title = question.querySelector(".title input");
                const url = subscreen.querySelector(".url input");
                const quantityQuestions = subscreen.querySelector(".quantity-questions input");
                const quantityLevels = subscreen.querySelector(".quantity-levels input");
            });


            //openSubscreen(SUBSCREENS.CREATE_LEVELS);
            return;
        }

        if (current.subscreen === SUBSCREENS.CREATE_LEVELS) {
            openSubscreen(SUBSCREENS.CREATE_SUCCESS);
            return;
        }
    }
}