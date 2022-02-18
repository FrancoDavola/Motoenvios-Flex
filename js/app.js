const kmSelect = document.querySelector('#km')
const formulario = document.querySelector('#cotizar-envio')


function Envio(marca, km , tipo){
    this.marca  = marca;
    this.km = km ;
    this.tipo = tipo;
}


function iU(){}

iU.prototype.llenarOpciones = () => {
    
    

    for(let i = 1; i <= 35 ; i++){
        const optionKm = document.createElement('option')
        optionKm.textContent = `${i} Km's`
        optionKm.dataset.id = i
        kmSelect.appendChild(optionKm)
    }

}

Envio.prototype.cotizarEnvio = function(){

     let cantidad;
     let baseCaba = 105
     let baseNorte = 95
     let baseOeste = 90
     let baseSur = 110
      

    switch(this.marca){
        case '1' : cantidad = baseCaba * Number(this.km.slice(0 ,2))
    break;
        case '2' : cantidad = baseNorte * Number(this.km.slice(0 ,2))
    break;
        case '3' : cantidad = baseOeste * Number(this.km.slice(0 ,2))
    break;
        case '4' : cantidad = baseSur * Number(this.km.slice(0 ,2))
    break;
        default:

        break;
    }
         console.log(this.tipo)

    if(this.tipo === 'basico'){
              cantidad *= 1.30
            }else {
              cantidad *= 1.50
            }

             return cantidad; 
}

iU.prototype.mostrarResultado = (total , envio) => {

    const div = document.createElement('div')
    div.classList.add('mt-10')

    div.innerHTML = `
       <p class="header"> Tu resumen </p>
       <p class="font-bold"> Total : $${total} </p>
    
    `;

    const resultadoDiv = document.querySelector('#resultado')
    

    const spinner = document.querySelector('#cargando')
          spinner.style.display = 'block'

    setTimeout(() => {
        spinner.style.display = 'none'
        resultadoDiv.appendChild(div)
    }, 2000);
    
}


iU.prototype.mostrarMensaje = (mensaje , tipo) => {

    const div = document.createElement('div')

    if(tipo === 'error'){
        div.classList.add('mensaje' ,'mt-10','error')
    }else {
        div.classList.add('mensaje' ,'mt-10' ,'correcto')
    }

    div.textContent = mensaje
    formulario.insertBefore(div , document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 2000);
}

const iu = new iU();


document.addEventListener('DOMContentLoaded' , () => {
    iu.llenarOpciones()
})

eventListener()
    function eventListener(){
      formulario.addEventListener('submit' , cotizarEnvio)
}

function cotizarEnvio(e){
    e.preventDefault()
    
    const marca = document.querySelector('#marca').value
    const km = document.querySelector('#km').value
    const tipo = document.querySelector('input[name="tipo"]:checked').value
    
    if(marca == '' || km == '' || tipo == ''){
        iu.mostrarMensaje('Los campos estan vacios' , 'error')
        return;
    }

    iu.mostrarMensaje('Cotizando' , 'correcto')

    const resultado = document.querySelector('#resultado div')
           if(resultado != null){
              resultado.remove()
            }


    const envio = new Envio(marca, km , tipo)
    const total =  envio.cotizarEnvio()

    iu.mostrarResultado(total , envio)


}