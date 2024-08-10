import {Request, Response} from 'express';
import Role from '../models/role';

async function createRole(req:Request,res:Response){
    let type = 'Admin';
    await Role.create({type});
    type = 'User'
    await Role.create({type});

}

export default createRole;