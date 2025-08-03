document.querySelector('#popup_deletar').style.display = 'none'
document.querySelector('#popup_alterar').style.display = 'none'


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

    }else{
        const elemento_aviso = document.querySelector('#avisos');
        elemento_aviso.textContent = "Nenhum contato correspondente com sua pesquisa";
    }}


let modoApagar = false
document.querySelector('#deletador').style.display ='none'


document.querySelector('#bt_deletar').onclick = () => {
    let ctts_que_serao_apagados = []

    if(modoApagar){
        modoApagar = false
    }
    else{
        modoApagar = true
    }

    let lista_global = JSON.parse(localStorage.getItem('lista_global') || '[]');

    if(lista_global.length > 0){

        if(modoApagar){
            document.querySelector('#deletador').style.display ='inline'

            document.querySelector('#deletador').onclick = () => {
            }
            document.querySelectorAll('li').forEach((li) => { 

            li.style.background = "#C41010"
            li.onclick = () => {
            li.style.backgroundColor = "#580002";

            let contato = li.textContent.split('-')
            
            let nome_ctt_escolhido = contato[0].trim()
            let number_ctt_escolhido = contato[1].trim() 
            let i = 0
            
            //ver o contato dentro do li e dizer qual o correspondente dele na lista_global
            for(i; i < lista_global.length; i++){
                let dict_dentro_da_listaglobal = lista_global[i]

                if(nome_ctt_escolhido == dict_dentro_da_listaglobal['name'] && number_ctt_escolhido == dict_dentro_da_listaglobal['number'] ){

                    if(ctts_que_serao_apagados.indexOf(dict_dentro_da_listaglobal) === -1){
                    ctts_que_serao_apagados.push(dict_dentro_da_listaglobal)
                    }else{
                        ctts_que_serao_apagados.splice(ctts_que_serao_apagados.indexOf(dict_dentro_da_listaglobal), 1)
                        li.style.background = "#C41010"
                    }}
            }

        }
         } )

        document.querySelector('#deletador').onclick = () => {
            // FUNCIONAMENTO DO POP-UP
            const dialog = document.querySelector('#popup_deletar')
            dialog.showModal()
            dialog.style.display = 'inline'

            // SE CLICAR NÃO NO POP-UP
            document.querySelector('#dialog_nao').onclick = () => {
            
            ctts_que_serao_apagados = []

            document.querySelectorAll('li').forEach((li) => {
                li.style.backgroundColor = "#C41010"
            })
            dialog.style.display = 'none'
            dialog.close()
            }

            //SE CLICAR SIM NO POP-UP
            document.querySelector('#dialog_sim').onclick =() => {
            let b = 0

            for(b; b < ctts_que_serao_apagados.length; b++){
                
                let ctt_vai_ser_apagado = ctts_que_serao_apagados[b]
                lista_global.splice(lista_global.indexOf(ctt_vai_ser_apagado), 1)
            }

            document.querySelectorAll('li').forEach((li) => {li.remove()})

            for(let b=0; b < lista_global.length; b++){
                let dict_c_ctt = lista_global[b]
                criar_linhas(dict_c_ctt)
            }
            dialog.style.display ='none'
            dialog.close()
            modoApagar = false
            document.querySelector('#deletador').style.display = 'none'

            localStorage.setItem('lista_global', JSON.stringify(lista_global));
        }
            }


            // SE O MODO APAGAR ESTIVER DESATIVADO:
        }else {
            document.querySelector('#deletador').style.display = 'none';


            document.querySelectorAll('li').forEach((li) => {
                li.onclick = () => {
                    console.log('nada')
                }
                li.style.backgroundColor = "#F3E8EE"
            })
        }

    }
}

let modoAlterar = false


document.querySelector('#bt_alterar').onclick = () => {

    let lista_global = JSON.parse(localStorage.getItem('lista_global') || '[]');

    const dialogAlterar = document.querySelector('#popup_alterar')


    if(modoAlterar){
        modoAlterar = false
    }else{
        modoAlterar = true
    }

    


    
    if(modoAlterar){
    document.querySelectorAll('li').forEach((li) => {



        li.style.background = 'green'

        li.onclick = () => {
            console.log(li.textContent)

            let contato_q_vai_ser_alterado = li.textContent.split('-')
            dialogAlterar.style.display = 'inline'
            dialogAlterar.showModal()
            
            document.querySelector('#dialog_nome').value = contato_q_vai_ser_alterado[0].trim()
            document.querySelector('#dialog_numero').value = contato_q_vai_ser_alterado[1].trim()
            




        }

    } 

    
    
    )}
    
    
    else{
        document.querySelectorAll('li').forEach( (li) =>{
        li.style.background = '#F3E8EE'
    })
    }



    document.querySelector("#btdialog_salvar").onclick = () => {
        nome_ctt_alterado = contato_q_vai_ser_alterado[0].trim()
        nmr_ctt_alterado = contato_q_vai_ser_alterado[1].trim()

        for(let d = 0;d < lista_global.length; d++){

            let dict_analisado = lista_global[d]

            if(nome_ctt_alterado == dict_analisado['name'] && nmr_ctt_alterado == dict_analisado['number'] ){

                console.log(dict_analisado)
            }

        }

        }



    document.querySelector("#btdialog_apagar").onclick = () => {
        dialogAlterar.style.display = 'none'
        dialogAlterar.close()
    
        }


}
