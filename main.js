import carsMock from './cars.js';



const $map = document.querySelector('#map');

const map = new window.google.maps.Map($map, {
    center:{
        lat:4.236166, 
        lng:-73.543396,
    },

    zoom: 6
})
renderData();

async function getData() {

    const response = await fetch('https://cars-api.vercel.app/api/cars/all');
    const data = await response.json();
    return data;
    
}
const popup = new window.google.maps.InfoWindow();

function rederExtraData({ placa , peso , cubicaje  }) {
    return `
        <div>
            <p> <strong> ${placa} </strong>  </p>
            <p> Peso: ${peso} </p>
            <p> Cubicaje: ${cubicaje}</p>
            <button type="button" onclick="myFunction()" >Contactar</button>
        </div> 
    `
}

async function renderData() {
    const data = await getData();
    console.log(data);

    data.data.forEach(item => {

        const marker = new window.google.maps.Marker({
            position: {
                lat: item.lat,
                lng: item.lng,
            },
            map,
            icon: 'https://img.icons8.com/material-two-tone/2x/in-transit.png'
        })
        marker.addListener('click' , () => {
            popup.setContent(rederExtraData(item))
            popup.open(map,marker);
        })

    })    
}

function myFunction(){
    console.log('myFunctionWorks');

    return `
    <div>
        <p> <strong> Mensaje </strong>  </p>
        <p> Peso: prueba </p>
        <p> Cubicaje:</p>
        <button type="button" onclick="myFunction()" >Contactar</button>
    </div> 
`
}

