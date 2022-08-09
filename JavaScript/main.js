//MAIN MENU

const navLink = document.getElementsByTagName(`nav`);
let validation = localStorage.getItem("validation");
const goLogin = () => {window.open("/Html/LogIn.html", "_self")};

function areLoged (){
    
    let endSession = document.createElement(`button`);
    navLink[0].appendChild(endSession);

    endSession.className = `flex-item darkviolet`;
    endSession.innerHTML = `<a href="/Html/LogIn.html" id="endSession"> <img src="/0 - Imagenes/opcion-de-cerrar-sesion.png"> </a>`

    let userName = document.getElementById(`loguedUser`);
    userName.innerText = `${(JSON.parse(localStorage.getItem(`validation`)))[0].toUpperCase()}`;
    let endSessionButton = document.getElementsByClassName(`darkviolet`);
    endSessionButton[0].onclick = () => {
        localStorage.removeItem(`validation`);
    };
    

};

validation ? areLoged() : goLogin();




