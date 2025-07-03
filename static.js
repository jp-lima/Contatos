let i = 0;


document.querySelector('#enviar').onclick = () => {
    nome = document.querySelector('#nome_do_ctt').value;
    numero = document.querySelector('#numero_do_ctt').value;

    const dicionario ={ name:nome, number:numero};

    console.log(dicionario);

    return false;
}



function hello(){
for (i; i<=10; i++){
    console.log(i);
}
}