const { leerInput, inquirerMenu, pausa, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();

require('colors');


const main = async () => {
    
    let opt = '';
    
    const busquedas = new Busquedas();

    do {
        
        opt = await inquirerMenu();
        
        switch (opt) {

            case 1:

                const termino = await leerInput('Ciudad:');
                const lugares = await busquedas.ciudad(termino);
                const idSelected = await listadoLugares(lugares);
                if(idSelected === '0') continue;

                const lugarSelected = lugares.find(lugar => lugar.id === idSelected);
                const {nombre, lat, lng} = lugarSelected;

                busquedas.agregarHistorial(nombre);

                const {temp, min, max, desc} = await busquedas.climaLugar(lat, lng);
                
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', nombre.green);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:', temp);
                console.log('Minima:', min);
                console.log('Maxima:', max);
                console.log('Descripcion:', desc.green);
                
                break;
        
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;

        }

        

        if(opt !== 0) await pausa();

    } while (opt !== 0);



}

main();