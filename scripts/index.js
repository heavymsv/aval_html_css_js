var carrinho = localStorage.getItem("carrinho")

if(carrinho === null){
    carrinho = []
    localStorage.setItem("carrinho",JSON.stringify([]))
}
else{
    carrinho = (JSON.parse(carrinho))
}

var estoque = localStorage.getItem("estoque")

if(estoque === null){
    estoque = estoqueInicial
    localStorage.setItem("estoque",JSON.stringify(estoque))
}
else{
    estoque = (JSON.parse(estoque))
}

var InitItens = []
while(InitItens.length<12){
    let rnd = Math.floor(Math.random() * estoque.length);
    let repetido = InitItens.every(value=>{return rnd!=value})
    if(repetido)InitItens.push(rnd)
}

function carregaTela(value, termo){
    switch(value){
        case -1:
            const re = new RegExp(termo.toLowerCase());
            itens = []
            estoque.forEach((item,index)=>{
                    if(re.test(item.nome.toLowerCase()))itens.push(index)
                }
            )
            if(itens.length>0){
                povoarTela(itens)
            }else{
                noMatch();
            }
            break;
        case 0:
            
            povoarTela(InitItens)
            break;
        default:
            itens = []
            estoque.forEach((item,index)=>{
                    if(item.categoria==value)itens.push(index)
                }
            )
            povoarTela(itens)
    }
}

function noMatch(){
    var espaco = document.getElementById("cardsProdutos")
    espaco.innerHTML = "<h2 class='text-center'>0 Resultados encontrados</h2>"
}

function povoarTela(itens){
    var espaco = document.getElementById("cardsProdutos")
    espaco.innerHTML = ""
    console.log(itens)
    const colors=['text-bg-success','text-bg-info','text-bg-danger']

    itens.forEach(valor=>{
        var item = estoque[valor]
        var temEstoque = 'disabled'
        if(item.estoque>0) temEstoque = '' 
        txt = `<div class="m-3"><div class="card h-100" style="overflow:hidden"><figure style="height:30vh;width:auto;margin:auto"><img src="${item.imagem}" style="max-height:30vh;width:auto;" class="card-img-top" alt="${item.nome}"></figure><div class="card-body  ${colors[item.categoria-1]}"><h5 class="card-title">${item.nome}</h5><p class="card-text" id='declaraEstoque${valor}'>Estoque: ${item.estoque} unidades</p>
        </div><div class="card-footer ${colors[item.categoria-1]}">
        <div class='row'><h3 class='text-center'>${item.preco.toLocaleString('pt-br',{style:'currency', currency:'BRL'})}</h3></div>
        <div class="row"><button class="col-auto mx-1 btn btn-light btn-sm" ${temEstoque} id="btnMais${valor}" onclick = "adicPossCompra(${valor})"><img src="./imagens/mais.svg"></button><button class="col-auto mx-1 btn btn-light btn-sm" disabled id="btnMenos${valor}" onclick = "retPossCompra(${valor})"><img src="./imagens/menos.svg"></button>
        <div class="col-sm">
        <label class="visually-hidden" for="itemEstoque${valor}">Numero de Itens No carrinho</label>
        <div class="input-group">
        <div class="input-group-text"><img src="./imagens/carrinho.svg"></button></div>
        <input type="text" class="form-control"  value="0" id="itemEstoque${valor}" readonly>
        </div>
        </div>
        </div>
        <div class='row mt-2'>
        <button class = 'btn btn-primary' id='btnAdicCarrFin${valor}' onclick='adicCarrinho(${valor})' ${temEstoque}>Adicionar ao Carrinho</button></div></div></div></div>`
        espaco.innerHTML += txt
    }
    )

}

function adicPossCompra(index){
    var item = estoque[index]
    var cart = document.getElementById(`itemEstoque${index}`)
    if(item.estoque>Number(cart.value)){
        cart.value = Number(cart.value)+1
    }
    btnVerificar(index)
}

function retPossCompra(index){
    var cart = document.getElementById(`itemEstoque${index}`)
    if(cart.value>0){
        cart.value = Number(cart.value)-1
    }
    btnVerificar(index)
}

function adicCarrinho(index){
    var cart = document.getElementById(`itemEstoque${index}`)
    var item = Object.assign({}, estoque[index]); 

    if(Number(cart.value)==0 && item.estoque>0){
        item.estoque = 1
    }else if( item.estoque>0 ){
        item.estoque = Number(cart.value)
    }

    

    let inCase = carrinho.every(caso=>{
        if(caso.nome==item.nome){
            caso.estoque +=item.estoque
            return false
        }
        return true
    })


    if(inCase) carrinho.push(item)

    estoque[index].estoque -= item.estoque

    localStorage.setItem("carrinho",JSON.stringify(carrinho))
    localStorage.setItem("estoque",JSON.stringify(estoque))

    document.getElementById(`itemEstoque${index}`).value = 0
    
    document.getElementById(`declaraEstoque${index}`).innerHTML = `Estoque: ${estoque[index].estoque} unidades`

    if(estoque[index].estoque<=0){
        document.getElementById(`btnAdicCarrFin${index}`).setAttribute('disabled','')
    }else{
        document.getElementById(`btnAdicCarrFin${index}`).removeAttribute('disabled')
    }
    
    gerarToast('Item adicionado','Para atualizar, verifique seu carrinho')

    btnVerificar(index)

}

function btnVerificar(index){
    var cart = document.getElementById(`itemEstoque${index}`)
    var item = estoque[index]

    if(Number(cart.value)>=item.estoque){
        document.getElementById(`btnMais${index}`).setAttribute('disabled','')
    }
    else {
        document.getElementById(`btnMais${index}`).removeAttribute('disabled')
       
    }
    if(Number(cart.value)<=0)document.getElementById(`btnMenos${index}`).setAttribute('disabled','')
    else document.getElementById(`btnMenos${index}`).removeAttribute('disabled')
}

function carregaPesquisa(){
    var pesquisa = document.getElementById('pesquisaTermo')
    if(pesquisa.value==''){
        carregaTela(0)
    }
    else{
        carregaTela(-1, pesquisa.value)
    }
}

carregaTela(0)

