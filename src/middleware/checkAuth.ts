import { Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken'
import User from "../models/userModel";
import Role from "../models/role"

 export async function checkAuth (req:Request,res:Response,next:any){
    const token = req.header('x-auth-token');
    console.log(`checkAuth token = ${token}`)
    
    if(!token){
        return res.status(400).json({
            "errors":[
                {
                    "msg" : "Access Denied"
                }
            ]
        });
    }
 try{
    console.log(`token= ${token}`);
    let payload = await JWT.verify(token,"jkdfhajfkhkd",(err,decoded)=>{
        if(err) 
            return res.status(400).json({
            "errors":[
                {
                    "msg" : "Access Denied"
                }
            ]
        });
        const email = (decoded as any).payload.email;
        const roleId = (decoded as any).payload.roleId;
        req.body.email = email;
        req.body.roleId = roleId;
        next();
    });
   
}catch(err){
    return res.status(400).json({
        "errors":[
            {
                "msg" : "Token is Invalid"
            }
        ]
    });
} 

}

export async function checkAdmin(req: Request, res: Response, next: NextFunction) {
    /* //Get auth hear value
    const bearerHeader = req.headers['authorization'];
    //check if bearer undefined
    if(typeof bearerHeader !== undefined){
        //split at the space
        const bearer:string = bearerHeader?.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        next();

    } */
    const token = req.header('x-auth-token');
    console.log(`checkAuth token = ${token}`);

    if (!token) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Access Denied"
                }
            ]
        });
    }

    try {
        console.log(`token= ${token}`);
        JWT.verify(token, "jkdfhajfkhkd", async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    "errors": [
                        {
                            "msg": "Unauthorized"
                        }
                    ]
                });
            }
            console.log('Decoded:', decoded);
            /* res.json({
                decoded
            }); */
            // `decoded` should be the payload from the JWT, which usually contains user information
            const email = (decoded as any).payload.email;
            const roleId = (decoded as any).payload.roleId;
            console.log(`email = ${email}`);
            console.log(`roleId = ${roleId}`);

           /*  // Check if user exists and is an admin
            const adminUser = await User.findOne({
                where: {
                    email: email,
                    roleId: 1
                },
                include: [Role]
            });

            if (!adminUser) {
                return res.status(403).json({
                    "errors": [
                        {
                            "msg": "Not Authorized"
                        }
                    ]
                });
            } */

                //check if role ==1
                if(roleId != 1){
                    return res.status(400).json({
                        "errors":[
                            {
                                "msg": "Not Authorized"
                            }
                        ]
                    });
                }

            next();
        });
    } catch (err) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Token is Invalid"
                }
            ]
        });
    }
}


    /* const userEmail = req.body.email;
    const role = await User.findAll({
        where: { 
            email : userEmail,
            roleId: '1' },
        include: [Role], // This will include post details if needed
      });
      if(!role){
        return res.status(400).json({
            "errors":[
                {
                    "msg" : "Access Denied"
                }
            ]
        });

      }
      next(); */
/* export async function checkAdmin(req:Request,res:Response,next:any){
      const token = req.header('x-auth-token');
    console.log(`checkAuth token = ${token}`)
    
    if(!token){
        return res.status(400).json({
            "errors":[
                {
                    "msg" : "No Token Found"
                }
            ]
        });
    }
 try{
    console.log(`token= ${token}`);
     await JWT.verify(token,"jkdfhajfkhkd",(err,user)=>{
        if(err) 
            return res.status(400).json({
            "errors":[
                {
                    "msg" : "UnAuthorized"
                }
            ]
        });

    
    
    req.body.email = user;
    console.log(`email = ${user}`)
    console.log(`reqBodyEmail = ${req.body.email}`)
    const AdminUser = User.findOne({
        where: { email:req.body.email,
                roleId : 1
         },
        include: [Role], // This will include post details if needed
      });
      if(!AdminUser)
        return res.status(400).json({
        "errors":[
            {
                "msg" : "Not Authorized"
            }
        ]
    });
    next();
});
}catch(err){
    return res.status(400).json({
        "errors":[
            {
                "msg" : "Token is Invalid"
            }
        ]
    });
} 

}

 */