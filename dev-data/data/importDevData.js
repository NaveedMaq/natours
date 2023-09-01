const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (error) {
    console.error('error 💥:', error);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data successfully deleted!');
  } catch (error) {
    console.error('error 💥:', error);
  }
  process.exit();
};

let runFunction = null;
if (process.argv[2] === '--import') {
  runFunction = importData;
} else if (process.argv[2] === '--delete') {
  runFunction = deleteData;
} else {
  console.error('error 💥', 'operation arg has to be --import or --delete');
  process.exit(1);
}

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
  runFunction();
});
