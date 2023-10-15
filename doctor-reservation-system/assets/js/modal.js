

export function loadModal(type , message){

    const modal_layer = document.querySelector('.modal--alert') ;
    const modal_self = document.querySelector('.modal--self') ;
    const modal_close = document.querySelector('.modal--self img') ;
    const modalClass = type=='success' ? 'success' : 'warning'
    let modal_message = document.querySelector('.modal-message') ;


    modal_message.innerHTML = message ;
    modal_layer.style.transition = '200';
    modal_layer.style.opacity = 1;
    modal_layer.style.visibility = 'visible';

    modal_self.style.transition='300ms'
    modal_self.style.top='0'

    modal_message.classList.add(modalClass)


    modal_close.addEventListener('click',()=>{

        modal_self.style.transition='300ms'
        modal_self.style.top='-100px'
        modal_message.classList.remove(modalClass)
        modal_message.textContent = '' ;

    modal_layer.style.transition = '200';
    modal_layer.style.opacity = 0;
    modal_layer.style.visibility = 'hidden';
    })

}