import dotenv from "dotenv";
import express from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { dbConnect } from "./config/db.js";
import DataModel from "./model/dataModel.js";
import { paginate } from "./utils/Pagination.js";
import path from 'path';

const app = express();
const { NODE_ENV, PORT = 5000 } = process.env;

app.use(cors());
app.use(express.json());
app.use(helmet());

if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = path.resolve()
// Serve static files from the "frontend/build" directory in production
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  
  // For any route that is not an API endpoint, serve the frontend
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.status(httpStatus.OK).json({
      status: "success",
      message: "Welcome to the data visualization server",
    });
  });
}

app.get("/api/allData", async (req, res) => {
  const endYearQuery =
      req.query.end_year == "undefined" || req.query.end_year == null
        ? {}
        : { end_year: req.query.end_year };
    
    const topicQuery =
      req.query.topic == "undefined" || req.query.topic == null
        ? {}
        : { topic: { $regex: new RegExp(req.query.topic, "i") } };
    
const sectorQuery =
      req.query.sector == "undefined" || req.query.sector == null
        ? {}
        : { sector: req.query.sector };
    
    const regionQuery =
      req.query.region == "undefined" || req.query.region == null
        ? {}
        : { region: { $regex: new RegExp(req.query.region, "i") } };

    const countryQuery =
      req.query.country == "undefined" || req.query.country == null
        ? {}
        : { country: { $regex: new RegExp(req.query.country, "i") } };

     const sourceQuery =
      req.query.source == "undefined" || req.query.source == null
        ? {}
        : { source: { $regex: new RegExp(req.query.source, "i") } };
    

    const mergedQuery = {
      ...endYearQuery,
      ...topicQuery,
      ...sectorQuery,
      ...regionQuery,
      ...countryQuery,
      ...sourceQuery,
    };

   // console.log(mergedQuery ,"mergedQuery ")

    const model = "Data";
    const query = {
      ...mergedQuery,
    };
    const totalData = await DataModel.countDocuments(query)
    console.log(totalData, "totalData")
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || totalData;
    const populateField = [""];

    const data = await paginate(model, query, page, pageSize, populateField);
    //const allData = await DataModel.find({});

    res.status(httpStatus.OK).json({
      message: "success",
      data: data,
    })
    });
  


// Catch all other routes and return a 404 JSON response
app.all("*", (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    message: "Endpoint not found",
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Internal Server Error",
  });
});

// Database connection
dbConnect()
  .then(() => {
    console.log("Database is connected");
    // Start the server
    app.listen(PORT, () => {
      if (NODE_ENV !== 'production') {
        console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} environment`);
      }
    });
  })
  .catch((err) => {
    console.error(`Database error: ${err}`);
  });
