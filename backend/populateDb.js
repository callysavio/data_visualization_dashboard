import jsonData from './jsonData.json' assert { type: "json" };
import DataModel from "./model/dataModel.js";

// function to insert json data into database
const populateDatabase = async (jsonData) => {
    try {
        console.log('Data to insert:', jsonData);
        await DataModel.insertMany(jsonData);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        throw error;
    }
};

populateDatabase(jsonData);