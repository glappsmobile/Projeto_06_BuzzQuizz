const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

const SCREENS = {
    QUIZZ_LIST: "screen-quizz-list",
    CREATE_QUIZZ: "screen-quizz-create",
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
let retry = 0;

function closeAllScreens(){
    current.screen = "";
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
}

function closeAllSubscreens(){
    current.subscreen = "";
    document.querySelectorAll(".subscreen").forEach(screen => screen.classList.add("hidden"));
}

function scrollToView(view, extra){
    console.log("scrolling to")
    console.log(view)
    //CALCULA A ALTURA DO HEADER PARA NÃO DEIXAR PARTE DA VIEW ESCONDIDA ATRÁS DELE
    const headerHeight = document.querySelector("header").clientHeight;
    let yPosition = view.getBoundingClientRect().top - headerHeight;
    if (extra !== undefined) { yPosition -= extra}
    document.documentElement.scrollTop +=  yPosition;
}

function scrollToPageTop(){
    document.documentElement.scrollIntoView()
}

function openScreen(classIdentifier){
    const screen = document.querySelector(`.${classIdentifier}`);

    if (screen !== null){ 
        closeAllScreens()
        current.screen = classIdentifier;
        screen.classList.remove("hidden");
        scrollToPageTop();
    }
}

function openSubscreen(classIdentifier){
    const subscreen = document.querySelector(`.${classIdentifier}`);

    if (screen !== null){ 
        closeAllSubscreens();
        current.subscreen = classIdentifier;
        subscreen.classList.remove("hidden");
        scrollToPageTop();
    }
}

function randomSorter(){
    return Math.random() - 0.5;
}


function isHexColorBright(color){
        const hex = color.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        return brightness > 210;
}

function openQuizz(element) {
    const promise = axios.get(`${API_URL}/${element.id}`)
    .then(response => {
        openScreen(SCREENS.QUIZZ_QUESTIONS); 
        thisQuizz = response.data;
        renderQuestions() 
    });
}

function initialConfig(){
    getQuizzes();
}
