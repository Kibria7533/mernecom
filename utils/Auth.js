const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const passport = require("passport");
const User = require("../model/User");
// const { SECRET,PASSWORD } = require("../config");
var nodemailer = require('nodemailer');

/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const userRegister = async (userDets, role, res) => {
  console.log(userDets)
  try {  
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: {msg:`Username is already taken.`},
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: {msg:`Email is already registered.`},
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 10);
   
    // create a new user
    let activeToken = jwt.sign(
      { 
        email: userDets.email
      },
      process.env.SECRET,
      { expiresIn: "1 days" }
    );
   
   
   try{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tenminuteversity@gmail.com',
        pass: process.env.pass
      }
    });
   
    var link = 'https://ok-mad.herokuapp.com/api/users/active/'
                         +activeToken;
    var mailOptions = {
      from: 'tenminuteversity@gmail.com',
      to: userDets.email,
      subject: 'Welcome',
      html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
    };
    
await  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
        return res.status(400).json({
          message: {msg:`Probabliy you dont have internet.`},
          success: false
        });
       
      } else {
        const newUser = new User({
          ...userDets,
          password,
          role,
          activeToken
        });
    
         newUser.save().then(data=>{
          console.log('Email sent: ' + info.response);
          return res.status(201).json({
            message: {msg:`Hurry! now you are successfully registred. Please  login.`},
            success: true
          });
         }).catch(er=>{
          
          return res.status(400).json({
            message:  {msg:`Unable to create your account..`},
            success: false
          });
         })
       
      }
    });
 
   }
     
      catch(errror){
       
        return res.status(500).json({
          message: {msg:`Unable to create your account..`},
          success: false
        });
      }
      
   
  
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: {msg:`Unable to create your account..`},
      success: false
    });
  }
};

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid credentials.",
      success: false
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
    
  } 

  if(user && user.confirmed===false){
    return res.status(404).json({
      message: "Registerd but not confirmed",
      success: false
    });
  } else{
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        usercart:user.cart,
        email: user.email
      },
      process.env.SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      usercart:user.cart,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  }

};
const adminLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ username });
 

  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
    
  } 

  if(user && user.confirmed==false){
    return res.status(404).json({
      message: "Registerd but not confirmed",
      success: false
    });
  }else if(user && user.writterconfirmed==false){
    return res.status(404).json({
      message: "You Confirmed Your Account But please Wait For Authority Announcement",
      success: false
    });
  } 
  else{
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      },
      process.env.SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  }

};

const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

/**
 * @DESC Passport middleware
 */
// const userAuth = passport.authenticate("jwt", { session: false });
const userAuth=(req,res,next)=>{
  const mytoken=req.header('auth').split(' ');
  
  if (mytoken[1]) {
    return jwt.verify(mytoken[1], process.env.SECRET, function(err, decoded) {
        if (err) {
            return res.json({
                success: false,
                message: "Failed to authenticate token.",
            });
        }
      
        req.user = decoded;
        return next();
    });
}
return res.json({
  success: false,
  message: "Failed to authenticate.",
});
}


/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorize")
    : next();

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = user => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    cart:user.usercart,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  adminLogin,
  userRegister,
  serializeUser
};
