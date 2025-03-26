// import express from "express";
// import { createServer } from "node:http";

// import { Server } from "socket.io";

// import mongoose from "mongoose";
// import { connectToSocket } from "./controllers/socketManager.js";

// import cors from "cors";
// import userRoutes from "./routes/users.routes.js";

// const app = express();
// const server = createServer(app);
// const io = connectToSocket(server);


// app.set("port", (process.env.PORT || 8000))
// app.use(cors());
// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));

// app.use("/api/v1/users", userRoutes);

// const start = async () => {
//     app.set("mongo_user")
  
//     const connectionDb = await mongoose.connect("mongodb+srv://rachitpatel6337:7LAOvYrbrZBZC7WP@cluster0.bn7mh.mongodb.net/yourDatabaseName")

//     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
//     server.listen(app.get("port"), () => {
//         console.log("LISTENIN ON PORT 8000")
//     });



// }



// start();




import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

// Fix: Allow frontend origin to prevent CORS issues
app.use(
    cors({
        origin: "http://localhost:5173",  // Allow your frontend
        credentials: true,
    })
);

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    try {
        // Fix: Replace "yourDatabaseName" with the actual DB name
        const connectionDb = await mongoose.connect(
            "mongodb+srv://rachitpatel6337:7LAOvYrbrZBZC7WP@cluster0.bn7mh.mongodb.net/<YOUR_DATABASE_NAME>",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );

        console.log(` MONGO Connected. DB Host: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(` Server is running on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

start();