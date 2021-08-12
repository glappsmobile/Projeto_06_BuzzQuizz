function closeAllScreens(){
    const screenCount = 3;

    for (let i = 0; i < screenCount; i++){
        const screen = document.querySelector(`.screen${i+1}`);

        if (screen !== null) { 
            screen.classList.add("hidden"); 
            const sections = screen.querySelectorAll("section");
            if (sections.length > 0) { sections.forEach( section => section.classList.add("hidden")); }
        }
    }
}

function openScreen(screenIndex, screenSectionIndex){
    closeAllScreens()

    const screen = document.querySelector(`.screen${screenIndex}`);

    if (screen !== null){
        screen.classList.remove("hidden");
        const section = screen.querySelector(`.section${screenSectionIndex}`);

        if (section !== null){ section.classList.remove("hidden"); }
    }

    //Se der um openScreen(3, 2) por exemplo, vai esconder todas as screens, todas as sections dentro das screens
    //E depois vai tirar o hidden da screen3 e da section2 dentro da screen3
}
