class Set {
    constructor(){
        this.items = {};
    }

    // Método da Classe Conjunto
    has(element){
        return element in this.items;
    }

    add(element){
        if(!this.has(element)){
            this.items[element] = element;
            this.count++;
            return true;
        } else {
            console.log("Elemento " + element + " Já Existe!");
            return false;
        }
    }

    remove(element){
        if(this.has(element)){
            delete this.items[element];
            return true;
        } else {
            console.log("Elemento " + element + " não Existe!");
            return false;
        }
    }

    clear(){
        this.items = {};
    }

    size(){
        return Object.keys(this.items).length;
    }

    values(){
        return Object.values(this.items);
    }

    // Operações em conjuntos
    uniao(outroConjunto){
        const novoConjunto = new Set();
        this.values().forEach(value => novoConjunto.add(value));
        outroConjunto.values().forEach(value => novoConjunto.add(value));
        return novoConjunto;
    }

    intersecao(outroConjunto){
        const novoConjunto = new Set();

        const values = this.values();
        for(let i = 0; i < values.length; i++){
            if(outroConjunto.has(values[i])){
                novoConjunto.add(values[i]);
            }
        }

        return novoConjunto;
    }

    diferenca(outroConjunto){
        const novoConjunto = new Set();
        this.values().forEach(value => {
            if(!outroConjunto.has(value)){
                novoConjunto.add(value);
            }
        });

        return novoConjunto;
    }

    ehsubConjunto(outroConjunto){
        if(this.size() > outroConjunto.size()){
            return false;
        }

        let subconjunto = true;
        this.values().forEach(value => {
            if(!outroConjunto.has(value)){
                subconjunto = false;
                return false;
            }
            return true;
        });

        return subconjunto;
    }    
}

// Notificações de erro, successo e alerta
function notification(msg, tipo){
    return "<div class='row justify-content-center'><div id='notification' class='alert " + tipo + " alert-dismissible fade show text-center' role='alert'> <strong>" + msg + "</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div></div>";
}

// Adicionando valor na pilha com a Tecla Enter
let enter = document.addEventListener('keypress', function(e){
    if(e.which == 13){
       addConjunto();
    }
 }, false);

//  imprime os valores de um conjunto
function exibeValues(){
    let conjuntoAtual = document.getElementById("apresentaConjunto").value;
    let list = document.getElementById("resposta");
    list.innerHTML = "";

    Object.keys(nomeDoArray[conjuntoAtual].items).forEach((itemDoArray, index) => {
        let node = document.createElement("div");
        node.className = "btn btn-success";

        let textnode = document.createTextNode(itemDoArray);
        node.appendChild(textnode);
        list.appendChild(node);
    });
}

// Imprimie os conjuntos em um Select
function exibeConjunto(nomeDoArray) {
    let list = document.getElementById("apresentaConjunto");
    list.innerHTML = "";
    Object.keys(nomeDoArray).forEach((itemDoArray, index) => {
        let node = document.createElement("option");

        let textnode = document.createTextNode(itemDoArray);
        node.appendChild(textnode);
        list.appendChild(node);
    });
}

// Cria um novo conjunto
function newSet(){
    let novoConjunto = new Set();
    let nomeConjunto = document.getElementById("conjunto").value;

    if(nomeConjunto == "" || nomeConjunto == null){
        msg = "Preencha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("conjunto").focus();
    } else {
        document.getElementById("conjunto").value = "";
        nomeDoArray[nomeConjunto] = novoConjunto;
        exibeConjunto(nomeDoArray);
        console.log(nomeDoArray);
        msg = "Conjunto <u>" + nomeConjunto + "</u> adicionado com sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("apresentaConjunto").focus();
    }
}

// cria valor para determinado conjunto
function newValue(){
    let conjuntoAtual = document.getElementById('apresentaConjunto').value;
    let elementoAtual = document.getElementById('addvalor').value;

    if(elementoAtual == "" || elementoAtual == null){
        msg = "Preencha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("addvalor").focus();
    } else {
        nomeDoArray[conjuntoAtual].add(elementoAtual);
        exibeValues();
        document.getElementById("addvalor").value = "";
        msg = "O valor <u>" + elementoAtual + "</u> foi adicionado com sucesso no conjunto <u>" + conjuntoAtual + "";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("addvalor").focus();
    }    
}

function removeValue(){
    let conjuntoAtual = document.getElementById('apresentaConjunto').value;
    let elementoAtual = document.getElementById('addvalor').value;

    if(elementoAtual == "" || elementoAtual == null){
        msg = "Preencha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("addvalor").focus();
    } else {
        nomeDoArray[conjuntoAtual].remove(elementoAtual);
        exibeValues();
        document.getElementById('addvalor').value = "";
        msg = "O valor <u>" + elementoAtual + "</u> foi removido do conjunto <u>" + conjuntoAtual + "</U> com sucesso!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("addvalor").focus();
    }
}

function emptyItems(){
    let conjuntoAtual = document.getElementById('apresentaConjunto').value;

    if(conjuntoAtual == "" || conjuntoAtual == null){
        msg = "Preencha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("addvalor").focus();
    } else {
        nomeDoArray[conjuntoAtual].clear();
        exibeValues();
        msg = "O conjunto <u>" + conjuntoAtual + "</u> foi limpado com sucesso!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("addvalor").focus();
    }
}

function emptySet(){
    let conjuntoAtual = document.getElementById('apresentaConjunto').value;

    if(conjuntoAtual == "Vazio"){
        msg = "Não existe Conjunto!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        nomeDoArray[conjuntoAtual].clear();
        delete nomeDoArray[conjuntoAtual];
        exibeConjunto(nomeDoArray);
        exibeValues();
        msg = "O conjunto <u>" + conjuntoAtual + "</u> foi apagado com sucesso!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("conjunto").focus();
    }    
}

function sizeSet(){
    let conjuntoAtual = document.getElementById('apresentaConjunto').value;
    
    if(conjuntoAtual == "Vazio"){
        msg = "Não existe Conjunto!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        let qnt = nomeDoArray[conjuntoAtual].size();
        
        msg = "O conjunto <u>" + conjuntoAtual + "</u> contem <u>" + qnt + "</u> elementos!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("conjunto").focus();
    }    
    
}

let nomeDoArray = new Object();