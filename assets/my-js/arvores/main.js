let arvore = [];
class Node{
    constructor(key){
        this.key = key; //valor
        this.left = null;
        this.right = null;
        arvore.push(key);
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null; //raiz
    }

    inserir(key){
        if(this.root == null){
            this.root = new Node(key);
        } else {
            this.inserirNode(this.root, key);
        }
    }

    inserirNode(node, key){
        // Lado esquerdo
        if(parseInt(key, 10) < parseInt(node.key, 10)){
            if(node.left == null){
                node.left = new Node(key);
            } else {
                this.inserirNode(node.left, key);
            }
        }

        // Lado direito
        if(parseInt(key, 10) > parseInt(node.key, 10)){
            if(node.right == null){
                node.right = new Node(key);
            } else {
                this.inserirNode(node.right, key);
            }
        }
    }

    getRoot(){
        return this.root;
    }

    getClear(){
        this.root = null;
        arvore = [];
    }

    minValue(){
        let raiz = this.root;
        
        while(raiz.left != null) {
            raiz = raiz.left;  
        }
        console.log(raiz.key);

        return raiz.key;
    }

    maxValue(){
        let raiz = this.root;

        while(raiz.right != null) {
            raiz = raiz.right;  
        }
        console.log(raiz.key);

        return raiz.key;
    }


    search(key){
        let current = this.root;
        //encontrar elemento no root
        if (key == current.key){
            return true;
        }
       
        do{  
            //encontrar elemento no right
            if (key > current.key) {
                current = current.right
                //console.log(current.key);
                if(current == null){
                    return false;
                }
                if (key == current.key){
                    return true;
                } else if (current.right == null && current.left == null || current.key == null) {
                    return false;
                }
            }
            //encontrar elemento no left
            if(key < current.key){
                current = current.left
                if(current == null){
                    return false;
                }
                if (current.key == key){
                    return true;
                } else if (current.right == null && current.left == null || current.key == null) {
                    return false;
                }
            }
            
        } while(current.right != null || current.left != null);
    }

    balance(){
        let aux = 0;
        let val = Math.round(arvore.length / 2);
        let valorMeio;
        let valorMeioDireita, valMeiaEsquerda;

        let balanceioD = [];
        let balanceioE = [];

        for(let i = 0; i < arvore.length; i++){     
            if(i == val){
                valorMeio = arvore[i - 1];
            }
            if( arvore[i] > valorMeio){
                balanceioD.push(arvore[i]);
            } else {
                balanceioE.push(arvore[i]);
            }
        }

        this.getClear();
        this.inserir(valorMeio);

        // Direita
        let valDireita = Math.round(balanceioD.length / 2);
        for(let j = 0; j < balanceioD.length; j++){
            if(valDireita == j){
                valorMeioDireita = balanceioD[j - 1];
                this.inserir(valorMeioDireita);                
            }
            for(let k = 0; k < balanceioD.length; k++){
                if(balanceioD[k] < valorMeioDireita){
                    this.inserir(balanceioD[k]);
                    aux = 1;
                }
                if(aux == 1){
                    if(balanceioD[k] > valorMeioDireita){
                        this.inserir(balanceioD[k]);
                    }
                }
            }     
        }

        // Esquerda
        let valEsquerda = Math.round(balanceioE.length / 2);
        for(let l = 0; l < balanceioE.length; l++){
            if(valEsquerda == l){
                valMeiaEsquerda = balanceioE[l - 1];
                this.inserir(valMeiaEsquerda);
            }

            for(let m = 0; m < balanceioE.length; m++){
                if(balanceioE[m] < valMeiaEsquerda){
                    this.inserir(balanceioE[m]);
                    aux = 1;
                }
                if(aux == 1){
                    if(balanceioE[m] > valMeiaEsquerda){
                        this.inserir(balanceioE[m]);
                    }
                }
            }
        }
        
        this.print();
    }

    getNodeJson(node){
        let obj = new Object();
        obj.text = new Object();
        obj.text.name = node.key;

        obj.children = new Array();

        let nullLeaf = new Object();
        nullLeaf.text = new Object();
        nullLeaf.text.name = "null";

        if(node.left == null){
            obj.children.push(nullLeaf);
        } else {
            obj.children.push(this.getNodeJson(node.left));
        }

        if(node.right == null){
            obj.children.push(nullLeaf);
        } else {
            obj.children.push(this.getNodeJson(node.right));
        }

        return obj;
    }

    getTreeJson(){
        let obj = new Object();
        obj.chart = new Object();
        obj.chart.container = "#tree-simple";
 
        obj.nodeStructure = new Object();
        if(this.root != null){
            obj.nodeStructure = this.getNodeJson(this.root);
        } else {
            obj.nodeStructure = {'text':{'name':'Árvore vazia!'}};
        }

        return obj;
    }

    print(){
        console.log(JSON.stringify(tree, null, 2));

        let simple_chart_config = this.getTreeJson();

        Treant(simple_chart_config);
    }
    
}

// Notificações de erro, successo e alerta
function notification(msg, tipo){
    return "<div class='row justify-content-center'><div id='notification' class='alert " + tipo + " alert-dismissible fade show text-center' role='alert'> <strong>" + msg + "</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div></div>";
}

function exibeArvore(){
    // let arvore = constroiArvore();
    Treant(tree.constroiArvore());
}

function addValor(){
    let valor = document.getElementById("arvore").value;

    if(valor == "" || valor == null){
        msg = "Preencha Campo!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("arvore").focus();
    } else {
        tree.inserir(parseInt(valor));
        tree.print();
        document.getElementById("arvore").focus();
        msg = "O Valor " + valor + " foi adicionado com Sucesso!";
        tipo = "alert-success";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("arvore").value = "";
    }
}

function valorMaximo(){
    if(tree.getRoot() == "" || tree.getRoot() == null){
        msg = "A Arvore está vazia";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        let valorMaximo = tree.maxValue();
        msg = "O Valor Maximo da Arvore é " +  valorMaximo;
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

function valorMinimo(){
    if(tree.getRoot() == "" || tree.getRoot() == null){
        msg = "A Arvore está vazia";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        let valorMinimo = tree.minValue();
        msg = "O Valor Maximo da Arvore é " +  valorMinimo;
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

function encontrarValor(){
    let valor = document.getElementById("arvore").value;
    let encontrado = tree.search(valor);
    console.log(encontrado);

    if(valor == "" || valor == null){
        msg = "Preencha o campo valor!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        document.getElementById("arvore").focus();
    } else {
        if(encontrado == true){
            msg = "O Valor " + valor + " foi ENCONTRADO com Sucesso!";
            tipo = "alert-info";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("arvore").value = "";
            document.getElementById("arvore").focus();
        } else {
            msg = "O Valor " + valor + " NÃO foi ENCONTRADO!";
            tipo = "alert-warning";
            document.getElementById("avisos").innerHTML = notification(msg, tipo);
            document.getElementById("arvore").value = "";
            document.getElementById("arvore").focus();
        }
    }
}

function limpar(){
    let raiz = tree.getRoot();

    if(raiz == "" || raiz == null){
        msg = "A Arvore ja está vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        tree.getClear();
        tree.print();
        msg = "A Arvore foi Limpada!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
        
    }
}

function balancear(){
    let raiz = tree.getRoot();

    if(raiz == "" || raiz == null){
        msg = "A Arvore ja está vazia!";
        tipo = "alert-warning";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    } else {
        tree.balance();
        tree.print();
        msg = "A Arvore foi Balanceada!";
        tipo = "alert-info";
        document.getElementById("avisos").innerHTML = notification(msg, tipo);
    }
}

const tree = new BinarySearchTree();

tree.print();
