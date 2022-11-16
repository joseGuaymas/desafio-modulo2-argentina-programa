const formulario = document.getElementById('formulario');
const formularioNombre = document.getElementById('formulario-nombre');
const formularioEmail = document.getElementById('formulario-email');
const formularioAsunto = document.getElementById('formulario-asunto');
const formularioMensaje = document.getElementById('formulario-mensaje');
const contenedorCampos = document.getElementById('contenedor-campos');
const btnEnviar = document.getElementById('boton-enviar');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let error = [];
let errorNombre = true;   
let errorEmail = true;   
let errorAsunto = true;   
let errorMensaje = true;   

iniciarApp();

function iniciarApp() {
    agregarEventListeners();
    btnEnviar.disabled = true;
    btnEnviar.classList.add('disabled');
};

function agregarEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        formulario.addEventListener('submit', enviarFormulario);        
    });
    formularioNombre.addEventListener('blur', validarFormulario);
    formularioEmail.addEventListener('blur', validarFormulario);
    formularioAsunto.addEventListener('blur', validarFormulario);
    formularioMensaje.addEventListener('blur', validarFormulario);
}

function enviarFormulario(e) {
    e.preventDefault();
    
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(()=>{
        spinner.style.display = 'none';
        mostrarMensaje('El email se ha enviado exitosamente', 'exito', btnEnviar.parentElement.nextElementSibling);
    }, 3000);
}

function validarFormulario(e){
    if(e.target.value.length > 0) {
        switch(e.target.id){
            case 'formulario-nombre':
                const nombre = formularioNombre.value;
                if(nombre.length > 50){                    
                    mostrarMensaje('El nombre no puede contener más de 50 caracteres', 'error', formularioNombre.parentElement.nextElementSibling);
                    errorNombre = true;
                    return;
                }                
                errorNombre = false;
                break;

            case 'formulario-email':
                const email = formularioEmail.value;
                if(!expresionRegular.test(email)){
                    mostrarMensaje('El email no es válido', 'error', formularioEmail.parentElement.nextElementSibling);
                    errorEmail = true;                    
                    return;
                }
                errorEmail = false;
                break;

            case 'formulario-asunto':
                const asunto = formularioAsunto.value;
                if(asunto.length > 50){
                    mostrarMensaje('El asunto no puede contener más de 50 caracteres', 'error', formularioAsunto.parentElement.nextElementSibling);
                    errorAsunto = true;
                    return;
                }
                errorAsunto = false;
                break;

            case 'formulario-mensaje':
                const mensaje = formularioMensaje.value; 
                if(mensaje.length > 300){
                    mostrarMensaje('El mensaje no puede contener más de 300 caracteres', 'error', formularioMensaje.parentElement.nextElementSibling);
                    errorMensaje = true;
                    return;
                }
                errorMensaje = false;
                break;

            default:
                return;
        }

    } else {
        switch(e.target.id){
            case 'formulario-nombre':
                const nombre = formularioNombre.value;
                if(nombre == ''){                    
                    errorNombre = true;
                    mostrarMensaje('El nombre no puede ir vacío', 'error', formularioNombre.parentElement.nextElementSibling);
                    return;
                }
                break;
            case 'formulario-email':
                const email = formularioEmail.value;
                if(email == ''){
                    errorEmail = true;
                    mostrarMensaje('El email no puede ir vacío', 'error', formularioEmail.parentElement.nextElementSibling);
                    return;
                }
                break;

            case 'formulario-asunto':
                const asunto = formularioAsunto.value;
                if(asunto == ''){
                    errorAsunto = true;
                    mostrarMensaje('El asunto no puede ir vacío', 'error', formularioAsunto.parentElement.nextElementSibling);
                    return;
                }
                break;
            case 'formulario-mensaje':
                const mensaje = formularioMensaje.value; 
                if(mensaje == ''){
                    errorMensaje = true;
                    mostrarMensaje('El mensaje no puede ir vacío', 'error', formularioMensaje.parentElement.nextElementSibling);
                    return;
                }
                break;

            default:
                return;
        }
    }   
    
    if(errorNombre == false && errorEmail == false && errorAsunto == false && errorMensaje == false){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('disabled');
    }
}

function mostrarMensaje(mensaje, tipo, origen) {
    let mostrarMensaje;
    if(tipo == 'error'){
        mostrarMensaje = document.querySelector('.error');
    } else if (tipo == 'exito'){
        mostrarMensaje = document.querySelector('.exito');
    }    
    
    if(!mostrarMensaje) {            
        const divMensaje = document.createElement('div');
        divMensaje.classList.add(tipo);    
        divMensaje.textContent = mensaje;   
        contenedorCampos.insertBefore(divMensaje, origen);
        
        setTimeout(()=> {
            divMensaje.remove();            
            if (tipo == 'exito'){
                formulario.reset();
                btnEnviar.disabled = true;
                btnEnviar.classList.add('disabled');
            }
        }, 3000);
    }
}