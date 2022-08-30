const http = require('http');

http.createServer((req, res) => {

    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    res.writeHead(200, {'Content-Type': 'application/csv'});

    res.write('id, nombre\n');
    res.write('1, Jimmy\n');
    res.write('2, Kim\n');
    res.write('3, Walter\n');
    res.write('4, Jesse\n');
    res.end();
})
.listen(4000);

console.log('Escuchando el puerto', 4000);