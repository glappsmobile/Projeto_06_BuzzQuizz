
function renderQuizzes() {
    let id_created = JSON.parse(localStorage.getItem("id"));

    const created = document.querySelector(".screen-quizz-list .created-quizzes");
    let created_list;
    const all_quizzes_list = document.querySelector(".screen-quizz-list .all-quizzes ul");

    if ( id_created !== null ) {
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