const { MongoClient, ServerApiVersion } = require("mongodb");

let db;

const connectDB = async () => {
  if (db) return db; // Return cached instance if already connected
  try {
    const uri =
      "mongodb+srv://psazzadul1205:7f8CimcqyDdl6Gzq@nexttest.hjuvm.mongodb.net/?retryWrites=true&w=majority&appName=NextTest&tls=true"; // Ensure TLS is enabled
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Log the database name for verification
    db = client.db("NextJs-auth"); // Ensure you specify your database
    console.log("Using database:", db.databaseName);

    // Optionally, perform a test query to verify the connection
    const serverStatus = await db.command({ serverStatus: 1 });
    // console.log("MongoDB server status:", serverStatus);

    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("MongoDB connection failed"); // Correct error handling
  }
};

export default connectDB;
