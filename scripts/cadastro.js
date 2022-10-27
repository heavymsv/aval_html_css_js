function registrarProduto(){
    var nome = document.getElementById('nomeProduto')
    var preco = document.getElementById('precoProduto')
    var estoque = document.getElementById('estoqueProduto')
    var categoria = document.getElementById('categoriaProduto')
    var foto = document.getElementById('fotoProduto')
    var estoque = 


    var img = document.createElement('img')
    document.body.appendChild(img)

    var fReader = new FileReader();
        fReader.readAsDataURL(foto.files[0]);
        fReader.onloadend = function(event){
        img.src = event.target.result;
    }

    
    
}