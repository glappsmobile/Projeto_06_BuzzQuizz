const deleteQuizz = (name, id, key) => {
    const header = {}
    header.headers = {}
    header.headers["Secret-Key"] = key;
    loading.start();
    if (confirm(`Tem Certeza que deseja deletar o quizz "${name}"?`)){
        axios.delete(`${API_URL}/${id}`, header)
        .then(response => {
            getQuizzes(response);
            loading.stop();
        })
        .catch(error => {
            alert("Erro ao deletar quizz.");
            loading.stop();
        });
    }
}



function renderQuizzes() {
    let myQuizzes = JSON.parse(localStorage.getItem("quizz"));
    const created = document.querySelector(".screen-quizz-list .created-quizzes");
    const all_quizzes_list = document.querySelector(".screen-quizz-list .all-quizzes ul");
    let hasMyQuizz = false;
    let created_list;
    
    if ( myQuizzes !== null ) {
        created.innerHTML = `
            <div class="new-quizz">
                <h1>Seus Quizzes</h1>
                <ion-icon name="add-circle" onclick="goToCreateQuizz()"></ion-icon>
            </div>
            <ul></ul>`;

        created_list = created.querySelector("ul");
    } else {
        myQuizzes = [];
    }
    
    quizzes.forEach((quizz, i) => {
        const hasKey = myQuizzes.find(element => element.id === quizz.id);
        const id = quizz.id;
        const image = quizz.image;
        const title = quizz.title;
        if (hasKey){
            hasMyQuizz = true;
            created_list.innerHTML += `
                <li class="quizz">
                    <img src="${image}" />
                    <div class="gradient" onclick="openQuizz(${id});"></div>
                    <span class="title">${title}</span>
                    <div class="container-options">
                        <ion-button title="Editar" onClick="goToCreateQuizz('${id}', '${hasKey.key}')">
                            <ion-icon name="create-outline"></ion-icon>
                        </ion-button>
                        <ion-button title="Deletar" onClick="deleteQuizz('${title}', '${id}', '${hasKey.key}')">
                            <ion-icon name="trash-outline" ></ion-icon>
                        </ion-button>
                    </div>
                </li>`
        } else {

            all_quizzes_list.innerHTML += `
                <li class="quizz" onclick="openQuizz(${id});">
                    <img src="${image}" />
                    <div class="gradient"></div>
                    <span class="title">${title}</span>
                </li>`
        }
    });

    if (!hasMyQuizz) {
        created.innerHTML = `
            <div class="no-created-quizz">
                <span>Não encontramos o seu quizz :(</span>
                <button class="create-quiz" onclick="goToCreateQuizz()">Criar Quizz</button>
            </div>`
    }
}

function loadQuizzes(object) {
    quizzes = object.data;
    renderQuizzes();
}

function getQuizzes() {
    loading.start();

    axios.get(API_URL)
    .then(response => {
        loading.stop();
        loadQuizzes(response);
        retry = 0;
    })
    .catch(error => {
        loading.stop();
        ajaxRetry(getQuizzes);
    })
}