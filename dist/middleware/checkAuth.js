"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = checkAuth;
exports.checkAdmin = checkAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
            let payload = yield jsonwebtoken_1.default.verify(token, "jkdfhajfkhkd", (err, decoded) => {
                if (err)
                    return res.status(400).json({
                        "errors": [
                            {
                                "msg": "Access Denied"
                            }
                        ]
                    });
                const email = decoded.payload.email;
                const roleId = decoded.payload.roleId;
                req.body.email = email;
                req.body.roleId = roleId;
                next();
            });
        }
        catch (err) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "Token is Invalid"
                    }
                ]
            });
        }
    });
}
function checkAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
            jsonwebtoken_1.default.verify(token, "jkdfhajfkhkd", (err, decoded) => __awaiter(this, void 0, void 0, function* () {
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
                const email = decoded.payload.email;
                const roleId = decoded.payload.roleId;
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
                if (roleId != 1) {
                    return res.status(400).json({
                        "errors": [
                            {
                                "msg": "Not Authorized"
                            }
                        ]
                    });
                }
                next();
            }));
        }
        catch (err) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "Token is Invalid"
                    }
                ]
            });
        }
    });
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
