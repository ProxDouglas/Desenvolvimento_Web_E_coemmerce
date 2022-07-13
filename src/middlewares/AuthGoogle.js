const dotenv = require('dotenv');
dotenv.config();

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const axios = require('axios');

class AuthGoogle{


    async verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return payload;

    }
    //verify().catch(console.error);


    async verifyIdToken(token){

        //https://oauth2.googleapis.com/tokeninfo?id_token=
        
        try{
            let res = await axios.post('https://oauth2.googleapis.com/tokeninfo?id_token=' + String(token))
        
            // console.log(`Status: ${res.status}`);
            // console.log('Body: ', res.data);
            if(res.status == 200){
                return true;
            }

        }catch(err){
            console.error(err);
        }

        return false;
    }

}

module.exports = new AuthGoogle;
