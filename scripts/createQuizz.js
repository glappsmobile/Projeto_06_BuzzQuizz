const quizzInCreation = {}

function inputNumberCheck(input, min, max){

    if (input.value.length === 0 ) { return; }
    if (input.value < min) {
        input.value = min;
    } else if (input.value > max){
        input.value = max;
    }
}

function inputLengthCheck(input, minLength){
    //por enquanto ta com alerta, mas será trocado por um label de erro em cima do input
  //  if (input.value.length < minLength) { alert("O tamanho deve ser no mínimo "+minLength)}
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