import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import { serve } from "inngest/express";
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";


const __dirname=path.resolve();

const app = express();

app.use(express.json());
app.use(cors({origin: ENV.CLIENT_URL || '*', Credentials: true}));
app.use(clerkMiddleware());

const PORT = ENV.PORT || 3000;

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});




if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend','dist','index.html'));
    }
  );
}


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server is running on port:", PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();