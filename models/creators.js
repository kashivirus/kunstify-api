
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
            UPDATE auctions SET 
            tokenId = ${tokenId}  , 
            transactionHash = ${transactionHash},
            reservePrice = ${reservePrice} , 
            highestBid = ${highestBid} , 
            endTimeinSeconds  = ${unixTimestampInSeconds} ,
            isSettles = ${isSettles} , 
            highestBidder = ${highestBidder}
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

    getAllCreaters(){
        return db.execute(`
        SELECT n.username , n.firstName , n.type , n.bio , n.displayImage, n.coverImage, n.verified FROM creators n;
        `)
    }

    
    
    getSingleCreator(walletAddress , username){
        return db.execute(`
        SELECT c.username, n.title, n.description, n.image, n.nftType , n.video,
        n.sale, n.fixedprice, n.categoryId, n.status FROM creators c JOIN nfts n ON (c.walletAddress = n.ownerwallet)
        WHERE c.walletAddress = ${walletAddress} OR c.username = '${username}'
        
        `)
    }
// logically incorrect query
    getAllArts(){
        return db.execute(`


        SELECT  
        n.*,
        MAX(auc.highestBid) AS HighestBider, 
        fp.transactionHash, fp.owner, fp.price, fp.onSale, fp.isSold,
        cr.username, cr.firstName, cr.type, cr.displayImage, cr.coverImage, 
        ow.username, ow.firstName, ow.type, ow.displayImage, ow.coverImage
                
                    FROM nfts n 
                    LEFT JOIN fixedPrice fp 
                    ON(fp.tokenId  = n.tokenId) AND fp.status =1

                    LEFT JOIN auctions auc
                    ON(auc.tokenId = n.tokenId) and auc.status =1
                    
                    JOIN creators  cr 
                    ON(cr.walletAddress =  n.creatorwallet)
                    
                    JOIN creators ow
                    ON(ow.walletAddress = n.ownerwallet)
                    
                    WHERE n.sale =1;


        `)}

    getSingleArts(username){
        return db.execute(`


        SELECT  
        n.*,
        fp.transactionHash, fp.owner, fp.price, fp.onSale, fp.isSold,
        cr.username, cr.firstName, cr.type, cr.displayImage, cr.coverImage, 
        ow.username, ow.firstName, ow.type, ow.displayImage, ow.coverImage
                
                    FROM nfts n 
                    JOIN fixedPrice fp 
                    ON(fp.tokenId  = n.tokenId) AND fp.status =1
                    
                    JOIN creators  cr 
                    ON(cr.walletAddress =  n.creatorwallet)
                    
                    JOIN creators ow
                    ON(ow.walletAddress = n.ownerwallet)
                    
                    WHERE n.sale =1 AND c.username = ${cr.username};
        
        
        `)

    }

    updatnftstus(){
        return db.execute(`UPDATE nfts SET status = 1`)
    }


    // order id confused
    // INSERT INTO fixedPrice SET   
    // tokenId = "mona-tokenid",
    // transactionHash ="MONA-HASH",
    // owner = 1, 
    // price=100;
    putFixPrice(tokenId,transactionHash,owner,price , orderID){
        return db.execute(`
            INSERT INTO fixedPrice
            SET 
            tokenId = "${tokenId}",
            transactionHash = "${transactionHash}", 
            owner = "${owner}",
            price = ${price},
            orderID = ${orderID}
        `)
    }

    fixedpriceSaleStatus(orderID){
        return db.execute(`
            UPDATE fixedPrice SET onSale =1 WHERE orderId = ${orderID} 
        `)
    }

    
    uPfpStatus(){
        return db.execute(`UPDATE fixedPrice SET status = 1`)
    }
/////////keep only required params, query incomplete
//  later use ie  === sale, auction , fixedprice, categoryId, categoryId, status
    mintArt({nft_id,tokenId,title,description,nftType,creatorwallet,ownerwallet,sale,auction,fixedprice,transactionHash,categoryId,status} , image, video){
        console.log("PO")
        return db.execute(`
        INSERT INTO nfts SET 
        tokenId = "${tokenId}", 
        title = "${title}",
        description ="${description}", 
        image = "${image}",
        nftType ="${nftType}", 
        video ="${video}", 
        creatorwallet ="${creatorwallet}", 
        ownerwallet ="${ownerwallet}", 
        transactionHash ="${transactionHash}"
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

    checkEmail(email){
        return db.execute(`SELECT * FROM creators WHERE walletAddress= ? ` , [email	])
    }

    checkUsername(username){
        return db.execute(`SELECT * FROM creators WHERE walletAddress= ? ` , [username	])
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
            `
            SELECT verificationToken,  createdAt from creators WHERE verificationToken = '${verificationToken}';
            `
        );

        // SELECT verificationToken, createdAt FROM creators WHERE verificationToken = '${verificationToken}'
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