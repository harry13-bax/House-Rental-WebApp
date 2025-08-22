import { useEffect, useState } from "react";
import Layout from "./Layout";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

const Host = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    UserId: userId,
    carName: "",
    carNumber: "",
    carModel: "",
    carType: "",
    carSeats: "",
    carFuelType: "",
    carDeliveryType: "",
    carPrice: "",
    carCountry: "",
    carCity: "",
    carImage: null,
    startDate: "",
    endDate: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "startDate" || name === "endDate" ? new Date(value).toISOString().split("T")[0] : value,
    }));

    if (name === "carCountry") {
      const selectedCountry = countries.find((country) => country.name === value);
      setFormData((prevData) => ({
        ...prevData,
        carCity: selectedCountry.cities[0],
      }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      carImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:8080/api/car/add", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Car added successfully!");
        setFormData({
          UserId: userId,
          carName: "",
          carNumber: "",
          carModel: "",
          carType: "",
          carSeats: "",
          carFuelType: "",
          carDeliveryType: "",
          carPrice: "",
          carCountry: "",
          carCity: "",
          carImage: null,
          startDate: "",
          endDate: "",
          available: true,
        });
        toast({
          title: "house added successfully!",
          description: "Your house has been added successfully.",
          type: "background",
        });
      } else {
        const errorText = await response.text();
        console.error("Error adding house:", errorText);
        toast({
          title: "Error adding house",
          description: errorText,
          type: "foreground",
        });
      }
    } catch (error) {
      console.error("Error adding house:", error);
      toast({
        title: "Error adding house",
        description: error.message,
        type: "foreground",
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  return (
    <div>
      <Layout />
      <div className="flex flex-col items-center justify-center text-gray-900 font-mono space-y-10 my-10 bg-no-repeat bg-cover bg-center bg-[url('https://wallpapercave.com/wp/wp4110643.jpg')]">
        <div className="flex flex-col items-center justify-center text-gray-900 font-mono space-y-5">
          <h1 className="text-6xl font-bold">Welcome Host</h1>
          <h3 className="text-3xl font-normal">
            Please Submit the details of the house you want to rent out!
          </h3>
        </div>
        <div className="mt-10 flex items-center justify-center text-gray-900 font-mono">
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4 grid grid-cols-2 items-center justify-center">
              <label htmlFor="carName">House/Apartment name:</label>
              <input
                type="text"
                onChange={handleChange}
                value={formData.carName}
                id="carName"
                name="carName"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                focus:ring-2 focus:ring-indigo-400"
                required
              />

              <label htmlFor="carNumber">House/Apartment Number:</label>
              <input
                type="text"
                onChange={handleChange}
                value={formData.carNumber}
                id="carNumber"
                name="carNumber"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                focus:ring-2 focus:ring-indigo-400"
                required
              />

              <label htmlFor="carModel">Naerby Landmark:</label>
              <input
                type="text"
                onChange={handleChange}
                value={formData.carModel}
                id="carModel"
                name="carModel"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                          focus:ring-2 focus:ring-indigo-400"
                required
              />

              <label htmlFor="carType">House Type:</label>
              <select
                id="carType"
                name="carType"
                onChange={handleChange}
                value={formData.carType}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                          focus:ring-2 focus:ring-indigo-400"
                required
              >
                <option value="" disabled hidden>
                  Select type
                </option>
                <option value="Sedan">bungalow</option>
                <option value="SUV">Villa</option>
                <option value="Hatchback">Apartment</option>
              </select>

              <label htmlFor="carSeats">Number Of Guests:</label>
              <input
                type="number"
                onChange={handleChange}
                value={formData.carSeats}
                id="carSeats"
                name="carSeats"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                            focus:ring-2 focus:ring-indigo-400"
                required
              />

              <label htmlFor="carFuelType">BHK:</label>
              <select
                id="carFuelType"
                name="carFuelType"
                onChange={handleChange}
                value={formData.carFuelType}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                          focus:ring-2 focus:ring-indigo-400"
                required
              >
                <option value="" disabled hidden>
                  Select BHK
                </option>
                <option value="Petrol">1BHK</option>
                <option value="Diesel">2BHK</option>
                <option value="Electric">3BHK</option>
              </select>

              <label htmlFor="carDeliveryType">Payment:</label>
              <select
                id="carDeliveryType"
                name="carDeliveryType"
                onChange={handleChange}
                value={formData.carDeliveryType}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                            focus:ring-2 focus:ring-indigo-400"
                required
              >
                <option value="" disabled hidden>
                  Select payment type
                </option>
                <option value="Self">offline</option>
                <option value="Doorstep">online</option>
              </select>

              <label htmlFor="carPrice">price:</label>
              <input
                type="text"
                onChange={handleChange}
                value={formData.carPrice}
                id="carPrice"
                name="carPrice"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                            focus:ring-2 focus:ring-indigo-400"
                required
              />

              <label htmlFor="carCountry">Country:</label>
              <select
                id="carCountry"
                name="carCountry"
                onChange={handleChange}
                value={formData.carCountry}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                          focus:ring-2 focus:ring-indigo-400"
                required
              >
                <option value="" disabled hidden>
                  Select country
                </option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              <label htmlFor="carCity">City:</label>
              <select
                id="carCity"
                name="carCity"
                onChange={handleChange}
                value={formData.carCity}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                          focus:ring-2 focus:ring-indigo-400"
                required
              >
                <option value="" disabled hidden>
                  Select city
                </option>
                {countries.map((country) =>
                  country.cities.map((city, i) => (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  ))
                )}
              </select>

              <label htmlFor="carImage">House Image:</label>
              <input
                type="file"
                id="carImage"
                name="carImage"
                onChange={handleImageChange}
                accept="image/*"
                required
              />

              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                focus:ring-2 focus:ring-indigo-400"
                required
              />

              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none 
                focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="mt-4 flex space-x-4">
              <input
                type="submit"
                value="Submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md focus:outline-none 
                focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="reset"
                value="Reset"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md focus:outline-none 
                focus:ring-2 focus:ring-indigo-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Host;
