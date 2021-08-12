const VISIBILITY = Object.freeze({
    VISIBLE: false,
    HIDDEN: true,
})

function closeAllScreens(){
    const screenCount = 3;

    for (let i = 0; i < screenCount; i++){
        const screen = document.querySelector(`.screen${i+1}`);

        if (screen !== null) { 
            screen.classList.add("hidden"); 
            toggleAllSections(screen, VISIBILITY.HIDDEN);
        }
    }
}

function toggleAllSections(view, newVisibility){
    const sections = view.querySelectorAll("section");
    if (sections.length > 0) { sections.forEach( section => section.classList.toggle("hidden", newVisibility)); }
}

function openScreen(screenIndex, screenSectionIndex){
    closeAllScreens()

    const screen = document.querySelector(`.screen${screenIndex}`);

    if (screen !== null){
        screen.classList.remove("hidden");
        const section = screen.querySelector(`.section${screenSectionIndex}`);

        if (screenIndex === 1) {toggleAllSections(screen, VISIBILITY.VISIBLE);}
        else { toggleAllSections(screen, VISIBILITY.HIDDEN); }

        if (section !== null){ section.classList.remove("hidden"); }

    }

    //Se der um openScreen(3, 2) por exemplo, vai esconder todas as screens, todas as sections dentro das screens
    //E depois vai tirar o hidden da screen3 e da section2 dentro da screen3
}

