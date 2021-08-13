const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

const SCREENS = {
    QUIZZ_LIST: "screen-quizz-list",
    CREATE_QUIZZ: "screen-create-quizz",
    QUIZZ_QUESTIONS: "screen-quizz-questions"
}

const SUBSCREENS = {
    CREATE_BASIC: "subscreen-create-basic",
    CREATE_QUESTIONS: "subscreen-create-questions",
    CREATE_LEVELS: "subscreen-create-levels",
    CREATE_SUCCESS: "subscreen-create-success"
}

const current = {
    screen: SCREENS.QUIZZ_LIST,
    subscreen: ""
}

let quizzes;
let thisQuizz = [];

function closeAllScreens(){
    current.screen = "";
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
}

function closeAllSubscreens(){
    current.subscreen = "";
    document.querySelectorAll(".subscreen").forEach(screen => screen.classList.add("hidden"));
}

function openScreen(classIdentifier){
    const screen = document.querySelector(`.${classIdentifier}`);

    if (screen !== null){ 
        closeAllScreens()
        current.screen = classIdentifier;
        screen.classList.remove("hidden");
        screen.scrollIntoView();
    } else {
        console.error(`A SCREEN ${classIdentifier} NÃO EXISTE.`);
    }
}

function openSubscreen(classIdentifier){
    const subscreen = document.querySelector(`.${classIdentifier}`);

    if (screen !== null){ 
        closeAllSubscreens();
        current.subscreen = classIdentifier;
        subscreen.classList.remove("hidden");
    } else {
        console.error(`A SUBSCREEN ${classIdentifier} NÃO EXISTE.`);
    }
}

function renderQuizzes() {
    let id_created = JSON.parse(localStorage.getItem("id"));

    const created = document.querySelector(".screen-quizz-list .created-quizzes");
    let created_list;
    const all_quizzes_list = document.querySelector(".screen-quizz-list .all-quizzes ul");

    if ( id_created !== null ) {
        const no_created_quizz = created.querySelector(".no-created-quizz");
        no_created_quizz.classList.add("hidden");

        created.innerHTML = `<div class="new-quizz"><h1>Seus Quizzes</h1><ion-icon name="add-circle" onclick="goToCreateQuizz()"></ion-icon></div><ul></ul>`;
        
        created_list = created.querySelector("ul");
    }
    else {
        id_created = [];
    }

    for ( let i = 0; i < quizzes.length; i++ ) {
        let is_created = false;

        for ( let j = 0; j < id_created.length; j++ ) {
            if ( quizzes[i].id === id_created[j] ) {
                is_created = true;
            }
        }

        if ( is_created ) {
            created_list.innerHTML += `<li class="quizz" id="${quizzes[i].id}" onclick="openQuizz(this);">
                    <img src="${quizzes[i].image}" />
                    <div class="gradient"></div>
                    <span class="title">${quizzes[i].title}</span>
                </li>`
        }
        else {
            all_quizzes_list.innerHTML += `<li class="quizz" id="${quizzes[i].id}" onclick="openQuizz(this);">
                    <img src="${quizzes[i].image}" />
                    <div class="gradient"></div>
                    <span class="title">${quizzes[i].title}</span>
                </li>`
        }
    }
}

function loadQuizzes(object) {
    quizzes = object.data;

    renderQuizzes();
}

function getQuizzes() {
    const promise = axios.get(API_URL);

    promise.then(loadQuizzes);
}

getQuizzes();

function randomSorter(){
    return Math.random() - 0.5;
}

function sortQuizzQuestions(){
    thisQuizz.questions.forEach((question, i) => {
        thisQuizz.questions[i].answers.sort(randomSorter);
    });
}

function isHexColorBright(color){
        const hex = color.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        return brightness > 150;
}

function openQuizz(element) {
    const promise = axios.get(`${API_URL}/${element.id}`)
    .then(response => {
        openScreen(SCREENS.QUIZZ_QUESTIONS); 
        thisQuizz = response.data;
        sortQuizzQuestions();
        renderQuestions() 
    });
}