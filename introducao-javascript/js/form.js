var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPaciente(form);
    var erros = pacienteEhValido(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    } 

    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    adicionaPacientesApi(paciente);

    form.reset();

    var mensagensErro = document.querySelector("#mensagem-erro");
    //mensagensErro.innerHTML = "";
    mensagensErro.textContent = "";
});

function adicionaPacientesApi(paciente) {

    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagem-erro")
    //ul.innerHTML = "";
    ul.textContent = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    }
    );    
}

function obtemPaciente (form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value,form.altura.value)

    } 
  
    return paciente;
}

function montaTr (paciente){

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd (dado, classeDoDado) {
    var td = document.createElement("td");
    td.classList.add(classeDoDado);
    td.textContent = dado;
    return td;
}

function pacienteEhValido(paciente) {

    var erros = [];

    if (paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco");
    }

    if (paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco");
    }

    if (paciente.peso.length == 0){
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco");
    }

    if (!validaPeso(paciente.peso) && paciente.peso.length != 0){
        erros.push("Peso é inválido");
    }

    if (!validaAltura(paciente.altura) && paciente.altura.length != 0){
        erros.push("Altura é inválida");
    }

    return erros;
}