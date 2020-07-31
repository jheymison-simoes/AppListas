var array = [];

let msg, tipo;

// Notificação
function notification(msg, tipo){
    return "<div class='row justify-content-center'><div id='notification' class='alert " + tipo + " alert-dismissible fade show text-center' role='alert'> <strong>" + msg + "</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div></div>";
}

function add(){
    let valor = document.getElementById("entrada").value;
    if(valor == "" || valor == null){
        document.getElementById("entrada").focus();
        msg = "Preecha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);

    } else {
        document.getElementById("entrada").focus();
        msg = "Adicionado com Sucesso!";
        tipo = "alert-success";
        array.push(valor);
        document.getElementById("entrada").value = null;
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        exibeArray();
    }
}

function remove(){
    let valor = document.getElementById("entrada").value;
    if(valor == "" || valor == null){
        document.getElementById("entrada").focus();
        msg = "Preecha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        for(let i = 0; i <= array.length; i++){
            if(array[i] == valor){
                let index = i;
                array.splice(index, 1);
                msg = "Removido com Sucesso!";
                tipo = "alert-success";
                document.getElementById("avisos").innerHTML = notification(msg, tipo);
                document.getElementById("entrada").value = "";
                exibeArray();
                return true;
            }
        }
        msg = "O Valor não Existe no Array!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

function search(){
    let valor = document.getElementById("entrada").value;

    if(valor == "" || valor == null){
        document.getElementById("entrada").focus();
        msg = "Preecha o Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        for(let i = 0; i <= array.length; i++){
            if(array[i] == valor){
                msg = "O Valor " + valor + " foi encontrado!";
                tipo = "alert-success";
                document.getElementById("avisos").innerHTML = notification(msg, tipo);
                document.getElementById("entrada").value = "";
                return true;
            }
        }
        msg = "O Valor " + valor + " não existe!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("entrada").value = "";
        return false;
    }
    
}

function print(item, index){
    let node = document.createElement("button");//1
    node.className = "btn btn-success";
    let text = document.createTextNode(item);//2
    node.appendChild(text);//3
    //document.getElementById("resposta").appendChild(node);//4
    let list = document.getElementById("resposta");//4
    list.appendChild(node, list.childNodes[0]);//4
}

function exibeArray(){
    document.getElementById("resposta").innerHTML = "";
    array.forEach(print);
}

// Adicionando valor na pilha com a Tecla Enter
let enter = document.addEventListener('keypress', function(e){
    if(e.which == 13){
       add();
    }
 }, false);