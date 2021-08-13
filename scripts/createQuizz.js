const quizzInCreation = {}


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

function goToCreateQuizz(){
    openScreen(SCREENS.CREATE_QUIZZ);
    openSubscreen(SUBSCREENS.CREATE_BASIC);
}

function goToQuizzList(){
    openScreen(SCREENS.QUIZZ_LIST);
}

function goToNextPage(){
    if (current.screen === SCREENS.CREATE_QUIZZ){

        if (current.subscreen === SUBSCREENS.CREATE_BASIC) {
            openSubscreen(SUBSCREENS.CREATE_QUESTIONS);
            return;
        } 

        if (current.subscreen === SUBSCREENS.CREATE_QUESTIONS) {
            openSubscreen(SUBSCREENS.CREATE_LEVELS);
            return;
        }

        if (current.subscreen === SUBSCREENS.CREATE_LEVELS) {
            openSubscreen(SUBSCREENS.CREATE_SUCCESS);
            return;
        }
    }
}