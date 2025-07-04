

let lista_com_ctts = [] 

function criar_linhas(lista){
    const nova_li = document.createElement('li')

    nova_li.innerHTML = `${lista[0]}   ${lista[1]}` 

    document.querySelector('ul').append(nova_li)
}


document.querySelector('#enviar').onclick = () => {

console.log('hahdhdhiuahudcxs')

    nome = document.querySelector('#nome_do_ctt').value;
    numero = document.querySelector('#numero_do_ctt').value;


    let lista = [nome, numero];

    
    lista_com_ctts.push(lista);
    

    document.querySelector('#nome_do_ctt').value = ''
    document.querySelector('#numero_do_ctt').value = ''

criar_linhas(lista);


}
