const quizzInCreation = {}

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