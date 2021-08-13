
//TELA 3 LEVELS JÁ PREENCHIDOS
function renderCreateLevelsForm(quantityLevels){
    const subscreen = document.querySelector(`.${SUBSCREENS.CREATE_LEVELS}`);
    const list = subscreen.querySelector("ul.levels");

    for (let i = 1; i <= quantityLevels; i++) {

        let visibility = (i === 1) ?  "" : "collapsed";

        list.innerHTML += `
        <li class="level ${visibility}">
            <div class="holder" onclick="uncollapse(this)">
                <span> Nível ${i}</span>
                <img src="assets/icon-create.png"/>
            </div>
            <div class="body">
                <h2>Nível ${i}</h2>
                <div class="input-group no-margin-top main">
            
                    <div class="title input-container">
                        <span class="error"></span>
                        <input value="Titulo do Level ${i}" onblur="inputMinLengthCheck(this, 10);" type="text" placeholder="Título do nível">
                    </div> 
            
                    <div class="min-percentage input-container">
                        <span class="error"></span>
                        <input value="0" onblur="inputNumberCheck(this, 0, 100);" type="number" placeholder="% de acerto mínima">
                    </div> 
            
                    <div class="url input-container">
                        <span class="error"></span>
                        <input value="https://i.imgur.com/TSDlJBs.jpg" onblur="inputUrlCheck(this)" type="text" placeholder="URL da imagem do nível">
                    </div> 
            
                    <div class="description input-container">
                        <span class="error"></span>
                        <textarea type="text" placeholder="Descrição do nível">UMA DESCRIÇÃO BEM LONGA COM BEEM MAIS DE 30 CARACTERES, TEM UNS QUARENTA OU SETENTA</textarea>
                    </div> 
            
                </div>
            </div>
        </li>`;
    }
}


//TELA 3 COM PERGUNTAS JÁ PREENCHIDAS


function renderCreateQuestionForm(quantityQuestions){
    const subscreen = document.querySelector(`.${SUBSCREENS.CREATE_QUESTIONS}`);
    const list = subscreen.querySelector("ul.questions");

    for (let i = 1; i <= quantityQuestions; i++) {

        let visibility = (i === 1) ?  "" : "collapsed";

        list.innerHTML += `
<li id="question-${i}" class="question ${visibility}">
    <div class="holder" onclick="uncollapse(this)">
        <span> Pergunta ${i}</span>
        <img src="assets/icon-create.png"/>
    </div>
    <div class="body">
        <h2>Pergunta ${i}</h2>
        <div class="input-group no-margin-top main">
            <div class="text input-container">
                <span class="error"></span>
                <input value="EXAMPLE TITLE EXAMPLE TITLE" type="text" onblur="inputMinLengthCheck(this, 20);" placeholder="Texto da pergunta">
            </div> 
            <div class="color input-container">
                <span class="error"></span>
                <input value="#FFFFFF" type="text" onclick="inputHexColorCheck(this)" placeholder="Cor de fundo da pergunta">
            </div> 
    </div>
    <h2>Resposta correta</h2>
    <div class="input-group no-margin-top right-answer">
        <div class="text input-container">
            <span class="error"></span>
            <input value="RESPOSTA CORRETA" type="text" onblur="inputMinLengthCheck(this, 1);" placeholder="Resposta correta">
        </div> 
        <div class="url input-container">
            <span class="error"></span>
            <input value="https://i.imgur.com/TSDlJBs.jpg" type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem">
        </div> 
    </div>
    <h2>Respostas incorreta</h2>
    <div class="input-group no-margin-top wrong-answer-1">
        <div class="text input-container">
            <span class="error"></span>
            <input value="RESPOSTA ERRADA 1" onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 1">
        <div class="url input-container">
            <span class="error"></span>
            <input value="https://i.imgur.com/TSDlJBs.jpg" type="text"  onblur="inputUrlCheck(this)"placeholder="URL da imagem 1">
    </div>
    <div class="input-group wrong-answer-2">
        <div class="text input-container">
            <span class="error"></span>
            <input value="RESPOSTA ERRADA 2" onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 2">
        </div>
        <div class="url input-container">
            <span class="error"></span>
            <input value="https://i.imgur.com/TSDlJBs.jpg" type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem 2">
        </div>
    </div>
    <div class="input-group wrong-answer-3">
        <div class="text input-container">
            <span class="error"></span>
            <input value="RESPOSTA ERRADA 3" onblur="inputMinLengthCheck(this, 1);" type="text" placeholder="Resposta incorreta 3">
        </div>
        <div class="url input-container">
            <span class="error"></span>
            <input value="https://i.imgur.com/TSDlJBs.jpg" type="text" onblur="inputUrlCheck(this)" placeholder="URL da imagem 3">
        </div>
    </div>
</li>`;
    }
}
