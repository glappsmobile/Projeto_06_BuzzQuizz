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

const KEYS = {
    ENTER: "Enter"
}

const current = {
    screen: SCREENS.QUIZZ_LIST,
    subscreen: ""
}

const ERROR_MESSAGE = {
    OPEN_QUIZZ: "Não foi possível carregar este quizz.",
    POST_QUIZZ: "Ocorreu um erro ao finalizar o quizz.",
    EDIT_QUIZZ: "Não foi possível editar este quizz."
}

const RETRY_CONFIG = {
    MAX: 3,
    DELAY: 1000
}

let isEditing = false;
let currentKey = "";
let quizzes;
let thisQuizz = [];
let retry = 0;

const loading = {
    start: () => {
        loading.toggle(false);
    },
    stop: () => {
        loading.toggle(true);
    },
    toggle: (isLoading) =>{ 
        document.querySelector(".container-loading").classList.toggle("hidden", isLoading);
    }   
}

function closeAllScreens(){
    current.screen = "";
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
}

function closeAllSubscreens(){
    current.subscreen = "";
    document.querySelectorAll(".subscreen").forEach(screen => screen.classList.add("hidden"));
}

function scrollToView(view, extra){
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

const fillBasicForm = () => {
    const subscreen = document.querySelector(`.${SUBSCREENS.CREATE_BASIC}`);
    const title = subscreen.querySelector(".title input");
    const url = subscreen.querySelector(".url input");
    const quantityQuestions = subscreen.querySelector(".quantity-questions input");
    const quantityLevels = subscreen.querySelector(".quantity-levels input"); 

    const questionValue = quizzInCreation.questions.length; 
    const levelValue = quizzInCreation.levels.length; 

    title.value = quizzInCreation.title;
    url.value = quizzInCreation.image;
    quantityQuestions.value = questionValue;
    quantityLevels.value = levelValue;
}

function goToCreateQuizz(id, key){

    if (id !== undefined){
        isEditing = true;
        currentKey = key;
        loading.start();
        axios.get(`${API_URL}/${id}`)
        .then(response => {
            quizzInCreation = response.data;
            fillBasicForm();
            openScreen(SCREENS.CREATE_QUIZZ);
            openSubscreen(SUBSCREENS.CREATE_BASIC);
            loading.stop();
        })
        .catch(error => {
            alert(ERROR_MESSAGE.EDIT_QUIZZ);
            loading.stop();
        });
    } else {
        isEditing = false;
        openScreen(SCREENS.CREATE_QUIZZ);
        openSubscreen(SUBSCREENS.CREATE_BASIC);
    }
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

const ajaxRetry = (retryFunction, errorFunction, ...args) => {
    if (retry >= RETRY_CONFIG.MAX){
        retry = 0;
        if (errorFunction !== undefined) {errorFunction()}
    } else {
        setTimeout(retryFunction, RETRY_CONFIG.DELAY, ...args);
        retry++;
    }
}

function openQuizz(id) {
    loading.start();
    axios.get(`${API_URL}/${id}`)
    .then(response => {
        openScreen(SCREENS.QUIZZ_QUESTIONS); 
        thisQuizz = response.data;
        renderQuestions();
        loading.stop();
    })
    .catch(error => {
        alert(ERROR_MESSAGE.OPEN_QUIZZ);
        loading.stop();
    });
}

function initialConfig(){
    getQuizzes();
}
