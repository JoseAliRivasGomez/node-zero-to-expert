const Ticket = require("./ticket");
const path = require('path');
const fs = require('fs');

class TicketList {

    constructor(){
        this.ultimoNumero = 0;
        this.hoy = new Date().getDate();
        this.pendientes = [];
        this.asignados = [];

        this.init();
    }

    get toJson() {
        return {
            ultimoNumero: this.ultimoNumero,
            hoy: this.hoy,
            pendientes: this.pendientes,
            asignados: this.asignados,
        }
    }

    init() {
        const {hoy, ultimoNumero, pendientes, asignados} = require('../db/data.json');
        if(hoy === this.hoy){
            this.pendientes = pendientes;
            this.ultimoNumero = ultimoNumero;
            this.asignados = asignados;
        }else{
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    siguienteNumero() {
        if(this.ultimoNumero<99){
            this.ultimoNumero++;
        }else{
            this.ultimoNumero = 1;
        }
        const nuevoTicket = new Ticket(this.ultimoNumero, null);
        this.pendientes.push(nuevoTicket)
        this.guardarDB();
        return nuevoTicket.numero;
    }

    asignarTicket(escritorio){
        if(this.pendientes.length === 0){
            return null;
        }
        const siguienteTicket = this.pendientes.shift();
        siguienteTicket.escritorio = escritorio;

        this.asignados.unshift(siguienteTicket);
        if(this.asignados.length > 4){
            this.asignados.slice(-1,1)
        }
        this.guardarDB();
        return siguienteTicket;
    }

}

module.exports = TicketList;