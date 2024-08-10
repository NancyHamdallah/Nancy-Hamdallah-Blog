import {Router, Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import User from '../models/userModel'
import {createUser} from '../controllers/userController'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import {checkAuth,checkAdmin} from '../middleware/checkAuth';

const router: Router = Router();
 
router.post('/signup', [check("email", "Please provide a valid email")
                        .isEmail(),
                        check("password","Please provide a password greater or equal to six characters")
                        .isLength({
                            min : 6
                        }),
                        check("name","Please provide a name")
                        .isLength({
                          min : 1
                        })
],async (req : Request,res:Response) =>{
    const email: string = req.body.email;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const roleId: number = Number(req.body.roleId);
    // validated input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
           errors: errors.array()
    })
    }

    //validate if user doesn't exist
    
// Define an asynchronous function to find users

  
  // Example usage

  findUsersByEmail(email)
    .then(async users => {
      console.log(`User is found or not? = ${users}`)
        if(users){

      return res.status(400).json({
        "errors": [
            {
                "msg": "This user already exists",
                
            }
        ]
    })
}else{
  const hashedPass = await bcrypt.hash(password, 10);
  console.log(`this password is hashed ${hashedPass}`);
  createUser(req,res,hashedPass)
  .then(); 
  const payload = {
    email: email,
    roleId:roleId
  }
// Secret key for signing the JWT
const SECRET_KEY = 'jkdfhajfkhkd';
  /* const token = await JWT.sign(payload,
    SECRET_KEY,
    {
        expiresIn : 210000
    }); */

  const token = JWT.sign({ payload : payload }, SECRET_KEY, { expiresIn: '1h' });
  console.log(`email= ${email} + token = ${token}`)

res.json({
token
})
  //res.send(201).send('Auth is working');
}
    });

    

})


router.post('/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    findUsersByEmail(email)
    .then(async (user) =>{
      if(!user){
      return res.status(400).json({
        "errors": [
            {
                "msg": "Invalid Credentials",
                
            }
        ]
    })
  }
  //user exists, now decrypt the password to check if it matches with DB

  else{
    //first, get the password in DB
    const user: any = await User.findOne({ where: { email: email } });
    const dbPass = user.password;
    const userEmail = user.email;
    const roleId = user.roleId;
    console.log(`email= ${user.email} and roleID = ${roleId}`)
    let isMatch = await bcrypt.compare(password,dbPass)
    if(!isMatch){
      return res.status(400).json({
        "errors": [
            {
                "msg": "Invalid Credentials",
                
            }
        ]
    })
  }
  const payload = {
    email: email,
    roleId:roleId
  }
// Secret key for signing the JWT
const SECRET_KEY = 'jkdfhajfkhkd';
 /*  const token = await JWT.sign(payload,
    SECRET_KEY,
    {
        expiresIn : 210000 
    }); */
    const token = JWT.sign({ payload: payload }, SECRET_KEY, { expiresIn: '1h' });

res.json({
token
})
    
    console.log(dbPass)

  }
    })

})

async function findUsersByEmail(email: string): Promise<User[]> {
  try {
    // Perform the query
    const user: any = await User.findOne({ where: { email: email } });

    return user;
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    throw error;
  }
}
export default router;