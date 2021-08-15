let API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

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

const ERROR_MESSAGE = {
    OPEN_QUIZZ: "Não foi possível carregar este quizz, tente novamente mais tarde.",
    POST_QUIZZ: "Ocorreu um erro ao finalizar o quizz."
}

const RETRY_CONFIG = {
    MAX: 3,
    DELAY: 1000
}

const PERSISTENT = true;
let intervalGetQuizz;
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
    clearGetQuizzInterval();
    const screen = document.querySelector(`.${classIdentifier}`);

    if (screen !== null){ 
        closeAllScreens();
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

function goToCreateQuizz(){
    openScreen(SCREENS.CREATE_QUIZZ);
    openSubscreen(SUBSCREENS.CREATE_BASIC);
}

function goToQuizzList(){
    thisQuizz = {}
    openScreen(SCREENS.QUIZZ_LIST);
    getQuizzes();
}

function isHexColorBright(color){
        const hex = color.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        return brightness > 210;
}

const StringUtils = {
    isBlank: string => (!string || string.replace(/ /g, "").length === 0)
}

const clearGetQuizzInterval = () => {
    if (intervalGetQuizz !== undefined){
        clearInterval(intervalGetQuizz);
        intervalGetQuizz = undefined;
    }
}

const clearMain = () => {
    retry = 0;
    clearGetQuizzInterval();
}

const ajaxRetry = (retryFunction, errorFunction, ...args) => {

    if (retry >= RETRY_CONFIG.MAX){
        retry = 0;
        if (errorFunction !== undefined) {errorFunction()}
    } else {
        setTimeout(retryFunction, RETRY_CONFIG.DELAY, ...args);
        retry++;
    }
}

function openQuizz(element) {
    axios.get(`${API_URL}/${element.id}`)
    .then(response => {
        retry = 0;
        openScreen(SCREENS.QUIZZ_QUESTIONS); 
        thisQuizz = response.data;
        renderQuestions();
    })
    .catch(error => ajaxRetry(openQuizz, () => alert(ERROR_MESSAGE.OPEN_QUIZZ), element));
}

function initialConfig(){
    getQuizzes();
}
