let loginForm = document.getElementById("flex-loginForm");
let errorMessage = document.querySelector(`.loginErrorMessage`);
let Question;

//-----------------------------------------------------------------------------------------------------------------------
function goMain(user){
    logAlreadyTrue(user);
    window.open("../index.html", "_self");
};



const userValidationMessage = (validation) => {
    return new Promise((resolve, reject) => {
        validation ? resolve(true) : reject(`Las credenciales no coinciden`);
    })
}

function loginValidation(name, pass){
    let unserializatedListOfUsers = JSON.parse(localStorage.getItem(`listOfUsers`)) || [];
    for(const user of unserializatedListOfUsers) {
        ((user.name === name) && (user.password === pass)) ? Question = true : Question = false ;
        if(Question) break;
    };
    return Question;
};

const logAlreadyTrue = (user) => { 
    let loguedUser = [user , true];
    localStorage.setItem(`validation`, JSON.stringify(loguedUser)) 
};
//-----------------------------------------------------------------------------------------------------------------------


loginForm.onsubmit = (e) => {
        e.preventDefault();
        let formInps = e.target;
        userValidationMessage(loginValidation(formInps.children[0].value, formInps.children[1].value))
            .then( response => response && goMain(formInps.children[0].value) )
            .catch( error => errorMessage.innerText = error);
        
};