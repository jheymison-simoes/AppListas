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


class Fila{
    constructor(){
        this.items = []; // array para armazenar os elementos da fila.
        this.cont = 0; // contador para saber qual é o indice do próximo elemento
        this.menorCont = 0 //contador para saber qual é o primeiro elemento da fila
    }

    push(elemento){
        this.items[this.cont] = elemento;
        this.cont++;
    }

    pushType(elemento){
        let type_peek;
        if( isNaN(this.lastElement()) ){
            type_peek = "string";
        } else {
            type_peek = "number";
        }

        if(this.items.length == 0){
            this.items.push(elemento);
            this.cont++;
        } else {
            if( typeof(elemento) == type_peek ){
                this.items.push(elemento);
                this.cont++;
            } else {
                teste = true; // Tipo é Diferente 
            }
        } 
    }

    pop(){
        // verificar se a fila está vazia
        if(this.isEmpty()){
            return undefined;
        }

        const result = this.items[this.menorCont];
        delete this.items[this.menorCont];
        this.menorCont++;
        return result;
    }

    isEmpty(){
        return this.cont - this.menorCont === 0;
    }

    size(){
        return this.cont - this.menorCont;
    }

    peek(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.menorCont];
    }

    lastElement(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    clear(){
        this.items = []; // array para armazenar os elementos da fila.
        this.cont = 0; // contador para saber qual é o indice do próximo elemento
        this.menorCont = 0 //contador para saber qual é o primeiro elemento da fila
    }

    print(){
        document.getElementById("resposta").innerHTML = "";
        this.items.forEach(printFila);
    }
}

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

// Imprimri Fila
function printFila(item, index){
    let node = document.createElement("button");//1
    node.className = "valores d-inline p-2 btn btn-success";
    node.setAttribute("id", "valores");
    node.setAttribute("name", item);
    node.setAttribute("onclick", "removePri(this.name)");
    let text = document.createTextNode(item);//2
    node.appendChild(text);//3
    //document.getElementById("resposta").appendChild(node);//4
    let list = document.getElementById("resposta");//4
    list.appendChild(node, list.childNodes[0]);//4
}

// Adicionar valor clicando no botão
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
        fila.push(valor);//2
        fila.print();//3
        msg = "O valor " + valor + " foi adicionado!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("entrada").value = "";
        document.getElementById("entrada").focus();
        console.log("Ultimo do Array = " + fila.peek() + " Tipo = " + isNaN( fila.peek() ));
        document.getElementById("pop").disabled = false;
        return false;
        
    }

    if(selecionado == true){
        if( isNaN(val) ){ //String
            // Apenas tipo String
            fila.pushType(valor);
            fila.print();
            msg = "O valor " + valor + " foi adicionado!";
            tipo = "alert-success";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("entrada").value = "";
            document.getElementById("entrada").focus();
            console.log("Ultimo do Array = " + fila.peek() );
            document.getElementById("pop").disabled = false;

        } else { //Number
            // Apenas tipos numericos
            fila.pushType(val);
            fila.print();
            msg = "O valor " + valor + " foi adicionado!";
            tipo = "alert-success";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("entrada").value = "";
            document.getElementById("entrada").focus();
            console.log("Ultimo do Array = " + fila.peek() );
            document.getElementById("pop").disabled = false;
        }

        // se o tipo for diferente da erro
        if(teste == true){

            let type_permit;
            if(type == "Number"){
                type_permit = "String";
            } else {
                type_permit = "Number";
            }

            msg = "O valor " + valor + " não foi adicionado! Tipo Diferente! apenas Tipos " + type_permit + " são aceitos. Para um novo tipo esvazie a fila!";
            tipo = "alert-warning";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            teste = false;
        }
    }

}

//  Remover valor clicando no botão
function removeButton(){

    if(fila.size() < 1){
        document.getElementById("pop").disabled = true;
        msg = "A Fila Está Vazia! Botão Remover foi desativado!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        fila.pop();//1
        fila.print();//2
        msg = "Removido com Sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
    
}

// Verifica qual é o primeiro valor da fila
function primeiroValor() {
    if(fila.size() > 0){
        var prValor = fila.peek();
        msg = "O <u>" + prValor + "</u> é o Pimeiro valor da Fila!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        msg = "A Fila Está Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }    
}

// Verifica qual é o Ultimo valor da fila
function ultimoValor() {
    if(fila.size() > 0){
        var prValor = fila.lastElement();
        msg = "O <u>" + prValor + "</u> é o Ultimo valor da Fila!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        msg = "A Fila Está Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }    
}

// Verifica o tamanho da fila
function tamanhoFila() {
    if(fila.size() > 0){
        var tamanho = fila.size();
        msg = "O Tamanho da Fila é <u>" + tamanho + "</u> !";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        msg = "A Fila Está Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }    
}

// verifica se a Fila está vazia
function filaVazia() {
    if(fila.size() > 0){
        msg = "A Fila Não está Vazia!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        msg = "A Fila está Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }    
}

// Remove o Primeiro valor da fila quando clicado sobre ele
function removePri(nomeBotao){
    var priValor = fila.peek();
    if(priValor == nomeBotao){
        document.getElementById("entrada").innerHTML = "";
        fila.pop();
        fila.print();
        msg = "Removido com Sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        
    } else {
        msg = "Este não é o Primeiro Elemento!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

const fila = new Fila();


fila.print();
