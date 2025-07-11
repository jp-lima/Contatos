document.addEventListener('DOMContentLoaded', () =>  {
    let ain = localStorage.getItem('lista_global')

    console.log(ain)

    let i = 0
    for(i; i<ain.length; i++);{
        console.log(i)
        let dicionario_com_ctt = ain[i];

        criar_linhas(dicionario_com_ctt);
    }

})


function criar_linhas(dict){


    const nova_li = document.createElement('li')

    nova_li.innerHTML = `${dict['name']}  -  ${dict['number']}` 

    document.querySelector('ul').append(nova_li)
}


document.querySelector('#enviar').onclick = () => {

    let lista_de_ctts = [] 
    let lista_antiga = localStorage.getItem('lista_global');
    
    
    
    nome = document.querySelector('#nome_do_ctt').value;
    numero = document.querySelector('#numero_do_ctt').value;


    let dicionario = {name:nome, number:numero};

    
    lista_de_ctts.push(dicionario);
    lista_de_ctts.push(lista_antiga);
    
   
    document.querySelector('#nome_do_ctt').value = ''
    document.querySelector('#numero_do_ctt').value = ''

criar_linhas(dicionario);

    localStorage.clear();
    localStorage.setItem('lista_global', lista_de_ctts)


}
