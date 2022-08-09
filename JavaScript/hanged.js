// HANGED GAME

let fatherOfWords;
let linkInputButton; 
let linkPlayAgainButton; 
let linkWrongBox;



let riddleWord;
let linkTries;
let tries;
let input; 

let achived = [];
let wrong = [];



//----------------- ENGLOBAR ---------------------------------------------------

function functMainProcess (number){

    if(tries > 0){
    input = linkInputButton[number].innerText;
    addCorrectLetter(input);
    youWin();
    showTries(tries);
    addWrongLetter();
    }
    else { Swal.fire({
        title: `${riddleWord.toUpperCase()}`,
        text: `Upss...te quedaste sin intentos`,
        background: `rgb(1, 112, 112)`,
        color: `#FFF`,
        confirmButtonColor: `rgb(85, 253, 253)`

        });
    }

}

//----------------- fin ENGLOBAR -----------------------------------------------

//----------------- Conseguir palabras ----------------------------------------- //

const catchWords = async() => {
    const fetchingData = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
                    const toJSONdata = await fetchingData.json();
                    riddleWord = toJSONdata[0].toLowerCase();
                    wordVerificator(riddleWord);


};

const wordVerificator = (word) => {
    let unusuallyLetters = ["á", "é", "í", "ó", "ú", "ü", " ", ".", ","];
    let isTrue;
    for(let i = 0; i < word.length; i++){
       if ( word.includes(unusuallyLetters[i]) ) isTrue = true;
    }
    isTrue ? playAgainFunction() : doWordInHTML(word);
};
//------------------fin Conseguir palabras -------------------------------------

//-----------------Construcción de espacios para las letras---------------------
function doWordInHTML (word){
    for(let i = 0; i < word.length; i++){
        eachRiddleLetter();
    } 
}

function eachRiddleLetter() {
    let HTMLLetter = document.createElement("p");
    fatherOfWords.appendChild(HTMLLetter);
    
    HTMLLetter.innerText = " ";
    HTMLLetter.className = "flex-gameItem";
}

function cleanHTMLWord (){
    let HTMLRubber = document.getElementsByClassName("flex-gameItem");
    let rubberIndex = 0;
    while(HTMLRubber.length > 0){
        HTMLRubber[rubberIndex].remove();
    }
}

//------------------------------------------------------------------------------


//-----------------Funcionalidad de las letras en HTML--------------------------

function addCorrectLetter(letter) {
        Xcounter = 0;
        for(let i = 0; i < riddleWord.length; i++){
            if(letter === riddleWord[i] && !achived.includes(letter) && riddleWord[i] !== " "){
                achived.push(letter);
                changeKeyColor(letter, "green");
            }
            else {Xcounter++}
        }
        if (Xcounter === riddleWord.length && !wrong.includes(letter) && !achived.includes(letter)){
            tries--;
            wrong.push(letter);
            changeKeyColor(letter, "red");
        }
        else if(Xcounter === riddleWord.length) repeatAdvisorToasty();
    changeHTMLLetter();
}

function changeHTMLLetter() {
    let arrayOfWordsIncognitas = document.getElementsByClassName("flex-gameItem");
    let recorreword = 0;
    for(const element of arrayOfWordsIncognitas){
        for(const acierto of achived){
            if(acierto === riddleWord[recorreword]){
                element.innerText = acierto;
            }
        }
    if(recorreword < riddleWord.length){recorreword++}
    }
}

const addWrongLetter = () => {linkWrongBox.innerText = `${wrong.join(" - ")}`;};
    
function youWin (){
    let win = 0;
    for(let i = 0; i < riddleWord.length; i++){
        achived.includes(riddleWord[i]) && win ++;
    }
    if (win === riddleWord.length){
        Swal.fire({
          title: `¡ASOMBROSO!`,
          background: `rgb(1, 112, 112)`,
          color: `#FFF`,
          confirmButtonColor: `rgb(85, 253, 253)`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Volver a jugar',
          denyButtonText: `Salir`,
            }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            playAgainFunction()} 
          else if (result.isDenied) {
            window.open("https://lacuevadelgamer.neocities.org/", "_self");
          }
        });
    }
    
}

function playAgainFunction () {
    cleanHTMLWord();
        achived.push(".");
        wrong.push(".");
        while(achived.includes(".") || wrong.includes(".")){
            achived.shift();
            wrong.shift();
        }                                       //reset
        catchWords()                            //
        tries = 6;                              //
        showTries(tries);                       //
        addWrongLetter();                       //
        resetKeyColor();                        //
}

        // Cambiar colores //

function changeKeyColor (key, color) {
    let HTMLKey = document.getElementById(key);
    HTMLKey.className += ` ${color}`;
}

function resetKeyColor(){
    let allKeys = document.getElementsByClassName("key");
    for (const element of allKeys){
        element.classList.remove("green") || element.classList.remove("red");
    }
}
        // fin Cambiar colores //
//------------------------------------------------------------------------------

//------------------------------- tries -------------------------------------
function showTries(tries) {
    linkTries.innerText = `${tries}`; 
}
//------------------------------------------------------------------------------

//----------------------- PLAY -------------------------------------------------
function playGame() {
    fatherOfWords = document.getElementById("flex-childgameContainer");
    linkInputButton = document.getElementsByClassName("key");
    linkPlayAgainButton = document.getElementById("flex-playAgain");
    linkTries = document.getElementById("flex-tries");
    linkWrongBox = document.getElementById("flex-wrongLetter");

    catchWords();

    tries = 6;
    showTries(tries);

    linkInputButton[0].onclick = () => {
    functMainProcess(0);
    };
    linkInputButton[1].onclick = () => {
        functMainProcess(1);
    };
    linkInputButton[2].onclick = () => {
        functMainProcess(2);
    };
    linkInputButton[3].onclick = () => {
        functMainProcess(3);
    };
    linkInputButton[4].onclick = () => {
        functMainProcess(4);
    };
    linkInputButton[5].onclick = () => {
        functMainProcess(5);
    };
    linkInputButton[6].onclick = () => {
        functMainProcess(6);
    };
    linkInputButton[7].onclick = () => {
        functMainProcess(7);
    };
    linkInputButton[8].onclick = () => {
        functMainProcess(8);
    };
    linkInputButton[9].onclick = () => {
        functMainProcess(9);
    };
    linkInputButton[10].onclick = () => {
        functMainProcess(10);
    };
    linkInputButton[11].onclick = () => {
        functMainProcess(11);
    };
    linkInputButton[12].onclick = () => {
        functMainProcess(12);
    };
    linkInputButton[13].onclick = () => {
        functMainProcess(13);
    };
    linkInputButton[14].onclick = () => {
        functMainProcess(14);
    };
    linkInputButton[15].onclick = () => {
        functMainProcess(15);
    };
    linkInputButton[16].onclick = () => {
        functMainProcess(16);
    };
    linkInputButton[17].onclick = () => {
        functMainProcess(17);
    };
    linkInputButton[18].onclick = () => {
        functMainProcess(18);
    };
    linkInputButton[19].onclick = () => {
        functMainProcess(19);
    };
    linkInputButton[20].onclick = () => {
        functMainProcess(20);
    };
    linkInputButton[21].onclick = () => {
        functMainProcess(21);
    };
    linkInputButton[22].onclick = () => {
        functMainProcess(22);
    };
    linkInputButton[23].onclick = () => {
        functMainProcess(23);
    };
    linkInputButton[24].onclick = () => {
        functMainProcess(24);
    };
    linkInputButton[25].onclick = () => {
        functMainProcess(25);
    };
    linkInputButton[26].onclick = () => {
        functMainProcess(26);
    };

    linkPlayAgainButton.onclick = () => {
        playAgainFunction();
    };
};

//--------------------- FIN PLAY -----------------------------------------------

const repeatAdvisorToasty = () => {Toastify({
    text: "Ya clickeaste esa letra",
    duration: 3000,
    position: "right",
    gravity : `bottom`,
    transform: `translate(0px)`,
    className: `toast`,
    style: {
      background: `rgb(85, 253, 253)`,
      color: `#000000` 
      
    }
  }).showToast();
}
//-----------------------------------------------------------------------------------

playGame();

const gameExplication = async() => {
    const steps = ['1', '2', '3']
    const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Siguiente >',
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' }
    })

    await Queue.fire({
    title: '¡El clasico juego del Ahorcado!',
    background: `rgb(1, 112, 112)`,
    color: `#FFF`,
    confirmButtonColor: `rgb(85, 253, 253)`,
    currentProgressStep: 0,
    // optional class to show fade-in backdrop animation which was disabled in Queue mixin
    showClass: { backdrop: 'swal2-noanimation' },
    })
    await Queue.fire({
    title: 'Adivina la palabra usando las letras a disposición',
    background: `rgb(1, 112, 112)`,
    color: `#FFF`,
    confirmButtonColor: `rgb(85, 253, 253)`,
    currentProgressStep: 1
    })
    await Queue.fire({
    title: 'Tienes 6 intentos... no los desperdicies ;)',
    background: `rgb(1, 112, 112)`,
    color: `#FFF`,
    confirmButtonColor: `rgb(85, 253, 253)`,
    currentProgressStep: 2,
    confirmButtonText: '¡LO TENGO!',
    // optional class to show fade-out backdrop animation which was disabled in Queue mixin
    showClass: { backdrop: 'swal2-noanimation' },
    })
}

gameExplication();
