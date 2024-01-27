
import db from "../config/database.js"

class Creators{
    constructor(){}

    UpdateVerifyStatus(token){
        return db.execute(`UPDATE creators SET verified = 1 WHERE verificationToken='${token}'`)
    }

    updateOtp(otp, email){
        return db.execute(`UPDATE creators SET otp = '${otp}' WHERE email = '${email}'`)
    }

    verifyAndLogin(otp){
        return db.execute(`SELECT  * from creators where otp = '${otp}'`)
    }


    putOnAuctions(tokenId,transactionHash, reservePrice, highestBid,endTimeinSeconds ,isSettles , highestBidder){
        const currentDate = new Date();
    const unixTimestamp = currentDate.getTime();
    const endTime = 24 * 60 * 60;
    const unixTimestampInSeconds = Math.floor(unixTimestamp / 1000 + endTime);
        return db.execute(`
            UPDATE auctions SET tokenId = ${tokenId}  , transactionHash = ${transactionHash},
            reservePrice = ${reservePrice} , highestBid = ${highestBid} , endTimeinSeconds  = ${unixTimestampInSeconds} ,
            isSettles = ${isSettles} , highestBidder = ${highestBidder}
        `)
    }


    transferNFT(){
        return db.execute(`UPDATE transferNft SET  transferFrom = '${transferFrom}' , transferTo = ${transferTo},
        amount = ${amount}, tokenId = ${tokenId} , transferType = '${transferType}', transferReferenceId = ${transferReferenceId},
        transferHash = '${transferHash}'
        
        `)
    }

    startbid(auction_id, price, transactionHash, settlement, bidder_id){
        return db.execute(`
            UPDATE bidding SET auction_id = ${auction_id} , price = ${price} , transactionHash = ${transactionHash}, settlement =${settlement}  WHERE bidder_id = ${bidder_id}
        `)
    }

    updatnftstus(){
        return db.execute(`UPDATE nfts SET status = 1`)
    }

    putOnFixPrice(orderID, tokenId , transactionHash , owner){
        return db.execute(`UPDATE fixedPrice SET orderId = '${orderID}' , 
            tokenId = '${tokenId}',
            transactionHash = '${transactionHash}',
            owner = '${owner}'
        
        `)
    }

    mintArt({nft_id,tokenId,title,description,nftType,creatorwallet,ownerwallet,sale,auction,fixedprice,transactionHash,categoryId,status} , image, video){
        return db.execute(`
        INSERT INTO nfts SET image= "${image}",
        title = '${title}',
        video = '${video}'
        ` )
    }

    checkEmailPass(email, password){
        return db.execute(`SELECT email, password, otp  FROM creators WHERE email='${email}' `)
    }

    dummy(){
        return db.execute("select * from creators")
    }

    // fields
    checkdata(){
        // return db.execute(`SELECT * FROM creators WHERE email ="${email}" `)
        return db.execute(`SELECT walletAddress, username, email from creators;`)

    }

    checkWalletAddress(walletAddress){
        return db.execute(`SELECT * FROM creators WHERE walletAddress= ? ` , [walletAddress	])
    }


    signUP(username, walletAddress, password, email , verificationTokenSend) {
        return db.execute(
            `INSERT INTO creators SET
                username = '${username}',
                walletAddress = "${walletAddress}",
                password  = "${password}",
                email = "${email}",
                verificationToken = '${verificationTokenSend}'
                `
        );
    }

    verifySignupToken(verificationToken){
        return db.execute(
            'SELECT verificationToken, createdAt FROM creators WHERE verificationToken = ?',
            [verificationToken]
        );
    }

    updateVerifyValue(){
        return db.execute(``)
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