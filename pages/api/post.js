import { MongoClient } from 'mongodb';

// Function to connect to MongoDB
async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    if (!client.isConnected()) {
        await client.connect();
    }

    return client.db('duolingo'); // Replace 'duolingo' with your database name
}

// API route handler
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const data = req.body;

    // Check if data is present
    if (!data) {
        return res.status(400).json({ message: 'No data received' });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('Duolingo'); // Replace 'Duolingo' with your collection name

        // Check if data is an array or an object
        if (Array.isArray(data)) {
            // Insert multiple records
            const result = await collection.insertMany(data);
            return res.status(201).json({ message: `${result.insertedCount} records inserted successfully!` });
        } else if (typeof data === 'object') {
            // Insert a single record
            const result = await collection.insertOne(data);
            return res.status(201).json({ message: 'Data inserted successfully!', insertedId: result.insertedId });
        } else {
            return res.status(400).json({ message: 'Invalid data format' });
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
}
