//SUDOKU



let tries;
const triesElementLink = document.getElementById(`tries`);
const checkButton = document.getElementById(`check`);


//--------------------------------------------------------------------- COLOCACION PRIMEROS NUMEROS -----------------------------------------------------------------------
function putInitialNumbers (){
    forEachContainerElements(`TOPleft`, applyRandomValues());
    forEachContainerElements(`TOPmid`, applyRandomValues());
    forEachContainerElements(`TOPright`, applyRandomValues());
    forEachContainerElements(`MIDleft`, applyRandomValues());
    forEachContainerElements(`MIDmid`, applyRandomValues());
    forEachContainerElements(`MIDright`, applyRandomValues());
    forEachContainerElements(`BOTOMleft`, applyRandomValues());
    forEachContainerElements(`BOTOMmid`, applyRandomValues());
    forEachContainerElements(`BOTOMright`, applyRandomValues());
}

const randomNumber = (max, min) => {return Math.round(Math.random() * (max - min) + min)};

function forEachContainerElements (className, randomList){ //se despliegan los numeros iniciales
    let containerElements = document.getElementsByClassName(className);
    let howMany = randomList.length;
    for(let i = 0; i < howMany; i++ ){
        let randomBox = randomNumber(8,0);
        let containerFinale = containerElements[randomBox];
        let inputNumber = randomList[randomNumber(howMany - 1, 0)];
        if (checkItsOK(inputNumber, containerFinale.classList[1], containerFinale.classList[0], containerFinale.classList[3])){
            containerFinale.innerHTML = `${inputNumber}`; //segun la cantidad de numeros que contenga la lista, es la cantidad de numeros que se despliegarán
        }
        else {i--}
    }
}

function applyRandomValues (){ //se guardan 1 o 3 numeros al azar para desplegar
    let number = [];
    let i = 0;
    let random;
    
    while(i < randomNumber(5,2)) {
        random = randomNumber(9, 1);
        if (!number.includes(random)){
            number.push(random);
            i++;
        }
    }
    return number;
}
//--------------------------------------------------------------------- fin COLOCACION PRIMEROS NUMEROS ----------------------------------------------------------------------



//------------------------------------------------------------------FUNCION PARA CHEQUEAR LOS NUMEROS-------------------------------------------------------------------------
function checkItsOK (input, number, letter, box){
    const column = document.getElementsByClassName(letter);
    const row = document.getElementsByClassName(number);
    const thisBox = document.getElementsByClassName(box);

    let columnList = [];
    let rowList = [];
    let boxList = [];

    for(const el of column){
        columnList.push(el.innerHTML);
    }
    for(const el of row){
        rowList.push(el.innerHTML);
    }
    for(const el of thisBox){
        boxList.push(el.innerHTML);
    }

    const values = boxList.concat(columnList.concat(rowList));
    return values.includes(`${input}`) ? false : true; //si no se repite el numero en su fila, columna o caja, tira true, si no, false.
}
//--------------------------------------------------------------------------fin FUNCION PARA CHEQUEAR LOS NUMEROS-------------------------------------------------------------


function blockInitial () {
    let allBoxes = document.getElementsByClassName(`block`);

    for(const box of allBoxes){
        (box.innerHTML !== "") ? paintBlockNumbers(box) : addClassToEditableBoxes(box);
    }

}

const paintBlockNumbers = (box) => {
    box.classList.add(`painted`);
};
const addClassToEditableBoxes = (box) => {
    box.classList.add(`editable`);
};

//-----------------------------------------------------------------------------------------------------

function checkGame(){
    let allBoxes = document.getElementsByClassName(`block`);
    let errorArray = [];
    for(const box of allBoxes){
        (parseInt(box.innerText) > 0) ? (!checkItsOK(parseInt(box.innerText), box.classList[1], box.classList[0], box.classList[3]) && errorArray.push(`error`) ): errorArray.push(`error`);
    }
    (errorArray.length > 0) ? tries-- : Swal.fire({
        title: `¡ASOMBROSO!`,
        background: `rgb(1, 112, 112)`,
        color: `#FFF`,
        confirmButtonColor: `rgb(85, 253, 253)`
        });
}

function endGame(){
    Swal.fire({
        title: `Upss...`,
        text: `te quedaste sin intentos`,
        background: `rgb(1, 112, 112)`,
        color: `#FFF`,
        confirmButtonColor: `rgb(85, 253, 253)`
        });
}

//------------------------------------------------------------------------------------------------------
const gameExplication = async() => {
    const steps = ['1', '2', '3'];
    const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Siguiente >',
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' }
    });

    await Queue.fire({
    title: '¡SUDOKU!',
    background: `rgb(1, 112, 112)`,
    color: `#FFF`,
    confirmButtonColor: `rgb(85, 253, 253)`,
    currentProgressStep: 0,
    // optional class to show fade-in backdrop animation which was disabled in Queue mixin
    showClass: { backdrop: 'swal2-noanimation' },
    });
    await Queue.fire({
    title: 'Coloca los números de manera tal que no haya ninguno igual en esa fila, columna y caja',
    background: `rgb(1, 112, 112)`,
    color: `#FFF`,
    confirmButtonColor: `rgb(85, 253, 253)`,
    currentProgressStep: 1
    });
    await Queue.fire({
    title: 'Cuando creas que está listo, presiona el botón de "CHECK" ... no descuides tus intentos :O',
    background: `rgb(1, 112, 112)`,
    color: `#FFF`,
    confirmButtonColor: `rgb(85, 253, 253)`,
    currentProgressStep: 2,
    confirmButtonText: '¡LO TENGO!',
    // optional class to show fade-out backdrop animation which was disabled in Queue mixin
    showClass: { backdrop: 'swal2-noanimation' },
    });
};
//-----------------------------------------------------------------------------------------------------------------------


gameExplication();
tries = 3;
triesElementLink.innerHTML = `${tries}`;
putInitialNumbers();
blockInitial();

const editables = document.getElementsByClassName(`editable`);

for(const elem of editables){
    let i = 1;
    elem.onclick = () => {
        elem.innerHTML = `${i}`;
        if (elem.innerHTML < 9) i++;
        else {i = 1;}
    };
}

checkButton.onclick = () =>{
    checkGame();
    if (tries >= 0 ) triesElementLink.innerHTML = `${tries}`;
    (tries < 0) && endGame();
};