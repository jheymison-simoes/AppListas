// Incializando Popovers
var array = [];

$(function () {
    $('[data-toggle="popover"]').popover();
});

class Node {
    constructor(element) {
        this.value = element;
        this.next = undefined;
        array.push(element);
    }
}

class Lista {
    constructor() {
        this.head = undefined;
        this.count = 0;
    }

    // Outros Métodos da classe Lista
    // push() - adicionar um elemento no final da Lista
    push(element) {
        const node = new Node(element);
        let current;

        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }

            current.next = node;
        }

        this.count++;
    }

    // getElementAt(position) - retorna um elemento de uma posição especifica da lista
    getElementAt(position) {
        if (position >= 0 && position <= this.count) {
            let node = this.head;
            for (let i = 0; i < position && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }

    // insertAt(element, position) - adiciona um elemento em qualquer posição da Lista
    insertAt(element, position) {
        if (position >= 0 && position <= this.count) {
            const node = new Node(element);
            if (position === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(position - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }

    // removeAt(position) - remove um elemento de uma posição especifica da lista
    removeAt(position) {
        if (position >= 0 && position <= this.count) {
            const current = this.head;
            if (position === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(position - 1);
                const current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return true;
        }
        return false;
    }
    // remove() - remove um elemento da Lista
    // indexOf(element) - retorna a posição de um elemento da Lista

    indexOf(element) {
        let current = this.head;

        for (let i = 0; this.count && current != null; i++) {
            if (current.value == element) {
                return i;
            } else {
                current = current.next;
            }
        }
        return -1;
    }


    // Verifica se a lista contem valores repetidos
    naoRepete(){
        for(let i = 0; i < this.count; i++){
            
            for(let j = i + 1 ; j < this.count; j++){

                let val1 = this.getElementAt(i).value;
                let val2 = this.getElementAt(j).value;

                if( val1 == val2 ){
                   return true;
                }           
            }       
        }
        return false;
    }

    // isEmpty() - checar se a lista está vazia
    isEmpty() {
        if (this.count === 0) {
            return true;
        } else {
            return false;
        }
    }
    // size() - retorna o tamanho da lista
    size(){
        return this.count;
    }

    print(){
        document.getElementById("apresentaLista").innerHTML = "";

        let current = this.head;

        for(let i = 0; i < this.count && current != null; i++){
            let atual = current;
            exibeFila(atual.value, i);
            current = current.next;
        }

        // Iniciando Popovers
        $(function () {
            $('[data-toggle="popover"]').popover();
        });
    }

    removeElementValue(element){
        if(this.indexOf(element) != -1){
            let posicao = this.indexOf(element);
            this.removeAt(posicao);
            return true;
        }
        
        return false;
    }

    firstElement(){
        return this.head.value; 
    }

    // Verifica o ultimo elemento
    lastElement(){
        let val;
        for(let i = 0; i < this.count; i++){
            val = this.getElementAt(i).value;  
        }
        return val;
    }

    inverter(element1, element2){
        let v1, v2, valor1, valor2, position1, position2;
        let v1in = false;
        let v2in = false;

        for(let i = 0; i < this.count; i++){
            v1 = this.getElementAt(i).value;
            v2 = this.getElementAt(i).value;

            if(v1 == element1){
                position1 = i;
                
                valor1 = v1;
                v1in = true;
            }

            if(v2 == element2){
                position2 = i;
                valor2 = v2;
                v2in = true;
            }
        }

        if(v1in == true && v2in == true){

            this.removeAt(position1);
            this.insertAt(valor2, position1);

            this.removeAt(position2);
            this.insertAt(valor1, position2);
        }

        this.print();
    }

    clear(){
        this.head = undefined;
        this.count = 0;
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


function cardButton(define){
    let aux = Number(define);
    let next, previous;
    let tamanho = lista.size();
    let tipo = typeof lista.getElementAt(aux).value;
    let valor = lista.getElementAt(aux).value;
    let position = aux + 1;

    if(aux < 0 ){
        previous = "Não há anteriores";

    } else if(aux > 0){
        previous = lista.getElementAt(aux - 1).value;
    }

    if(aux == tamanho - 1){
        next = "Não há próximo";
    } else {
        next = lista.getElementAt(aux + 1).value;
    }

    let info = "Valor = " + valor + ", Posição = " + position + ", Tipo = " + tipo + ", Elemento Anterior = " + previous + ", Próximo Elemento = " + next;

    return info;
}


// Exibindo a Fila
function exibeFila(item, index){

    let node = document.createElement("button");
    
    let texto = document.createTextNode(item);
    node.appendChild(texto);

    let info = cardButton(index);

    node.setAttribute("type", "button");
    node.setAttribute("id", "btn");
    node.className = "btn btn-success"; //Adicionando classe aos valores 
    node.setAttribute("data-container","body");
    node.setAttribute("data-toggle","popover");
    node.setAttribute("data-placement","top");
    node.setAttribute("data-content", info);
    node.setAttribute("value", item);
    node.setAttribute("index", index);

    let listas = document.getElementById("apresentaLista");
    listas.appendChild(node, listas.childNodes[0]);

    document.getElementById("elemento").focus();
}



function addElemento() {
    let inputElemento = document.getElementById("elemento").value;

    if(inputElemento == ""){
        msg = "Preencha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("elemento").focus();
    } else {
        lista.push(inputElemento); //Adicionando elemento a ultimo lugar da fila
        avisos.innerHTML = ""; //Limpando avisos
        document.getElementById("elemento").value = ""; // limpano valor do inputElemento
        msg = "Elemento <u>" + inputElemento + "</u> adicionado com Sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("elemento").focus();
    }

    lista.print();  
}


function addElementoPos(){
    var tamanho = lista.size();

    let inputElemento = document.getElementById("elemento").value;
    let posicao = document.getElementById("posicao").value;

    if(inputElemento == "" || posicao == ""){
        msg = "Preencha os Campos - Adicione um Elemento e Posição!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("elemento").focus();
    } else if(posicao > tamanho){
        msg = "O campo Posição deve ser menor ou igual a <u>"+ tamanho + "</u>";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("posicao").focus();
    } else {
        lista.insertAt(inputElemento, posicao);
        avisos.innerHTML = ""; //Limpando avisos
        document.getElementById("elemento").value = ""; // limpano valor do inputElemento
        document.getElementById("posicao").value = ""; // limpano valor do Posicao
        msg = "Elemento <u>" + inputElemento + "</u> adicionado na Posição <u>" + posicao + "</u> com Sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
    lista.print();
}


function removeElementoValue(){
    let inputElemento = document.getElementById("remover").value;

    if(inputElemento == ""){
        msg = "Preencha o Campo Remover Posição";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("remover").focus();
    } else {  
        removido = lista.removeElementValue(inputElemento);
        if( removido == true ){
            msg = "Elemento <u>"+ inputElemento + "</u> removido com sucesso!";
            tipo = "alert-success";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("remover").focus();
            document.getElementById("remover").value = "null";
        } else {
            msg = "Elemento <u>"+ inputElemento + "</u> não existe!";
            tipo = "alert-warning";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("remover").focus();
            document.getElementById("remover").value = "";
        }
        lista.print();
    }
}

function removePosition(){
    let posicao = document.getElementById("posicao").value;
    let tamanho = lista.size();

    tamanho = tamanho - 1;

    if(posicao == "" || posicao == null){
        msg = "Preencha o Campo Posição!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("posicao").focus();
    } else if(posicao > tamanho){
        msg = "O Campo Posição deve ser menor ou igual a <u>"  + tamanho + "</u> ";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("posicao").focus();        
    } else {
        lista.removeAt(posicao);
        msg = "Elemento removido com sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("posicao").focus();
        document.getElementById("posicao").value = "";
        lista.print();
    } 
    
}


function verificaVazio(){
    let tamanho = lista.isEmpty();

    if(tamanho == true){
        msg = "A Lista ESTÁ Vazia!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        msg = "A Lista NÃO ESTÁ Vazia!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

function primeiroElemento(){
    if(lista.isEmpty()){
        msg = "A Lista ESTÁ Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        let primeiro = lista.firstElement();
        msg = "O primeiro elemento é <u>" + primeiro + "</u>!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

function ultimoElemento(){
    if(lista.isEmpty()){
        msg = "A Lista ESTÁ Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);      
    } else {
        let ultimo = lista.lastElement();
        msg = "O utlimo elemento é <u>" + ultimo + "</u>!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

function reverte(){
    let elemento1 = document.getElementById("inverter1").value;
    let elemento2 = document.getElementById("inverter2").value;
    
    if( lista.isEmpty() ){
        msg = "A Lista Está Vazia! Adicione Elementos";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("elemento").focus();
    } else if(lista.size() <= 1){
        msg = "A lista deve ter mais de 2 elementos!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else if (elemento1 == "" || elemento2 == ""){
        msg = "Preencha os campos Inverter Elemento e Por!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("inverter1").focus();
    } else {
        lista.inverter(elemento1, elemento2); 
        msg = "O Elemento <u>" + elemento1 + "</u> foi invertido pelo Elemento <u>" + elemento2 + "</u>";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("inverter1").value = "";
        document.getElementById("inverter2").value = "";
    }
}

function verficaRepetidos(){

    if(lista.isEmpty()){
        msg = "A Lista está Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else if(lista.naoRepete()){
        msg = "Há Elementos repetidos na Lista!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        msg = "Não Há Elementos repetidos na Lista!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}


function limparLista(){
    let tamanho = lista.size();

    if(tamanho < 1){
        msg = "A Lista está Vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        lista.clear();
        msg = "Lista limpada!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        lista.print();
    }
}

const lista = new Lista();
lista.print();





