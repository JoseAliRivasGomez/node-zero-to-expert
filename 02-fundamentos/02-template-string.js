const nombre = 'Kim';
const apellido = 'Wexler';

const nombreCompleto = `${nombre} ${apellido}`;
const nombreCompleto2 = `
${nombre}
${apellido}
${1+1}
`;

console.log(nombreCompleto);
console.log(nombreCompleto2);

function getSaludo(nombre){
    return `Hola ${nombre}`;
}

console.log(`Este es un texto: ${getSaludo(nombreCompleto)}`)