import {MongoClient} from "mongodb";
import {connectToDB, insertDocument} from "../../helpers/db-util";



async function handler(req, res) {
  console.log(req.body)
  if (req.method === "POST") {
    const email = req.body.email
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    let client;
    try{
       client = await connectToDB();
    } catch (error) {
      res.status(500).json({message: 'Connection to db failed'})
      return
    }

    try {
      await insertDocument(client, 'email',{email})
    }
    catch (error){
      res.status(500).json({message: 'Data insert failed'})
      return
    }
    client.close();
    res.status(201).json({message: 'Signed up!'})
  }
}
export default handler;
