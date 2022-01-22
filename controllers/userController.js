const express=require('express')

const router=express.Router()

const {body,validationResult}=require('express-validator')

const User=require('../models/userModel')

router.post('',body('first_name').notEmpty().withMessage("first name required"),
body('last_name').notEmpty().withMessage("last name required"),
body('email').isEmail().withMessage("Please Enter valid Email Address"),
body('pincode').isLength({min:6,max:6}).withMessage('Pincode should be exactly 6 Digit'),
body('age').notEmpty().withMessage("please enter age").custom((value)=>{
    if(value<=0||value>=100)
    {
        return Promise.reject("Enter age between 1 to 100")
    }
    return true
}),
body('gender').custom((value)=>{
    if(value!=="Male"&&value!=="Female"&&value!=="Others")
    {
        return Promise.reject('should be either Male, Female or Others')
    }
    return true  
}),
async(req,res)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()})

        }
        const user=await User.create(req.body)
        return res.send(user)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
}
)
module.exports=router