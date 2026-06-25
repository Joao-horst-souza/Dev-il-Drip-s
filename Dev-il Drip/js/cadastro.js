
const form = document.querySelector(".container-cadastro"); 

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("exampleInputName");
    const email = document.getElementById("exampleInputEmail1");
    const senha = document.getElementById("exampleInputPassword");
    const mensagem = document.getElementById("mensagem");

    let valido = true;

    if(nome.value.trim().length < 3){
        nome.classList.add("is-invalid");
        nome.classList.remove("is-valid");
        valido = false;
    }else{
        nome.classList.add("is-valid");
        nome.classList.remove("is-invalid");
    }

    if(email.value.trim() === "" || !email.value.includes("@")){
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
        valido = false;
    }else{
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
    }

    if(senha.value.length < 6){
        senha.classList.add("is-invalid");
        senha.classList.remove("is-valid");
        valido = false;
    }else{
        senha.classList.add("is-valid");
        senha.classList.remove("is-invalid");
    }

    if(valido == true){
        mensagem.innerHTML = `
            <div class="alert alert-success mt-3">
                Cadastro realizado com sucesso!
            </div>
        `;
    }else{
        mensagem.innerHTML = `
            <div class="alert alert-danger mt-3">
                Corrija os campos destacados.
            </div>
        `;
    }

});