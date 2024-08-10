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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userModel_1 = __importDefault(require("../models/userModel"));
const userController_1 = require("../controllers/userController");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/signup', [(0, express_validator_1.check)("email", "Please provide a valid email")
        .isEmail(),
    (0, express_validator_1.check)("password", "Please provide a password greater or equal to six characters")
        .isLength({
        min: 6
    }),
    (0, express_validator_1.check)("name", "Please provide a name")
        .isLength({
        min: 1
    })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const roleId = Number(req.body.roleId);
    // validated input
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
    }
    //validate if user doesn't exist
    // Define an asynchronous function to find users
    // Example usage
    findUsersByEmail(email)
        .then((users) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`User is found or not? = ${users}`);
        if (users) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "This user already exists",
                    }
                ]
            });
        }
        else {
            const hashedPass = yield bcrypt_1.default.hash(password, 10);
            console.log(`this password is hashed ${hashedPass}`);
            (0, userController_1.createUser)(req, res, hashedPass)
                .then();
            const payload = {
                email: email,
                roleId: roleId
            };
            // Secret key for signing the JWT
            const SECRET_KEY = 'jkdfhajfkhkd';
            /* const token = await JWT.sign(payload,
              SECRET_KEY,
              {
                  expiresIn : 210000
              }); */
            const token = jsonwebtoken_1.default.sign({ payload: payload }, SECRET_KEY, { expiresIn: '1h' });
            console.log(`email= ${email} + token = ${token}`);
            res.json({
                token
            });
            //res.send(201).send('Auth is working');
        }
    }));
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    findUsersByEmail(email)
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "Invalid Credentials",
                    }
                ]
            });
        }
        //user exists, now decrypt the password to check if it matches with DB
        else {
            //first, get the password in DB
            const user = yield userModel_1.default.findOne({ where: { email: email } });
            const dbPass = user.password;
            const userEmail = user.email;
            const roleId = user.roleId;
            console.log(`email= ${user.email} and roleID = ${roleId}`);
            let isMatch = yield bcrypt_1.default.compare(password, dbPass);
            if (!isMatch) {
                return res.status(400).json({
                    "errors": [
                        {
                            "msg": "Invalid Credentials",
                        }
                    ]
                });
            }
            const payload = {
                email: email,
                roleId: roleId
            };
            // Secret key for signing the JWT
            const SECRET_KEY = 'jkdfhajfkhkd';
            /*  const token = await JWT.sign(payload,
               SECRET_KEY,
               {
                   expiresIn : 210000
               }); */
            const token = jsonwebtoken_1.default.sign({ payload: payload }, SECRET_KEY, { expiresIn: '1h' });
            res.json({
                token
            });
            console.log(dbPass);
        }
    }));
}));
function findUsersByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Perform the query
            const user = yield userModel_1.default.findOne({ where: { email: email } });
            return user;
        }
        catch (error) {
            // Handle errors
            console.error('Error fetching users:', error);
            throw error;
        }
    });
}
exports.default = router;
