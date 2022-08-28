const colors = require('colors');
const {crearArchivo} = require('./helpers/multiplicar');
const {argv} = require('./config/yargs');

console.clear();

// console.log(process.argv);
// const [,, arg3 = 'base=5'] = process.argv;
// const [,base = 5] = arg3.split('=');

//console.log(argv);



//const base = 3;

//node app -b 6 -h 20 -l
//node app -b=6
//node app --base 6
//node app --base=6
//node app --version
//node app --help
crearArchivo(argv.b, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch(err => console.log(err));