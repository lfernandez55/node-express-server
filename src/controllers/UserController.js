import { User } from '../models/UserModel'
import { Car } from '../models/CarModel'

export const testAPI = (req, res, next) => {
    let foo = {boo: "test"}
    res.send(JSON.stringify(foo))
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

// this approach modeled after:  
// https://stackoverflow.com/questions/52832010/mongoose-await-save
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

        let saveUser = await user.save()
        console.log(saveUser)

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

// SOME CRUD METHODS

//create
export const createUser = async (req, res, next) => {
    try{
        let user = new User()
        user.name = "OrphanAnnie"
        user.age = "10"

        let saveUser = await user.save()
        console.log(saveUser)

        let msg = {message: "User created!!!"}
        res.status(200).json(msg);  
    } catch (err) {
        console.log("Error generated while creating user....")
        console.log(err)
        let msg = {message: "Something went wrong when creating user...."}
        res.status(500).json(msg); 
    }
}

//find
export const getUser = async (req, res, next) => {
    try{
        let found = await User.find({name: "OrphanAnnie"})
        console.log(found)

        let msg = found
        res.status(200).json(msg);  
    } catch (err) {
        console.log("Error generated while creating user....")
        console.log(err)
        let msg = {message: "Something went wrong when getting user...."}
        res.status(500).json(msg); 
    }
}

// uddate
export const updateUser = async (req, res, next) => {
    try{
        let user = await User.findOne({name: "OrphanAnnie"});
        user.age = 6;
        user.save();

        res.status(200).json(user);  
    } catch (err) {
        console.log("Error generated while creating user....")
        console.log(err)
        let msg = {message: "Something went wrong when getting user...."}
        res.status(500).json(msg); 
    }
}

//alternative way to update with updateOne
//update
// export const updateUser = async (req, res, next) => {
//     try{
//         let user = await User.updateOne({name: "OrphanAnnie"}, {age: 5})
//         res.status(200).json(user);  
//     } catch (err) {
//         console.log("Error generated while creating user....")
//         console.log(err)
//         let msg = {message: "Something went wrong when getting user...."}
//         res.status(500).json(msg); 
//     }
// }

//add car to user
export const updateUserCar = async (req, res, next) => {
    try{
        let user = await User.findOne({name: "OrphanAnnie"});

        let car = await Car.findOne({make: 'Prius'})

        user.cars.push(car)
        user.save();

        res.status(200).json(user);  
    } catch (err) {
        console.log("Error generated while creating user....")
        console.log(err)
        let msg = {message: "Something went wrong when getting user...."}
        res.status(500).json(msg); 
    }
}

//delete user




/*

export const userAPI = async (req, res, next) => {
    let found = await UserModel.find({name: req.params.username})
    res.json(found)
}


export const createUserAPI = (req, res, next) => {
    let user = new User()
    user.name = "Lucy"
    user.age = "34"
    // the below approoach uses the callback approach detailed here:
    // https://stackoverflow.com/questions/41896865/proper-error-handling-in-mongoose-query-exec
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
*/