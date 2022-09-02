import { Request, Response } from "express";
import Usuario from "../models/usuario";
import {Op} from 'sequelize';

export const getUsuarios = async (req: Request, res: Response) => {

    try {

        const usuarios = await Usuario.findAll();

        res.json({
            usuarios
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

export const getUsuario = async (req: Request, res: Response) => {

    try {

        const {id} = req.params;

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                msg: `No existe un usuario con el ID ${id}`
            });
        }

        res.json({
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

export const postUsuario = async (req: Request, res: Response) => {

    try {

        const {body} = req;

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: `Ya existe un usuario con el correo ${body.email}`
            });
        }

        const usuario = Usuario.build(body);
        await usuario.save();

        res.json({
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const putUsuario = async (req: Request, res: Response) => {

    try {

        const {id} = req.params;
        const {body} = req;

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                msg: `No existe un usuario con el ID ${id}`
            });
        }

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email,
                id: {
                    [Op.ne]: id,
                }
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: `Ya existe un usuario con el correo ${body.email}`
            });
        }

        await usuario.update(body);

        res.json({
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {

    try {

        const {id} = req.params;

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                msg: `No existe un usuario con el ID ${id}`
            });
        }

        //await usuario.destroy();

        await usuario.update({estado: false});

        res.json({
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}