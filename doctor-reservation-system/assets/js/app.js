import { staff } from "./data/staff_data.js";
import { services } from "./data/services_data.js";
import { renderCalendar } from "./calendar.js";
import { time_data } from "./data/time_data.js";
import { loadModal } from "./modal.js";


const button_next_step = document.querySelector('.nxt-btn');
const button_previous_step = document.querySelector('.back-btn');
const staff_section = document.querySelector('.staff-section');
const staff_section_list = document.querySelector('.staff-section .card-list');
const services_section = document.querySelector('.service-section');
const service_section_list = document.querySelector('.service-section .card-list')
const confirm_section = document.querySelector('.confirm-section');
const date_section = document.querySelector('.date-section');
const allSections = document.querySelectorAll('.single-section');
const timeSelf = document.querySelector('.time-self .calendar-content') ;
const firstnameField = document.querySelector('#firstname');
const lastnameField = document.querySelector('#lastname');
const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#phone');
const detailsContainer =  document.querySelector('.note-box');
const alertBox = document.querySelector('.alert-msg')
const menuItems = document.querySelectorAll('.menu-item') ;


let currentStep = 1 ;
let currentDate = new Date();

let appState = {
    customer : {} ,
    date : "" , 
    service_id : "" ,
    staff_id : "" , 
    time : "" 
}

 
function menuSteps(){
    // let img = document.createElement('img') ; 
    // img.src = 'assets/images/service1.svg'
    
     menuItems.forEach(item=>{
        item.classList.remove('active')
        item.classList.remove('completed')


        if(item.dataset.id<currentStep){
            item.classList.remove('active')
            item.classList.add('completed')
        }else if(item.dataset.id == currentStep){
            item.classList.remove('completed')
            item.classList.add('active')
        } 
     })
    
}

menuSteps();
 
function toNextSection(){
    let findActiveStaff = Array.from(staff_section_list.children).find(item=>item.classList.contains('selected')) ;
    let findSelectedService = Array.from(service_section_list.children).find(item=>item.classList.contains('selected')) ;

    if(currentStep ===1 && !findActiveStaff){
        stepAlert('Select staff')
        return ;
    }

    if(currentStep === 2 && !findSelectedService){
        stepAlert('Select service')
        return ;
    }

    if(currentStep === 3){
        loadDetails() ;
        if(Boolean(appState.date)===false || appState.time.length<1){
            stepAlert('Add date and time')
            return ;
        }
    }
    if(currentStep ===4){
        validateForm()
    }
    if(currentStep>0 && currentStep<4){
        currentStep = currentStep+1 ;
        renderSection()
    }

}

button_next_step.addEventListener('click',toNextSection)


button_previous_step.addEventListener('click',()=>{
    if(currentStep>1 && currentStep<=4){
        currentStep = currentStep-1 ;
        
    }
    renderSection()
})


function renderSection(){

[...allSections].forEach(item=>{
    item.style.display = 'none';
})
switch(currentStep){
    case 1 : 
        staff_section.style.display = 'block';
    break ; 
    case 2 : 
        services_section.style.display = 'block';
    break ; 
    case 3 : 
    date_section.style.display = 'block';
    break ; 
    case 4 : 
    confirm_section.style.display = 'block';
    break ; 
}

menuSteps();

}
 
/* Staff section */
function renderStaffSection() {
    [...staff].forEach(single_staff => {
        const staffCard = document.createElement('li');
        staffCard.className = 'card-item';

        staffCard.innerHTML += `
            <div class="left">
                <div class="avatar">
                    <img src="${single_staff.image}" alt="Avatar">
                </div>
                <div class="content">
                    <div class="title">
                         ${single_staff.name}
                    </div>
                    <div class="subtitle">
                       ${single_staff.email}
                    </div>
                </div>
            </div>
        `;


        staff_section_list.appendChild(staffCard);

        staffCard.addEventListener('click', (e) => {
               
            if(e.target.classList.contains('card-item')){
                Array.from(e.target.parentElement.children).forEach(item=>{
                    item.classList.remove('selected')
                })

                    e.target.classList.add('selected')
                    appState.staff_id = single_staff.id; 
                    toNextSection()
            }
        });
    });
}
renderStaffSection();


/* Services section */
function renderServices(){
    [...services].forEach(single_service => {
        const serviceCard = document.createElement('li');
        serviceCard.className = 'card-item';

        serviceCard.innerHTML += `
                <div class="left">
                <div class="avatar">
                    <img src="${single_service.image}" alt="Avatar">
                </div>
                <div class="content">
                    <div class="title">
                        ${single_service.name}
                    </div>
                    <div class="subtitle">
                         ${single_service.duration} 
                    </div>

                </div>
            </div>

            <div class="right">
                <span class="price">$${single_service.price}</span>
            </div>
        `;


        service_section_list.appendChild(serviceCard);

        serviceCard.addEventListener('click', (e) => {
               
            if(e.target.classList.contains('card-item')){
                Array.from(e.target.parentElement.children).forEach(item=>{
                    item.classList.remove('selected')
                })

                    e.target.classList.add('selected')
                    appState.service_id = single_service.id; 
                    toNextSection()
            }
        });
    });
}
renderServices();


/* Time section */

renderCalendar(currentDate.getFullYear(), currentDate.getMonth() , appState , renderTime);

function renderTime(){
    
    timeSelf.innerHTML="";
    
    time_data.forEach(time=>{
        let singleTimeBox = document.createElement('div') ; 
        singleTimeBox.className = 'single-time' ;
        let beginingTime= document.createElement('span') ; 
        let endingTime= document.createElement('span') ; 
        beginingTime.innerHTML = time.start_time ; 
        endingTime.innerHTML = time.end_time ;
        singleTimeBox.appendChild(beginingTime)
        singleTimeBox.appendChild(endingTime)

        singleTimeBox.addEventListener('click',(e)=>{

            [...timeSelf.children].forEach(item=>{
                item.classList.remove('selected')
            })

            appState.time = time
            if(e.target.classList.contains('single-time')){
                e.target.classList.add('selected')
            }else{
                e.target.parentElement.classList.add('selected')
            }
            
        })

         timeSelf.appendChild(singleTimeBox)
         
     })
}

/* Details section */

function validateForm(){
    if(firstnameField.value !== '' && lastnameField.value !== '' && emailField.value !== '' && phoneField.value !== '' ){
        appState.customer = {
             name : firstnameField.value ,
             surname : lastnameField.value , 
             email : emailField.value , 
             phone : phoneField.value
        }
        console.log(appState);
        
        loadModal('success','Confirmation completed successfully!') ;

    }else{
        loadModal('warning','Please fill the all required fields!') ;
        return;
    }
}

function loadDetails(){
    console.log(appState);
    const staffData = [...staff].find(staff=>staff.id === appState.staff_id) ;
    const serviceData = [...services].find(service=>service.id === appState.service_id) ;
    
    detailsContainer.innerHTML =  `
            <label>Note</label>
            <ul class="note-list">
                <li class="note-item">
                    Staff:
                    <span>${staffData.name}</span>
                </li>
                <li class="note-item">
                    Service:
                    <span>${serviceData.name}</span>
                </li>
                <li class="note-item">
                    Date:
                    <span>${appState.date} / ${appState.time.start_time} - ${appState.time.end_time}</span>
                </li>
                <li class="note-item">
                    Price:
                    <span class="price-txt">$${serviceData.price}</span>
                </li>
            </ul>
    ` ;
  
}

function stepAlert(errorMessage){
    alertBox.children[1].innerText = errorMessage ;
    alertBox.classList.remove('alert_deactive') ;
    alertBox.classList.add('alert_active') ; 

    setTimeout(()=>{
        alertBox.classList.remove('alert_active') ;
        alertBox.classList.add('alert_deactive') ;
    },1000)
}