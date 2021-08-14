const quizzInCreation = {}
const SHOW_ERROR = true;

const TOP_TEXTS = {
    CREATE_BASIC: "Comece pelo começo",
    CREATE_QUESTIONS: "Crie suas perguntas",
    CREATE_LEVELS: "Agora, decida os níveis!",
    CREATE_SUCCESS: "Seu quizz está pronto!"
}

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
        if (showError) { setInputError(input, `O valor deve ser entre ${min} e ${max}`) };
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
    getQuizzes();
}

function scrollHeaderHeight(){
    const headerHeight = document.querySelector("header").clientHeight;
    document.documentElement.scrollTop -= headerHeight;
}

function scrollDown(distance){
    document.documentElement.scrollTop += distance;
}

function scrollToView(view){
    const headerHeight = document.querySelector("header").clientHeight;
    document.documentElement.scrollTop += view.getBoundingClientRect().top - headerHeight;
}

function uncollapse(element){
    const listItem = element.parentElement;
    view = listItem;
    const kind = listItem.classList[0];
    const siblings = document.querySelectorAll(`.${kind}`);
    siblings.forEach(sibling => sibling.classList.add("collapsed"));
    listItem.classList.remove("collapsed");
    scrollToView(listItem);
}

function renderCreateLevelsForm(quantityLevels){
    const subscreen = document.querySelector(`.${SUBSCREENS.CREATE_LEVELS}`);
    const list = subscreen.querySelector("ul.levels");

    for (let i = 1; i <= quantityLevels; i++) {

        let visibility = (i === 1) ?  "" : "collapsed";

        list.innerHTML += `
        <li class="level ${visibility}">
            <div class="holder" onclick="uncollapse(this)">
                <span> Nível ${i}</span>
                <img src="assets/icon-create.png"/>
            </div>
            <div class="body">
                <h2>Nível ${i}</h2>
                <div class="input-group no-margin-top main">
            
                    <div class="title input-container">
                        <span class="error"></span>
                        <input value="Titulo do Level ${i}" onblur="inputMinLengthCheck(this, 10);" type="text" placeholder="Título do nível">
                    </div> 
            
                    <div class="min-percentage input-container">
                        <span class="error"></span>
                        <input value="${(i-1)*10}" onblur="inputNumberCheck(this, 0, 100);" type="number" placeholder="% de acerto mínima">
                    </div> 
            
                    <div class="url input-container">
                        <span class="error"></span>
                        <input value="http://photos.demandstudios.com/getty/article/76/222/200281068-001.jpg" onblur="inputUrlCheck(this)" type="text" placeholder="URL da imagem do nível">
                    </div> 
            
                    <div class="description input-container">
                        <span class="error"></span>
                        <textarea type="text" placeholder="Descrição do nível">UMA DESCRIÇÃO BEM LONGA COM BEEM MAIS DE 30 CARACTERES, TEM UNS QUARENTA OU SETENTA</textarea>
                    </div> 
            
                </div>
            </div>
        </li>`;
    }
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
                            <input value="EXAMPLE TITLE ${i} EXAMPLE TITLE ${i}" type="text" onblur="inputMinLengthCheck(this, 20);" placeholder="Texto da pergunta">
                        </div> 
                        <div class="color input-container">
                            <span class="error"></span>
                            <input value="#FFFFFF" type="text" onclick="inputHexColorCheck(this)" placeholder="Cor de fundo da pergunta">
                        </div> 
                </div>
                <h2>Resposta correta</h2>
                <div class="input-group no-margin-top right-answer">
                    <div class="text input-container">
                        <span class="error"></span>
                        <input value="RESPOSTA CORRETA" type="text" onblur="inputMinLengthCheck(this, 1);" placeholder="Resposta correta">
                    </div> 
                    <div class="url input-container">
                        <span class="error"></span>
                        <input value="http://photos.demandstudios.com/getty/article/76/222/200281068-001.jpg" type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem">
                    </div> 
                </div>
                <h2>Respostas incorreta</h2>
                <div class="input-group no-margin-top wrong-answer-1">
                    <div class="text input-container">
                        <span class="error"></span>
                        <input value="RESPOSTA ERRADA 1" onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 1">
                    <div class="url input-container">
                        <span class="error"></span>
                        <input value="https://i.pinimg.com/564x/8c/8d/d8/8c8dd85e702d364729160efc4ed9e4ab.jpg" type="text"  onblur="inputUrlCheck(this)"placeholder="URL da imagem 1">
                </div>
                <div class="input-group wrong-answer-2">
                    <div class="text input-container">
                        <span class="error"></span>
                        <input value="RESPOSTA ERRADA 2" onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 2">
                    </div>
                    <div class="url input-container">
                        <span class="error"></span>
                        <input value="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557310702.1267_UgysAp_n.jpg" type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem 2">
                    </div>
                </div>
                <div class="input-group wrong-answer-3">
                    <div class="text input-container">
                        <span class="error"></span>
                        <input value="RESPOSTA ERRADA 3" onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 3">
                    </div>
                    <div class="url input-container">
                        <span class="error"></span>
                        <input value="https://images.livemint.com/img/2020/02/24/600x338/confusedmindistocka_1582567565590.jpg" type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem 3">
                    </div>
                </div>
            </li>`;
    }
}

function postQuizz(){
    axios.post(API_URL, quizzInCreation)
    .then(response => {
        const textTop = document.querySelector(`.${SCREENS.CREATE_QUIZZ} .title h1`);
        const currentId = response.data.id;
        const previousIds = localStorage.getItem("id"); 
        let arrIds = [];
        if (previousIds !== null){
            arrIds = JSON.parse(previousIds);
        }

        arrIds.push(currentId);

        localStorage.setItem("id", JSON.stringify(arrIds));

        openSubscreen(SUBSCREENS.CREATE_SUCCESS);
        textTop.innerHTML = TOP_TEXTS.CREATE_SUCCESS;

        const quizz_info = document.querySelector(".subscreen-create-success");
        quizz_info.innerHTML = `<div class="container-img">
                <img src="${quizzInCreation.image}" />
                <div class="gradient"></div>
                <span>${quizzInCreation.title}</span>
            </div>
            <button class="continue" id="${currentId}" onclick="openQuizz(this);">Acessar Quizz</button>
            <span onclick="goToQuizzList()" class="back">Voltar pra home</span>`;

        console.log(response);
    })
    .catch(error => console.error(error)); 
}

function goToNextPage(){
    const screen = document.querySelector(`.${current.screen}`);
    const textTop = screen.querySelector(".title h1");

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
                renderCreateQuestionForm(Number(quantityQuestions.value));
                renderCreateLevelsForm(Number(quantityLevels.value));
                textTop.innerHTML = TOP_TEXTS.CREATE_QUESTIONS;
                openSubscreen(SUBSCREENS.CREATE_QUESTIONS);
            }
            return;
        } 

        if (current.subscreen === SUBSCREENS.CREATE_QUESTIONS) {

            const questions = subscreen.querySelectorAll(".question");
            quizzInCreation.questions = [];

            questions.forEach ((question, i) => {
                const text = question.querySelector(".text input");
                const color = question.querySelector(".color input");
                const rightText = question.querySelector(".right-answer .text input");
                const rightUrl = question.querySelector(".right-answer .url  input");
                const wrongText1 = question.querySelector(".wrong-answer-1 .text input");
                const wrongUrl1 = question.querySelector(".wrong-answer-1 .url  input");
                const wrongText2 = question.querySelector(".wrong-answer-2 .text input");
                const wrongUrl2 = question.querySelector(".wrong-answer-2 .url  input");   
                const wrongText3 = question.querySelector(".wrong-answer-3 .text input");
                const wrongUrl3 = question.querySelector(".wrong-answer-3 .url  input");

                inputMinLengthCheck(text, 20, SHOW_ERROR);
                inputHexColorCheck(color, SHOW_ERROR);
                inputMinLengthCheck(rightText, 1, SHOW_ERROR);
                inputUrlCheck(rightUrl, SHOW_ERROR);
                inputMinLengthCheck(wrongText1, 1, SHOW_ERROR);
                inputUrlCheck(wrongUrl1, SHOW_ERROR);
                inputMinLengthCheck(wrongText2, 1, SHOW_ERROR);
                inputUrlCheck(wrongUrl2, SHOW_ERROR);
                inputMinLengthCheck(wrongText3, 1, SHOW_ERROR);
                inputUrlCheck(wrongUrl3, SHOW_ERROR);

                quizzInCreation.questions[i] = {
                    title: text.value,
                    color: color.value,
                    answers: [
                        {text: rightText.value, image: rightUrl.value, isCorrectAnswer: true},
                        {text: wrongText1.value, image: wrongUrl1.value, isCorrectAnswer: false},
                        {text: wrongText2.value, image: wrongUrl2.value, isCorrectAnswer: false},
                        {text: wrongText3.value, image: wrongUrl3.value, isCorrectAnswer: false},
                    ]
                }
            });

            const isValid = subscreen.querySelectorAll("input.invalid").length === 0;

            if (isValid){
                textTop.innerHTML = TOP_TEXTS.CREATE_LEVELS;
                openSubscreen(SUBSCREENS.CREATE_LEVELS);
            }

            return;
        }

        if (current.subscreen === SUBSCREENS.CREATE_LEVELS) {

            const levels = subscreen.querySelectorAll(".level");
            quizzInCreation.levels = [];
            let hasLevelZero = false;

            levels.forEach ((level, i) => {
                const title = level.querySelector(".title input");
                const image = level.querySelector(".url input");
                const description = level.querySelector(".description textarea");
                const minValue = level.querySelector(".min-percentage  input");

                inputMinLengthCheck(title, 10, SHOW_ERROR);
                inputUrlCheck(image, SHOW_ERROR);
                inputMinLengthCheck(description, 30, SHOW_ERROR);
                inputNumberCheck(minValue, 0, 100, SHOW_ERROR);

                quizzInCreation.levels[i] = {
                    title: title.value,
                    image: image.value,
                    text: description.value,
                    minValue:  Number(minValue.value)
                }

                if (minValue.value === "0") { hasLevelZero = true}
            });

            const isValid = subscreen.querySelectorAll("input.invalid").length === 0 && hasLevelZero;

            if (!hasLevelZero) {alert("Pelo menos 1 nível precisa ter porcentagem 0");}

            if (isValid){ postQuizz(); }
            return;
        }
    }
}