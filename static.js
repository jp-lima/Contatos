
function criar_linhas(dict){


    const nova_li = document.createElement('li')

    nova_li.innerHTML = `${dict['name']}  -  ${dict['number']}` 

    document.querySelector('ul').append(nova_li)
}






document.addEventListener('DOMContentLoaded', () => {
    let ain = JSON.parse(localStorage.getItem('lista_global') || '[]');
    console.log('puta que')
    console.log(ain); // Agora mostra a lista corretamente

    for (let i = 0; i < ain.length; i++) {
      console.log(i);
      let dicionario_com_ctt = ain[i];
      criar_linhas(dicionario_com_ctt);
    }
});
document.querySelector('#enviar').onclick = () => {

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
