const fs = require('fs');
const colors = require('colors');

const crearArchivo = async (base = 5, listar = false, hasta = 10) => {

    // fs.writeFile(`tabla-${base}.txt`, salida, (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    // });

    try {

        let consola = '';
        let salida = '';

        for (let i = 1; i <= hasta; i++) {
            salida += `${base} x ${i} = ${base*i}\n`;
            consola += `${base} ${'x'.blue} ${i} ${'='.green} ${base*i}\n`;
        }

        if(listar){
            console.log('============================'.green);
            console.log('        Tabla del: '.red, colors.blue(base));
            console.log('============================'.green);
            console.log(consola);
        }

        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        return `tabla-${base}.txt`;
        
    } catch (error) {
        throw err
    }

}

module.exports = {
    crearArchivo
}