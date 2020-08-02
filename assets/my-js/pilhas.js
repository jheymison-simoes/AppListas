var teste = false;
var cont_check = 0;
var type;
var selecionado = false;
var last_type;

// Verifica se of Check box está selecionado
function check(){
    cont_check++;
    if(cont_check % 2 == 0){
        console.log("CHECKBOX = Não Selecionado");
        selecionado = false;
    } else {
        console.log("CHECKBOX = Selecionado");
        selecionado = true;
    }
}

// Verifica o tipo do valor digitado e demonstra debaixo do input
function check_type(valor){
    var type_number = /^[0-9]+$/;

    if(valor == "" || valor == null) {
        document.getElementById('define_type').innerHTML = "";
    } else if (valor.match(type_number)) {
        document.getElementById('define_type').innerHTML = "Type Number";
        type = "Number";

    }else if(!valor.match(type_number)){
        document.getElementById('define_type').innerHTML = "Type String";
        type = "String";
    }
    last_type = type;
    document.getElementById('define_type').innerHTML = "Type " + last_type;
}


class Pilha{
    constructor(){
        this.items = [];
    }

    push(element){
        this.items.push(element);
    }

    // Verifica o tipo do ultimo elemento adicionado
    pushType(element){
        let type_peek;
        if( isNaN(this.peek()) ){
            type_peek = "string";
        } else {
            type_peek = "number";
        }

        if(this.items.length == 0){
            this.items.push(element);
        } else {
            if( typeof( element ) == type_peek ){
                this.items.push(element);
            } else {
                teste = true;
            }
        } 
    }


    pop(){
        this.items.pop();
    }

    isEmpty(){
        if (this.items.length === 0 ){
            return true;
        }
        return false;
    }

    peek(){
        return this.items[this.items.length - 1];
    }

    size(){
        return this.items.length;
    }
    print(){
        //escrever código para imprimir aqui
        //document.getElementById("resposta").innerHTML = pilha.items;
        //limpa a impressão da pilha
        document.getElementById("resposta").innerHTML = "";
        //imprime a pilha
        this.items.forEach(printPilha);
    }

}//fim classe Pilha

let msg, tipo;

// Notificação
function notification(msg, tipo){
    return "<div class='row justify-content-center'><div id='notification' class='alert " + tipo + " alert-dismissible fade show text-center' role='alert'> <strong>" + msg + "</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div></div>";
}

// Adicionando valor na pilha com a Tecla Enter
let enter = document.addEventListener('keypress', function(e){
    if(e.which == 13){
       addButton();
    }
 }, false);

//  Exibe a pilha
function printPilha(item, index){

    let node = document.createElement("div");//1
    node.className = "valores btn btn-success ";
    node.style.display = "block";

    let text = document.createTextNode(item);//2
    node.appendChild(text);//3
    //document.getElementById("resposta").appendChild(node);//4
    let list = document.getElementById("resposta");//4
    list.insertBefore(node, list.childNodes[0]);//4

}

// Adiciona valores a Pilha
function addButton(){

    let valor = document.getElementById("entrada").value; //1
    let val = Number(valor);

    document.getElementById("entrada").autofocus;

    // Se o input estiver vazio da erro
    if(valor == "" || valor == null){
        msg = "Preencha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("entrada").focus();
        return false;
    }

    // Adciona qualquer tipo
    if(selecionado == false){
        pilha.push(valor);//2
        pilha.print();//3
        msg = "O valor " + valor + " foi adicionado!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("entrada").value = "";
        document.getElementById("entrada").focus();
        console.log("Ultimo do Array = " + pilha.peek() + " Tipo = " + isNaN( pilha.peek() ));
        return false;
    }

    if(selecionado == true){
        if( isNaN(val) ){ //String
            // Apenas tipo String
            pilha.pushType(valor);
            pilha.print();
            msg = "O valor " + valor + " foi adicionado!";
            tipo = "alert-success";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("entrada").value = "";
            document.getElementById("entrada").focus();
            console.log("Ultimo do Array = " + pilha.peek() );

        } else { //Number
            // Apenas tipos numericos
            pilha.pushType(val);
            pilha.print();
            msg = "O valor " + valor + " foi adicionado!";
            tipo = "alert-success";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("entrada").value = "";
            document.getElementById("entrada").focus();
            console.log("Ultimo do Array = " + pilha.peek() );
        }

        // se o tipo for diferente da erro
        if(teste == true){
            let type_permit;
            if(type == "Number"){
                type_permit = "String";
            } else {
                type_permit = "Number";
            }

            msg = "O valor " + valor + " não foi adicionado! Tipo Diferente! apenas Tipos " + type_permit + " são aceitos. Para um novo tipo esvazie a pilha!";
            tipo = "alert-warning";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            teste = false;
        }
    }
}

// Remove um valor da Pilha
function removeButton(){
    if(pilha.size() < 1){
        msg = "Não há valores na Pilha para serem removidos!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        pilha.pop();//1
        pilha.print();//2
        msg = "Removido com Sucesso";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

// Verifica se a pilha está vazia
function emptyButton(){
    if(pilha.size() < 1){
        msg = "A Pilha está vazia!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        let tamanho = pilha.size();
        msg = "A Pilha contém " + tamanho + " valores!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

// Verifica o ultimo valor da Pilha
function lastButton(){
    if(pilha.size() < 1){
        msg = "A Pilha está vazia!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        let ultimoVlor = pilha.peek();
        msg = "O <u>" + ultimoVlor + "</u> é o ultimo valor da Pilha!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

const pilha = new Pilha();
pilha.print();