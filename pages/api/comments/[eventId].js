import {MongoClient} from "mongodb";
import {connectToDB, getAllDocuments, insertDocument} from "../../../helpers/db-util";

async function handler(req,res)
{
    const eventId = req.query.eventId;
    let client;
    try{
        client = await connectToDB();
    } catch (error) {
        res.status(500).json({message: 'Connection to db failed'})
        return
    }

    if ( req.method === 'POST')
    {
        const {email, name, text} = req.body;
        if(!email || !email.includes('@')  || name.trim() === '' || !name || text.trim() === '')
        {
            res.status(422).json({message: 'Invalid input.'});
            return
        }
        let newComment = {
            email,
            name,
            text,
            eventId
        }
        try {
            const resp = await insertDocument(client, 'comments', newComment)
            console.log(resp)
            res.status(201).json({message: 'Added comment', comment: newComment})
        }
        catch (error){
            res.status(500).json({message: 'Data insert failed'})
            return
        }

    }

    if (req.method === 'GET')
    {
        let documents
        try {
            documents = await getAllDocuments(client, 'comments',{_id: -1} )
            res.status(200).json({comments: documents})
        }catch (error) {
            res.status(500).json({message: 'Get data failed'})
            return
        }
    }
    client.close();
}
export default handler;