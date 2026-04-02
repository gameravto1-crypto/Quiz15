const express = require('express')
const app = express()
const port = 5000

app.use(express.json());

let cars = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2021, price: 25000, color: 'Black' },
    { id: 2, brand: 'BMW', model: 'M5', year: 2023, price: 105000, color: 'Blue' },
    { id: 3, brand: 'Honda', model: 'Civic', year: 2019, price: 18000, color: 'White' }
];

app.get('/api/cars', (req, res) => {
    res.json(cars);
})
app.get("/api/cars", (req, res) => {
    res.status(200).send("OK");
});

app.patch('/api/cars/:id', (req, res) => {
    const id = Number(req.params.id);

    const cars = cars.find(m => m.id === id);

    if (!cars) {
        return res.status(404).json({ message: "მანქანა ამ ID-ით ვერ მოიძებნა" });
    }

    const { brand, model, year,price,color } = req.body;

    if (brand) cars.brand = brand;
    if (model) cars.model = model;
    if (year) cars.year = year;
    if (price) cars.price = price;
    if (color) cars.color = color;


})
app.post('/api/cars', (req, res) => {

    const { brand, model, year,price,color } = req.body;

    if (!brand || !model || !year || !price || !color) {
        return res
            .status(400)
            .json({ message: "გთხოვთ, შეავსოთ ყველა ველი: brand, model, year,price,color " });
    }

    if (typeof year !== "number") {
        return res.status(400).json({ message: "year უნდა იყოს რიცხვი" });
    }

    const newCar = {
        id: cars.length + 1,
        brand,
        model,
        year,
        price,
        color
    };

    cars.push(newCar);

    res.status(201).json(newCar);

})

app.patch("/api/cars/:id", (req, res) => {

    const id = Number(req.params.id);

    const car = car.find(m => m.id === id);

    if (!car) {
        return res.status(404).json({ message: "car not found" });
    }

    const { brand, model, year,color,price } = req.body;

    if (brand) car.title = brand;
    if (model) car.director = model;
    if (year) car.year = year;
    if(color) car.color=color;
    if (price) car.price = price;

    res.status(200).json(cars);
});

app.delete("/api/cars/:id", (req, res) => {

    const id = Number(req.params.id);

    const carIndex = cars.findIndex(m => m.id === id);

    if (carIndex === -1) {
        return res.status(404).json({ message: "car not found" });
    }

    car.splice(carIndex, 1);

    res.status(200).json({ message:'მანქანა წარმატებით გაიყიდა (წაიშალა ბაზიდან)' });
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
