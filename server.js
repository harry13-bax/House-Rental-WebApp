const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const countrySchema = new mongoose.Schema({
  name: String,
  cities: [String]
});

const carSchema = new mongoose.Schema({
  UserId: String,
  carName: String,
  carNumber: String,
  carModel: String,
  carType: String,
  carSeats: String,
  carFuelType: String,
  carDeliveryType: String,
  carPrice: String,
  carCountry: String,
  carCity: String,
  carImage: String,
  startDate: String,
  endDate: String,
  available: Boolean
});

const Country = mongoose.model('Country', countrySchema);
const Car = mongoose.model('Car', carSchema);

app.get('/api/countries', async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function validateCarData(carData) {
  const requiredFields = [
    'UserId', 'carName', 'carNumber', 'carModel', 'carType', 'carSeats', 'carFuelType',
    'carDeliveryType', 'carPrice', 'carCountry', 'carCity', 'startDate', 'endDate'
  ];
  
  for (let field of requiredFields) {
    if (!carData[field]) {
      console.error('validateCarData: Missing required field', { field, carData });
      return false;
    }
  }
  return true;
}

app.post('/api/rentals', async (req, res) => {
  try {
    const { carId } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(carId, { available: false }, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ error: 'House not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    console.error('Error renting House:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/car/add', upload.single('carImage'), async (req, res) => {
  try {
    const {
      UserId,
      carName,
      carNumber,
      carModel,
      carType,
      carSeats,
      carFuelType,
      carDeliveryType,
      carPrice,
      carCountry,
      carCity,
      startDate,
      endDate,
    } = req.body;
    
    if (!req.file) {
      throw new Error('Car image is required');
    }
    
    const carImage = req.file.path;
    const carData = {
      UserId,
      carName,
      carNumber,
      carModel,
      carType,
      carSeats,
      carFuelType,
      carDeliveryType,
      carPrice,
      carCountry,
      carCity,
      carImage,
      startDate,
      endDate,
      available: true
    };
    
    if (!validateCarData(carData)) {
      throw new Error('Validation failed for car data');
    }
    
    const newCar = new Car(carData);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Error adding car:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});