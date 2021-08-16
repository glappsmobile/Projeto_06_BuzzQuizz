let quizzInCreation = {}
const SHOW_ERROR = true;
const NOTHING = undefined;

const TOP_TEXTS = {
    CREATE_BASIC: "Comece pelo começo",
    CREATE_QUESTIONS: "Crie suas perguntas",
    CREATE_LEVELS: "Agora, decida os níveis!",
    CREATE_SUCCESS: "Seu quizz está pronto!"
}

const clearCreateBasicInputs = () => {
    document.querySelectorAll(`.${SUBSCREENS.CREATE_BASIC} input`).forEach((input) => {
        input.value = "";
    });
}

const clearApp = () => {
    //TUDO QUE PRECISAR SER LIMPO AO CRIAR O QUIZZ
    clearCreateBasicInputs();
    quizzInCreation = {}
}

const uncollapseInvalidInputParents = () => {
    document.querySelectorAll(".collapsable,.uncollapsable").forEach(question => {
        if (!question.querySelector(".invalid")) {
            question.classList.add("collapsed"); 
            question.classList.add("collapsable"); 
            question.classList.remove("uncollapsable"); 
        } else {
            question.classList.remove("collapsed"); 
            question.classList.remove("collapsable"); 
            question.classList.add("uncollapsable");
        }
    });
}

const nextPageError = () => {
    alert("Preencha todos os espaços corretamente antes de prosseguir.");
    uncollapseInvalidInputParents();
    scrollToSelector(".uncollapsable");
}


const scrollToSelector = (selector) => {
    const element = document.querySelector(selector);
    if (element !== null) {scrollToView(element)}
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

    if (input.value < min || input.value > max ) {
        if (showError) { setInputError(input, `O valor deve ser entre ${min} e ${max}`) };
        return false;
    } else {
        setInputError(input, "");
        return true;
    }

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

function inputEmptyCheck(input, showError){
    if (input.value.length === 0) { 
        if (showError) { setInputError(input, `O texto não pode estar vazio`); }
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

const collapse = (element) => {
    if (element.classList.contains("collapsable")) { element.classList.add("collapsed") };
}

const collapseParent = (child) =>{
    collapse(child.parentElement.parentElement.parentElement);
}

function uncollapse(element){
    const listItem = element.parentElement;
    view = listItem;
    const kind = listItem.classList[0];
    const siblings = document.querySelectorAll(`.${kind}`);
    siblings.forEach(sibling => collapse(sibling));
    listItem.classList.remove("collapsed");
    scrollToView(listItem);
}

function renderCreateQuestionForm(quantityQuestions){
    const subscreen = document.querySelector(`.${SUBSCREENS.CREATE_QUESTIONS}`);
    const list = subscreen.querySelector("ul.questions");
    list.innerHTML = "";
    const quantityAnswers = 4;
    let htmlText = "";

    const randomColor = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

    for (let i = 1; i <= quantityQuestions; i++) {

        const visibility = (i === 1) ?  "" : "collapsed";
        let title = (isEditing && quizzInCreation.questions[i-1] !== undefined) ? quizzInCreation.questions[i-1].title : "";
        let color = (isEditing && quizzInCreation.questions[i-1] !== undefined) ? quizzInCreation.questions[i-1].color : "";
    

        htmlText += `
        <li class="question collapsable ${visibility}">
            <div class="holder" onclick="uncollapse(this)">
                <span> Pergunta ${i}</span>
                <img src="assets/icon-create.png"/>
            </div>
            <div class="body">
                <div class="container-list-name">
                <h2>Pergunta ${i}</h2>
                <ion-button class="btn-collapse" title="Minimizar" onClick="collapseParent(this)">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </ion-button>
                </div>
                <div class="input-group no-margin-top main">
                    <div class="text input-container">
                        <input maxlength="65" value="${title}" type="text" onkeyup="inputMinLengthCheck(this, 20);" placeholder="Texto da pergunta">
                        <span class="error"></span>
                    </div> 
                    <div class="color input-container">                                             
                        <input maxlength="7" value="${color}" type="text" onclick="inputHexColorCheck(this)" placeholder="Cor de fundo da pergunta">
                        <span class="error"></span>
                    </div> 
                </div>`;

            for(let z = 0; z < quantityAnswers;z++){

                let url = "";
                let text = ""; 

                if(isEditing && quizzInCreation.questions[i-1] !== undefined){
                    url = quizzInCreation.questions[i-1].answers.map(answer => answer.image)[z];
                    text = quizzInCreation.questions[i-1].answers.map(answer => answer.text)[z]
                }

                url = (!url)? "" : url;
                text = (!text)? "" : text; 

                const optional = (z > 1) ? "(opcional)" : "";
                const placeholder = (z === 0) ? "Resposta correta" : `Resposta incorreta ${z}`;
                const answerClass = (z === 0) ? "right-answer" : `wrong-answer-${z}`;
                const marginClass = (z <=  1) ? "no-margin-top" : "";
                let label = "";
                label = (z === 0) ? "<h2>Resposta correta</h2>" : label;
                label = (z === 1) ? "<h2>Respostas incorretas</h2>" : label;

                htmlText += `${label}
                <div class="input-group ${marginClass} ${answerClass}">
                    <div class="text input-container">
                        <input maxlength="65" value="${text}" type="text" onkeyup="inputEmptyCheck(this);" placeholder="${placeholder} ${optional}">
                        <span class="error"></span>
                    </div> 
                    <div class="url input-container">                       
                        <input maxlength="255" value="${url}" type="text" onkeyup="inputUrlCheck(this)" placeholder="URL da imagem">
                        <span class="error"></span>
                    </div> 
                </div>`
            }
           htmlText += `
            </div>
        </li>`;
    }
    list.innerHTML += htmlText;
}

function renderCreateLevelsForm(quantityLevels){
    const subscreen = document.querySelector(`.${SUBSCREENS.CREATE_LEVELS}`);
    const list = subscreen.querySelector("ul.levels");
    list.innerHTML = "";

    for (let i = 1; i <= quantityLevels; i++) {

        let visibility = (i === 1) ?  "" : "collapsed";

        let title = "";
        let minPercentage = "";
        let url = "";
        let description = "";

        if (isEditing && quizzInCreation.levels[i-1] !== undefined){
            title = quizzInCreation.levels[i-1].title;
            minPercentage =  quizzInCreation.levels[i-1].minValue;
            url = quizzInCreation.levels[i-1].image;
            description = quizzInCreation.levels[i-1].text;
        }

        title = (!title)? "" : title;
        minPercentage = (minPercentage === undefined)? "" : minPercentage; 
        url = (!url)? "" : url;
        description = (!description)? "" : description; 

        list.innerHTML += `
        <li class="level collapsable ${visibility}">
            <div class="holder" onclick="uncollapse(this)">
                <span> Nível ${i}</span>
                <img src="assets/icon-create.png"/>
            </div>
            <div class="body">
                <div class="container-list-name">
                    <h2>Nível ${i}</h2>
                <ion-button class="btn-collapse" title="Minimizar" onClick="collapseParent(this)">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </ion-button>
                </div>
                <div class="input-group no-margin-top main">
        
                    <div class="title input-container">                      
                        <input value="${title}" maxlength="65" onkeyup="inputMinLengthCheck(this, 10);" type="text" placeholder="Título do nível">
                        <span class="error"></span>
                    </div> 
            
                    <div class="min-percentage input-container">                       
                        <input value="${minPercentage}" maxlength="3" onkeyup="inputNumberCheck(this, 0, 100);" type="number" placeholder="% de acerto mínima">
                        <span class="error"></span>
                    </div> 
            
                    <div class="url input-container">                       
                        <input maxlength="255" value="${url}" onkeyup="inputUrlCheck(this)" type="text" placeholder="URL da imagem do nível">
                        <span class="error"></span>
                    </div> 
            
                    <div class="description input-container">                      
                        <textarea maxlength="1000" type="text" placeholder="Descrição do nível">${description}</textarea>
                        <span class="error"></span>
                    </div> 
                </div>
            </div>
        </li>`;
    }
}


const postQuizzSuccess = (response) => {
    
    const textTop = document.querySelector(`.${SCREENS.CREATE_QUIZZ} .title h1`);
    const currentQuizz = {id: response.data.id, key: response.data.key }
    const previousQuizzes = localStorage.getItem("quizz"); 
    let arrQuizzes = [];

    if (previousQuizzes !== null && previousQuizzes !== undefined){
        arrQuizzes = JSON.parse(previousQuizzes);
    }

    if(arrQuizzes.find((element) => element.id === currentQuizz.id) === undefined) { arrQuizzes.push(currentQuizz); }
    localStorage.setItem("quizz", JSON.stringify(arrQuizzes));
    
    textTop.innerHTML = TOP_TEXTS.CREATE_SUCCESS;
    openSubscreen(SUBSCREENS.CREATE_SUCCESS);

    const quizz_info = document.querySelector(".subscreen-create-success");
    quizz_info.innerHTML = `
        <div class="container-img">
            <img src="${quizzInCreation.image}" />
            <div class="gradient"></div>
            <span>${quizzInCreation.title}</span>
        </div>
        <button class="continue" onclick="openQuizz(${currentQuizz.id});">Acessar Quizz</button>
        <span onclick="goToQuizzList()" class="back">Voltar pra home</span>`;
    
    clearApp();
    retry = 0;
}

function postQuizz(){
    if (isEditing){
        const header = {}
        header.headers = {}
        header.headers["Secret-Key"] = currentKey;
        const id = quizzInCreation.id;
        delete quizzInCreation.id;

        axios.put(`${API_URL}/${id}`, quizzInCreation, header)
        .then(postQuizzSuccess)
        .catch(error => alert(ERROR_MESSAGE.EDIT_QUIZZ));
    } else {
        axios.post(API_URL, quizzInCreation)
        .then(postQuizzSuccess)
        .catch(error => alert(ERROR_MESSAGE.POST_QUIZZ));
    }

}

const removeErrorIfEmpty = (answerInput, UrlInput) => {
    if(answerInput.value.length + UrlInput.value.length === 0){
        setInputError(answerInput, false);
        setInputError(UrlInput, false);
    }
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
            } else {
                nextPageError();
            }

        } else

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
                inputEmptyCheck(rightText, SHOW_ERROR);
                inputUrlCheck(rightUrl, SHOW_ERROR);
                inputEmptyCheck(wrongText1, SHOW_ERROR);
                inputUrlCheck(wrongUrl1, SHOW_ERROR);
                inputEmptyCheck(wrongText2, SHOW_ERROR);
                inputUrlCheck(wrongUrl2, SHOW_ERROR);
                inputEmptyCheck(wrongText3, SHOW_ERROR);
                inputUrlCheck(wrongUrl3, SHOW_ERROR);

                removeErrorIfEmpty(wrongText1, wrongUrl1);
                removeErrorIfEmpty(wrongText2, wrongUrl2);
                removeErrorIfEmpty(wrongText3, wrongUrl3);

                answers =  [
                    {text: rightText.value, image: rightUrl.value, isCorrectAnswer: true},
                    {text: wrongText1.value, image: wrongUrl1.value, isCorrectAnswer: false},
                    {text: wrongText2.value, image: wrongUrl2.value, isCorrectAnswer: false},
                    {text: wrongText3.value, image: wrongUrl3.value, isCorrectAnswer: false},
                ];

                answers = answers.filter(answer => answer.text !== "" && answer.image !== "");

                quizzInCreation.questions[i] = {
                    title: text.value,
                    color: color.value,     
                }

                quizzInCreation.questions[i].answers = answers;
            });

            const isValid = subscreen.querySelectorAll("input.invalid").length === 0;

            if (isValid){
                textTop.innerHTML = TOP_TEXTS.CREATE_LEVELS;
                openSubscreen(SUBSCREENS.CREATE_LEVELS);
            } else {
                nextPageError()
            }

        } else

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


            if (isValid) {
                postQuizz()
            } else {
                nextPageError()
            }
                 
        }
    }
}