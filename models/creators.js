import db from "../config/database.js"

class Creators{
    constructor(){}


    checkEmailPass(email, password){
        return db.execute(`SELECT *  FROM creators WHERE email='${email}' `)
    }

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

    verifySignupToken(token){
        return db.execute(`

        `)
    }

    updateVeriTok(token){
        return db.execute(`UPDATE creators SET verificationToken='${token}'`)
    }


    getAllNFTS(){
        return db.execute(`
        SELECT c.firstName, c.displayImage , n.fixedprice, n.image  
    FROM creators c 
    INNER JOIN  nfts n
    ON (c.creatorID = n.ownerWallet);        
        `)
    }


}



export default Creators;