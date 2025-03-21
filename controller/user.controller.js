import User from "../model/User.model.js"

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
        if (!user){
            return res.status(400).json({
                message:" User not registered"
            });
        }
        const user= await User.create({
            name,
            email,
            password
        })
    }
    catch (error){
    }
};

export {registerUser}