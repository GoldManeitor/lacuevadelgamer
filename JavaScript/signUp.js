let signUpInputs = document.getElementsByClassName("signUpInput");
let signUpForm = document.getElementById("signUp");
let errorMessage = document.querySelector(`.errorMessage`);
const unserializatedListOfUsers = JSON.parse(localStorage.getItem(`listOfUsers`)) || [];
let newUser;
let storageName;

//-----------------------------------------------------------------------------------------------------------------------
class addUser {
    constructor(name, pass, email){
        this.name = name;
        this.password = pass;
        this.email = email;
    }
};

function nameAlreadyTaked (nameInput) {
    let notTaked = [];
    for(const user of unserializatedListOfUsers) nameInput === user.name ? notTaked.push(`true`) : notTaked.push(`false`);
    return notTaked.includes(`true`);
};
const EqualPass = (pass1, pass2) => { return (pass1 === pass2)};
//-----------------------------------------------------------------------------------------------------------------------

signUpForm.onsubmit = (e) => {
    e.preventDefault();
    const promiseAlreadyTaken = (res) => {
        return new Promise((resolve, reject) => {
            !res ? resolve(EqualPass(signUpInputs[1].value, signUpInputs[2].value)) : reject(`El nombre de usuario está usado, prueba otro.`)
                
        })
    }
    
    promiseAlreadyTaken(nameAlreadyTaked(signUpInputs[0].value))
        .then ( (response) => { 
            if (response){
                newUser = new addUser(signUpInputs[0].value,signUpInputs[1].value,signUpInputs[3].value);
                unserializatedListOfUsers.push(newUser);
                localStorage.setItem(`listOfUsers`, JSON.stringify(unserializatedListOfUsers));
                Swal.fire({
                    title: `¡Usuario creado con éxito!`,
                    text: `Bienvenido cavernícola`,
                    background: `rgb(1, 112, 112)`,
                    color: `#FFF`,
                    confirmButtonColor: `rgb(85, 253, 253)`})
                
                setTimeout(() => {window.open("LogIn.html", "_self")} , 3000);
                }
            else { 
                Swal.fire({
                title: `Las contraseñas no coinciden.`,
                background: `rgb(1, 112, 112)`,
                color: `#FFF`,
                confirmButtonColor: `rgb(85, 253, 253)`})
                };
            }
        )
        .catch(error => errorMessage.innerText = error);
    
};

