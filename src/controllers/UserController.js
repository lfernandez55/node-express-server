import { User } from '../models/UserModel'
import { Car } from '../models/CarModel'

export const testAPI = (req, res, next) => {
    let foo = {boo: "test"}
    res.send(JSON.stringify(foo))
}

// export const userAPI = async (req, res, next) => {
//     let found = await UserModel.find({name: req.params.username})
//     res.json(found)
// }



export const createUserAPI = (req, res, next) => {
    let user = new User()
    user.name = "Lucy"
    user.age = "34"

    let car = new Car()
    car.make = 'Prius'
    car.model = 'Pickup'
    car.save()
    user.cars.push(car)

    let car2 = new Car()
    car2.make = 'Fiat'
    car2.model = 'Compact'
    car2.save()
    user.cars.push(car2)

    user.save((err)=> {
        if(err){
            res.json({success: false, message: "User creation failed", err: err})
            res.end()
        }else{




            res.json({success: true, message: "User creation succeeded"})
            res.end()
        }
    })
}

export const eraseDB = async (req, res, next) => {
    try{
        await User.remove({})
        await Car.remove({})
        let msg = {message: "Collections erased"}
        res.status(200).json(msg);  
    } catch (err) {
        console.log("ERROR GENERATED:")
        console.log(err)
        let msg = {message: "Something went wrong when erasing DB...."}
        res.status(500).json(msg); 
    }

}

export const seedDB = async (req, res, next) => {
    try{
        let user = new User()
        user.name = "Lucy"
        user.age = "34"
    
        let car = new Car()
        car.make = 'Prius'
        car.model = 'Pickup'
        await car.save()
        user.cars.push(car)
    
        let car2 = new Car()
        car2.make = 'Fiat'
        car2.model = 'Compact'
        await car2.save()
        user.cars.push(car2)

        await user.save()

        let user2 = new User()
        user2.name = "Mick"
        user2.age = "66"
        await user2.save()

        let msg = {message: "DB seeded!!!"}
        res.status(200).json(msg);  
    } catch (err) {
        console.log("Error generated while seeding DB....")
        console.log(err)
        let msg = {message: "Something went wrong when seeding DB...."}
        res.status(500).json(msg); 
    }
}

export const allUsers = async (req, res, next) => {
    try{
        let allUsers = await User.find()
        res.json(allUsers)
    } catch (err) {
        console.log("ERROR GENERATED:")
        console.log(err)
    }

}

export const allUsersPopulate = async (req, res, next) => {
    try{
        let allUsers = await User.find().populate('cars')
        res.json(allUsers)
    } catch (err) {
        console.log("ERROR GENERATED:")
        console.log(err)
    }

}