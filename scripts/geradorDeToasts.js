function gerarToast(titulo,mensagem,small){
    
    if(document.getElementById('containerToast')===null){
        console.log("yep");
        var toastBoard = document.createElement('div')
        toastBoard.setAttribute('class',"toast-container position-fixed bottom-0 end-0 p-3")
        toastBoard.setAttribute('id',"containerToast")
        document.body.appendChild(toastBoard)
    }

    if(small!=='undefined'){
        small=''
    }

    var newToast = document.createElement("div")
    newToast.setAttribute("class","toast")
    newToast.setAttribute("role","alert")
    newToast.setAttribute("aria-live","assertive")
    newToast.setAttribute("aria-atomic","true")

    txt = `<div class="toast-header">
            <img src="./imagens/close.png" class="rounded me-2" alt="Erro">
                <strong class="me-auto">${titulo}</strong>
                <small class="text-muted">${small}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
        ${mensagem}
        </div>`

    newToast.innerHTML = txt

    document.getElementById('containerToast').appendChild(newToast)

    const toast = new bootstrap.Toast(newToast)

    toast.show()
    
}