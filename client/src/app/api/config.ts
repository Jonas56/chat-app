import jwt_decode, { JwtPayload } from "jwt-decode";
const USER = "userChatApp";

let expired = false;
let user = JSON.parse(localStorage.getItem(USER)!);
if (user) {
  let decodedToken: JwtPayload = jwt_decode(user.accessToken);
  let currentDate = new Date();
  // JWT exp is in seconds
  if ((decodedToken.exp as number) * 1000 < currentDate.getTime()) {
    expired = true;
  }
}

export default expired;
