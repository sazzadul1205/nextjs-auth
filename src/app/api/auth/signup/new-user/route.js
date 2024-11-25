import connectDB from "@/lib/connectDB";

console.log("hit");

export const POST = async (request) => {
  try {
    const newUser = await request.json();
    console.log("Received new user data:", newUser); // Debugging log

    const db = await connectDB();
    const userCollection = db.collection("Users"); // Ensure collection name is correct
    const res = userCollection.insertOne(newUser);

    console.log("User added:", res);
    return new Response(JSON.stringify({ message: "New User Created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ message: "Something Went Wrong" }), {
      status: 500,
    });
  }
};
