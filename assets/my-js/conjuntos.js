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

    print(){
        let conjuntos = this.items;
        exibeConjunto(Object.values(conjuntos));
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

// Esta função exibe o conjunto
function exibeConjunto(conjunto, name) {
    name = document.getElementById("conjunto").value;
    let label = document.createElement("div");
    let textoLabel = document.createTextNode(name);
    label.appendChild(textoLabel);
    label.className = "btn btn-link";
    label.setAttribute("name", name);

    let node = document.createElement("div");
    let texto = document.createTextNode(conjunto);
    node.appendChild(texto);
    node.className = "btn btn-info";
    node.setAttribute("id", name);
    
    let conjuntos = document.getElementById("apresentaConjunto");
    conjuntos.appendChild(label, conjuntos.childNodes[0]);
    conjuntos.appendChild(node, conjuntos.childNodes[0]);
}

function newConjunto(nameConj){
    nameConj = document.getElementById("conjunto").value;
    let nomeConjunto = nameConj;
    
    if(nameConj == ""){
        msg = "Preencha os Campos Conjunto e Elemento!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("conjunto").focus();
    } else {
        nameConj = new Set();
        msg = "Conjunto <u>" + nomeConjunto + "</u> adicionado com sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        console.log(nameConj);
        document.getElementById("conjunto").value = "";
        document.getElementById("addvalor").value = "";

        return nameConj;
    }
}

// let result = newConjunto("conjunto1");

function newValue(conjunto, elemento){
    conjunto = document.getElementById("conjunto").value;
    elemento = document.getElementById("addvalor").value;

    console.log(conjunto, elemento);

    conjunto.add(elemento);
}

// function addValor(){
//     let name = document.getElementById("conjunto").value;
//     let elemento = document.getElementById("addvalor").value;

//     if(name == "" || elemento == ""){
//         msg = "Preencha os Campos Conjunto e Elemento!";
//         tipo = "alert-warning";
//         document.getElementById("avisos").innerHTML = notification(msg, tipo);
//         document.getElementById("conjunto").focus();
//     } else {
//         console.log(newValue(name, elemento));
//         msg = "Valor <u>" + elemento + "</u> adicionado no conjunto <u>" + name +"</u> com sucesso!";
//         tipo = "alert-success";
//         document.getElementById("avisos").innerHTML = notification(msg, tipo);

//         document.getElementById("conjunto").value = "";
//         document.getElementById("addvalor").value = "";
//     }
// }

// newValue(result, 5);
// newValue(result, 15);

// console.log(result);