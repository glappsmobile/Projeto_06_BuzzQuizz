const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

let quizzes;

function renderCreatedQuizzes() {
    const id_created = JSON.parse(localStorage.getItem("id"));

    const created = document.querySelector(".screen-quizz-list .created-quizzes");

    if ( id_created !== null ) {
        const no_created_quizz = created.querySelector(".no-created-quizz");
        no_created_quizz.classList.add("hidden");

        created.innerHTML = `<div class="new-quizz"><h1>Seus Quizzes</h1><ion-icon name="add-circle" onclick="openScreen(3, 1)"></ion-icon></div><ul></ul>`;
        
        const created_list = created.querySelector("ul");

        for ( let i = 0; i < id_created.length; i++ ) {
            for ( let j = 0; j < quizzes.length; j++ ) {
                if ( id_created[i] === quizzes[j].id ) {
                    created_list.innerHTML += `<li class="quizz">
                    <img src="${quizzes[i].image}" />
                    <div class="gradient"></div>
                    <span class="title">${quizzes[i].title}</span>
                    </li>`
                }
            }
        }
    }
}

function renderQuizzes() {
    renderCreatedQuizzes();

    const all_quizzes_list = document.querySelector(".screen-quizz-list .all-quizzes ul");

    for ( let i = 0; i < quizzes.length; i++ ) {
        all_quizzes_list.innerHTML += `<li class="quizz">
        <img src="${quizzes[i].image}" />
        <div class="gradient"></div>
        <span class="title">${quizzes[i].title}</span>
        </li>`
    }

    //Ainda falta a lógica de não colocar aqui os quizzes criados pelo usuário
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