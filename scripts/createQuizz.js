function closeAllScreens(){
    const screens = document.querySelectorAll(".screen");
    const subscreens = document.querySelectorAll(".subscreen");

    screens.forEach(screen => {
        screen.classList.add("hidden"); 
    });

    subscreens.forEach(subscreen => {
        subscreen.classList.add("hidden"); 
    });
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

openScreen(3,1)
