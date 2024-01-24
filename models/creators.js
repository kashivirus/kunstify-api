import db from "../config/database.js"

class Creators{
    constructor(){}


    dummy(){
        return db.execute("select * from creators")
    }


    checkEmail(email){
        // return db.execute(`SELECT * FROM creators WHERE email ="${email}" `)
        return db.execute(`SELECT * FROM creators WHERE email = ? ` , [email])

    }

    checkWalletAddress(walletAddress){
        return db.execute(`SELECT * FROM creators WHERE walletAddress= ? ` , [walletAddress	])
    }


    signUP(username, walletAddress, password, email) {
        return db.execute(
            `INSERT INTO creators SET
                username = '${username}',
                walletAddress = "${walletAddress}",
                password  = "${password}",
                email = "${email}"`
        );
    }

 


}



export default Creators;