import { generateToken } from "../lib/utlis.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {

    if(!fullName || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" });   
    }

    if(password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({email});
    if(user) return res.status(400).json({message: "Email already exists"});
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password:hashedPassword,
    });

    if(newUser) {
         generateToken(newUser._id, res);
         await newUser.save();
         return res.status(201).json({ message: "User created successfully",
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,   
            profilePicture: newUser.profilePicture,

          });
    } else {
      return res.status(400).json({ message: "User creation failed" });
    }
    
  } catch (error) {
    console.error("Error during signup:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const login =  async (req, res) => {
  const { email, password } = req.body;
   try{
     const user = await User.findOne({email})

      if(!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

     const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if(!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
      }); 

   } catch (error) {
     console.error("Error during login:", error.message);
     return res.status(500).json({ message: "Internal server error" });
   }
}   

export const logout = (req, res) => {
   try{
       res.cookie("jwt", "", {maxAge: 0})
       res.status(200).json({ message: "User logged out successfully" });
   } catch (error) {
     console.error("Error during logout:", error.message);
     return res.status(500).json({ message: "Internal server error" });
   }
}


export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Check if it already has the Data URI prefix
    let imageToUpload = profilePicture.trim();
    if (!imageToUpload.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageToUpload, {
      folder: "profile_pictures",
      resource_type: "image",
    });

    // Save new profile picture URL in DB
    const updatedUser = await User.findByIdAndUpdate(
      User._id,
      { profilePicture: uploadResult.secure_url },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = (req, res) => {
   try {
         res.status(200).json(req.user);
   } catch (error) {
     console.error("Error checking authentication:", error.message);
     return res.status(500).json({ message: "Internal server error" });
   }  
}