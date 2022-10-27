function registrarProduto(){
    var nome = document.getElementById('nomeProduto')
    var preco = document.getElementById('precoProduto')
    var estoqueL = document.getElementById('estoqueProduto')
    var categoria = document.getElementById('categoriaProduto')
    var foto = document.getElementById('fotoProduto')
    var estoque
    if(localStorage.getItem('estoque')===null){
        estoque = new Array()
    }else{
        if(localStorage.getItem('estoque')==null) estoque = new Array()
        else {
            estoque = JSON.parse(localStorage.getItem('estoque'))
        }
    }

    if(nome.value==''){
        gerarToast('Campo Vazio','O campo Nome está Vazio!')
        nome.focus()
        return;
    }

    if(preco.value==''){
        gerarToast('Campo Vazio','O campo Preco está Vazio!')
        preco.focus()
        return;
    }

    if(Number(preco.value)<=0){
        gerarToast('Inválido','O campo Preço deve ser Maior que 0!')
        preco.focus()
        return;
    }
    
    if(estoqueL.value==''){
        gerarToast('Campo Vazio','O campo Estoque está Vazio!')
        estoqueL.focus()
        return;
    }

    if(Number(estoqueL.value)<=0){
        gerarToast('Inválido','O campo Estoque deve ser Maior que 0!')
        estoqueL.focus()
        return;
    }
    
    if(Number(categoria.value).toString()=='NaN'){
        gerarToast('Inválido','Selecione uma Opção de Categoria!')
        categoria.focus()
        return;
    }

    console.log(foto.value)
    if(foto.value==''){
        gerarToast('Campo Vazio','Selecione uma Imagem!')
        foto.focus()
        return;
    }

    var img 

    var fReader = new FileReader();
        fReader.readAsDataURL(foto.files[0]);
        fReader.onloadend = function(event){
        img = event.target.result;
    }
    
    estoque.push(JSON.parse(`{"nome":"${nome.value}","estoque":"${Number(estoqueL.value)}","preco":${Number(preco.value)},"categoria":${Number(preco.value)},"imagem":${img}}`))
    localStorage.setItem('estoque', JSON.stringify(estoque))
    document.getElementById("formulario").reset()
    
    
}