var carrinho = localStorage.getItem("carrinho")

var estoque = localStorage.getItem("estoque")

if(estoque === null){
    estoque = estoqueInicial
    localStorage.setItem("estoque",JSON.stringify(estoque))
}
else{
    estoque = (JSON.parse(estoque))
}

povoarTabela()

function povoarTabela(){
    if(carrinho === null){
        carrinho = []
        localStorage.setItem("carrinho",JSON.stringify([]))
        document.getElementById('corpoTabela').innerHTML="<tr><td colspan='5'><h3 class='text-center'>Carrinho Vazio</h3></td></tr>"
        document.getElementById('totalCarrinhoMostrar').innerHTML='R$ 00,00'
    }
    else{
        carrinho = (JSON.parse(carrinho))
        if(carrinho.length==0){
            document.getElementById('corpoTabela').innerHTML="<tr><td colspan='5'><h3 class='text-center'>Carrinho Vazio</h3></td></tr>"
            document.getElementById('totalCarrinhoMostrar').innerHTML='R$ 00,00'
        }
        else{
            sum = 0
            tabela = document.getElementById('corpoTabela')
            tabela.innerHTML = ""
            carrinho.forEach((element,valor) => {
            tabela.innerHTML+=`<tr><td colspan='2'><strong>${element.nome}</strong></td>
            <td><div class="row" style="width:30vw"><button class="col-auto mx-1 btn btn-light btn-sm" onclick = "zerarCompra(${valor})"><img src="./imagens/trash.svg"></button><button class="col-auto mx-1 btn btn-light btn-sm" id="btnMenosCarrinho${valor}" onclick = "retDoCarrinho(${valor})"><img src="./imagens/menos.svg"></button>
            <div class="col-sm">
            <label class="visually-hidden" for="itemEstoque${valor}" >Numero de Itens No carrinho</label>
            <div class="input-group" style="width:15vw">
            <div class="input-group-text"><img src="./imagens/carrinho.svg"></button></div>
            <input type="text" class="form-control"  value=${element.estoque} id="itemEstoque${valor}" readonly>
            </div>
            </div>
            </div></td><td>
            ${element.preco.toLocaleString('pt-br',{style:'currency',currency:'BRL'})}
            </td>
            <td>
            ${(element.preco*element.estoque).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}
            </td>
            </tr>`

            sum += element.preco*element.estoque
            }
            );
            document.getElementById('totalCarrinhoMostrar').innerHTML=sum.toLocaleString('pt-br',{style:'currency',currency:'BRL'})
        }
    
    }
}

function retDoCarrinho(index){
    console.log(index);
}
function zerarCompra(index){
    estoque.every(element=>{
        if(element.nome == carrinho[index].nome){
            element.estoque += carrinho[index].estoque
            console.log(element)
            carrinho.splice(index,1) 
            
            localStorage.setItem("estoque",JSON.stringify(estoque))
            localStorage.setItem("carrinho",JSON.stringify(carrinho))
            povoarTabela()
            return false;
        }
        return true;
    })
}