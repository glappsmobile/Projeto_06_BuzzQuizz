const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

let quizzes;

function renderCreatedQuizzes() {
    const id_created = JSON.parse(localStorage.getItem("id"));

    const created = document.querySelector(".list-screen .created-quizzes");

    if ( id_created !== null ) {
        const no_created_quizz = created.querySelector(".no-created-quizz");
        no_created_quizz.classList.add("hidden");

        element.innerHTML = `<div class="new-quizz"><h1>Seus Quizzes</h1><ion-icon name="add-circle"></ion-icon></div><ul>`;

        //Procurar os ids do localStorage que estão no array quizzes
        //element.innerHTML += </ul>; //ao fim do for
    }
}

function renderQuizzes() {
    renderCreatedQuizzes();

    const all_quizzes_list = document.querySelector(".list-screen .all-quizzes ul");

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