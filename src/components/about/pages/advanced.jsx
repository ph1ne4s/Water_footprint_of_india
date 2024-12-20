import React, { useState } from "react";

function SignInForm() {
  const [sum, setSum] = useState(0);
  const [showSum, setShowSum] = useState(false);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [dietaryHabit, setDietaryHabit] = useState("");
  const [age, setAge] = useState("");
  const [areaType, setAreaType] = useState("");
  const [nonVegOptions, setNonVegOptions] = useState({
    egg: false,
    fish: false,
    meat: false,
  });
  const [milkAmount, setMilkAmount] = useState("");
  const [fruits, setFruits] = useState("");
  const [shower, setShower] = useState("");
  const [vegetables, setVegetables] = useState("");

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "gender") {
      setGender(value);
    } else if (name === "country") {
      setCountry(value);
    } else if (name === "dietaryHabit") {
      setDietaryHabit(value);
      if (value === "vegetarian") {
        setNonVegOptions({ egg: false, fish: false, meat: false });
      }
    } else if (name === "age") {
      setAge(value);
    } else if (name === "areaType") {
      setAreaType(value);
    } else if (name === "nonVegOption") {
      setNonVegOptions({ ...nonVegOptions, [value]: checked });
    } else if (name === "milkAmount") {
      setMilkAmount(value);
    } else if (name === "fruits") {
      setFruits(value);
    } else if (name === "shower") {
      setShower(value);
    } else if (name === "vegetables") {
      setVegetables(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const baseWaterFootprint = 110;
    let genderWaterFootprint = 0;
    let dietaryHabitWaterFootprint = {};
    if (age > 15) {
      genderWaterFootprint = gender === "male" ? 4 : 3.5;
    } else {
      genderWaterFootprint = gender === "male" ? 3 : 2.5;
    }
    if (gender === "male") {
      dietaryHabitWaterFootprint = {
        vegetarian: 770,
        non_veg:
          770 +
          (nonVegOptions.egg ? 200 : 0) +
          (nonVegOptions.fish ? 270 : 0) +
          (nonVegOptions.meat ? 860 : 0),
      };
    } else {
      dietaryHabitWaterFootprint = {
        vegetarian: 700,
        non_veg:
          700 +
          (nonVegOptions.egg ? 200 : 0) +
          (nonVegOptions.fish ? 180 : 0) +
          (nonVegOptions.meat ? 645 : 0),
      };
    }

    const areaTypeFactor = areaType === "rural" ? 0 : 15;

    let waterFootprint =
      baseWaterFootprint +
      genderWaterFootprint +
      dietaryHabitWaterFootprint[dietaryHabit] +
      (milkAmount ? milkAmount * 1000 : 0) / 1000 +
      (fruits ? fruits * 30 : 0) / 1000 +
      (vegetables ? vegetables * 250 : 0) / 1000 +
      areaTypeFactor +
      20 * shower;

    if (age > 45 && age <= 70) {
      waterFootprint = waterFootprint * 0.9;
    } else if (age > 70) {
      waterFootprint = waterFootprint * 0.8;
    }
    setSum(waterFootprint);
    setShowSum(true);
  };

  return (
    <div className="formCenter">
      <form className="formFields" onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formFieldLabel">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={handleChange}
            className="formFieldInput"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="formField">
          <label className="formFieldLabel">Country</label>
          <select
            name="country"
            value={country}
            onChange={handleChange}
            className="formFieldInput"
            required
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="formField">
          <label className="formFieldLabel">Dietary Habit</label>
          <div>
            <label>
              <input
                type="radio"
                name="dietaryHabit"
                value="vegetarian"
                onChange={handleChange}
                required
              />{" "}
              Vegetarian
            </label>
            <label>
              <input
                type="radio"
                name="dietaryHabit"
                value="non_veg"
                onChange={handleChange}
                required
              />{" "}
              Non-Vegetarian
            </label>
          </div>
        </div>

        {dietaryHabit === "non_veg" && (
          <div className="formField">
            <label className="formFieldLabel">Non-Vegetarian Options</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="nonVegOption"
                  value="egg"
                  checked={nonVegOptions.egg}
                  onChange={handleChange}
                />{" "}
                Egg
              </label>
              <label>
                <input
                  type="checkbox"
                  name="nonVegOption"
                  value="fish"
                  checked={nonVegOptions.fish}
                  onChange={handleChange}
                />{" "}
                Fish
              </label>
              <label>
                <input
                  type="checkbox"
                  name="nonVegOption"
                  value="meat"
                  checked={nonVegOptions.meat}
                  onChange={handleChange}
                />{" "}
                Meat
              </label>
            </div>
          </div>
        )}

        <div className="formField">
          <label className="formFieldLabel">Area Type</label>
          <div>
            <label>
              <input
                type="radio"
                name="areaType"
                value="rural"
                onChange={handleChange}
                required
              />{" "}
              Rural
            </label>
            <label>
              <input
                type="radio"
                name="areaType"
                value="urban"
                onChange={handleChange}
                required
              />{" "}
              Urban
            </label>
          </div>
        </div>

        <div className="formField">
          <label className="formFieldLabel">Milk Consumption (grams/day)</label>
          <input
            type="number"
            name="milkAmount"
            value={milkAmount}
            onChange={handleChange}
            className="formFieldInput"
            required
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Fruits Consumption (grams/day)</label>
          <input
            type="number"
            name="fruits"
            value={fruits}
            onChange={handleChange}
            className="formFieldInput"
            required
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel">Vegetables Consumption (grams/day)</label>
          <input
            type="number"
            name="vegetables"
            value={vegetables}
            onChange={handleChange}
            className="formFieldInput"
            required
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel">Showers per day?</label>
          <input
            type="number"
            name="shower"
            value={shower}
            onChange={handleChange}
            className="formFieldInput"
            required
          />
        </div>

        <div className="formField" style={{ marginBottom: "20px" }}>
          <label className="formFieldLabel">Age</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleChange}
            className="formFieldInput"
            required
          />
        </div>

        <div className="formField">
          <button className="formFieldButton">Submit</button>
        </div>

        {showSum && (
          <div className="formField">
            <p>Your water footprint is: {sum} L/day</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default SignInForm;
