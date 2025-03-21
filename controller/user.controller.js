import User from "../model/User.model.js"
import cryto from "crypto"
import nodemailer from "nodemailer"

const registerUser = async (req,res)=>{
    // get data
    // validate
    // check is alredy exists
    // create a user in database
    // create a verification token
    // save token in database
    // email token to user
    // success status to user

    const{name,email,password}=req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        });   
    };
    try {
        const exisitingUser = await User.findOne({email})
        if (exisitingUser){
            return res.status(400).json({
                message:"User Already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        })

        console.log(user)

        if (!user){
            return res.status(400).json({
                message:" User not registered"
            });
        }

        const token= cryto.randomBytes(32).toString("hex")
        console.log(token);
        user.verificationToken = token

        await user.save()

        // Send Email
        const transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
  });

        const mailOption=nodemailer.createTransport({
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "Verify Your Email",
         text: `Please click on the following link:
        ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
        });

        await transporter.sendMail(mailOption);

        res.status(202).json({
        message:"User registered successfully",
        success:true
        })
        
    }
    catch (error){
        res.status(500).json({
            message: "User not regsitered",
            error,
            success:false,
        })
    }
};

const verifyuser= async (req,res)=> {
    // get token from url
    // validate Token
    // check Token
    // find user based on Token
    // if not find user
    // set Isverified after it is found
    // remove verification token
    // save and return response

    const {token}= req.params;
    console.log(token);
    if (!token){
        return res.status(400).json({
            message:"invalid Token"
        })
    }
    const user = await User.findOne({verificationToken:token})

    if (!user){
        return res.status(400).json({
            message:"invalid Token"
        })
    }

    user.isVerified = true
    user.verificationToken= undefined
    await user.save()

}

export {registerUser, verifyuser}