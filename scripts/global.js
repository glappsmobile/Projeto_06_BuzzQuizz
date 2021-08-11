const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

let quizzes;

function renderQuizzes() {
    const id_created = JSON.parse(localStorage.getItem("id"));

    const created = document.querySelector(".list-screen .created-quizzes");

    if ( id_created === undefined ) {
        const no_created_quizz = created.querySelector(".no-created-quizz");
        no_created_quizz.classList.add("hidden");
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