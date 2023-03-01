console.log('Hola mundo');

import data from './data.json' assert {type: 'json'};

let charBarsContainer = document.querySelector('.chart__bars-container');

let values = [];

data.forEach(element=>{
    values.push(element.amount);
    charBarsContainer.innerHTML += `
        <div class="chart__bar">
          <div class="chart__bar--label">$${element.amount}</div>
          <div class="chart__bar--day">${element.day}</div>
        </div> `
});

/* Nota:

    52.36 ----> 200px
    17.45 ----> x

    x = (17.45 * 200px)/52.36
    Altura = (Valor actual * alturaMaxBaraPx) / valueMax 

 */

let alturaMaxBaraPx = 150;
let valueMax = Math.max(...values);

let bars = document.querySelectorAll('.chart__bar');
bars = [...bars];

bars.forEach(barra=>{

   let nuevoValor = parseFloat((barra.childNodes[1]).innerText.slice(1));


   let alturaActualPx = (nuevoValor * alturaMaxBaraPx)/valueMax;

   if(nuevoValor == valueMax){
   barra.style.background = 'hsl(186, 34%, 60%)';
   }


   barra.style.height = `${alturaActualPx}px`;

    barra.addEventListener('mouseover',(event)=>{
        console.log(event);
       
        if(event.target.className == 'chart__bar'){
       
        let labelElemente = event.target.childNodes[1];
        labelElemente.style.display = 'block';

    }


    })

    barra.addEventListener('mouseout',(event)=>{
        if(event.target.className == 'chart__bar'){
            let labelElemente = event.target.childNodes[1];
            labelElemente.style.display = 'none';
        }
        
    })
})

