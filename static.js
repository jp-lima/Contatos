
function criar_linhas(dict){


    const nova_li = document.createElement('li')

    nova_li.innerHTML = `${dict['name']}  -  ${dict['number']}` 

    document.querySelector('ul').append(nova_li)
}



document.addEventListener('DOMContentLoaded', () => {
    let ain = JSON.parse(localStorage.getItem('lista_global') || '[]');
    
    for (let i = 0; i < ain.length; i++) {

      let dicionario_com_ctt = ain[i];
      criar_linhas(dicionario_com_ctt);
    }
});
 


document.querySelector('#bt_adicionar').onclick = () => {
    
    let lista_antiga = JSON.parse(localStorage.getItem('lista_global') || '[]');
    
    nome = document.querySelector('#nome_do_ctt').value;
    numero = document.querySelector('#numero_do_ctt').value;

    let dicionario = {name:nome, number:numero};

    lista_antiga.push(dicionario);
   
    document.querySelector('#nome_do_ctt').value = ''
    document.querySelector('#numero_do_ctt').value = ''

criar_linhas(dicionario);

    localStorage.setItem('lista_global', JSON.stringify(lista_antiga));



}

document.querySelector('#bt_pesquisar').onclick = () => {
    let contato_encontrado = 0
    let lista_global = JSON.parse(localStorage.getItem('lista_global') || '[]');

     let i = 0

    const numero_pesquisado = document.querySelector('#numero_do_ctt').value || ''
    const nome_pesquisado = document.querySelector('#nome_do_ctt').value || ''

    for(i; i < lista_global.length; i++){

        const dict_ctt_analisado = lista_global[i];

        if(numero_pesquisado.length > 0){

            if(dict_ctt_analisado["number"] == numero_pesquisado){
                lista_global.splice(i,1);   
                lista_global.unshift(dict_ctt_analisado);
                contato_encontrado = 1;
            }

        }

        if(nome_pesquisado.length > 0){

        if(dict_ctt_analisado["name"] === nome_pesquisado){

            lista_global.splice(i,1);

            lista_global.unshift(dict_ctt_analisado);

            contato_encontrado = 1;


        }
        }
    
    }

        let t = 0

    if (contato_encontrado === 1){
        document.querySelector('#avisos').textContent = ''

        console.log('encontrado')

        document.querySelectorAll('li').forEach( (li) => {
            li.remove();
        }

        )
         for(t; t < lista_global.length; t++){
            let dicionario = lista_global[t]
            criar_linhas(dicionario)
        }

    }

    else{
        const elemento_aviso = document.querySelector('#avisos');
        elemento_aviso.textContent = "Nenhum contato correspondente com sua pesquisa";
    }
    
}

document.querySelector('#bt_deletar').onclick = () => {

    let lista_global = JSON.parse(localStorage.getItem('lista_global') || '[]');



    if(lista_global.length > 0){

    document.querySelectorAll('li').forEach((li) => {  
    li.onclick = () => {

        li.remove();

        console.log(li.textContent)
    }
}
)}
}