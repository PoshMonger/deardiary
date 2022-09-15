import jwt from "jsonwebtoken";

function jwtTokens({
    user_id,user_name,user_email,user_online
}){

const user = {user_id,user_name,user_email,user_online}
const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,({expiresIn:'20min'}))
const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,({expiresIn:'5hr'}))
return({accessToken,refreshToken})

}

export {jwtTokens}