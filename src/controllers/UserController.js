import { User } from '../models/UserModel'
import { Car } from '../models/CarModel'
import { Org } from '../models/OrgModel'
import { Person } from '../models/PersonModel'

export const testAPI = (req, res, next) => {
    let foo = {boo: "test"}
    res.send(JSON.stringify(foo))
}

export const eraseDB = async (req, res, next) => {
    try{
        await User.remove({})
        await Car.remove({})
        await Org.remove({})
        await Person.remove({})
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

        let org = new Org()
        org.name = "WSU"
        await org.save()

        let org1 = new Org()
        org1.name = "College of Science"
        org1.parent = org
        await org1.save()

        let org2 = new Org()
        org2.name = "College of Health Professions"
        org2.parent = org
        await org2.save()

        let org3 = new Org()
        org3.name = "Nursing"
        org3.parent = org2
        await org3.save()
        org2.children.push(org3)
        await org2.save()

        org.children.push(org1)
        org.children.push(org2)
        await org.save()

        let person1 = new Person()
        person1.name = "Allan"

        let person2 = new Person()
        person2.name = "Bob"

        let person3 = new Person()
        person3.name = "Charlie"

        let person4 = new Person()
        person4.name = "Dan"
        person4.save()

        person3.friends.push(person4)
        person3.save();
        person2.friends.push(person3)
        person2.save()
        person1.friends.push(person2)
        person1.save()

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

//create (see https://stackoverflow.com/questions/46457071/using-mongoose-promises-with-async-await) )
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

/* Alternate way to create user:

export const createUser = (req, res, next) => {
    let user = new User()
    user.name = "OrphanAnnie"
    user.age = "10"
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

//find
export const getUser = async (req, res, next) => {
    try{
        let found = await User.find({name: "OrphanAnnie"})
        console.log(found)
        res.status(200).json(found);  
    } catch (err) {
        console.log("Error generated while creating user....")
        console.log(err)
        let msg = {message: "Something went wrong when getting user...."}
        res.status(500).json(msg); 
    }
}

// Alternate find
/*
export const getUser = (req, res, next) => {
    User.find({ name: "OrphanAnnie" })
        .then(function (user) {
            return res.json(user);
        })
        .catch(function (err) {
            return res.json(err);
        });
}
*/

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
export const deleteUser = async (req, res, next) => {
    try{
        await User.deleteOne({name: "OrphanAnnie"})
        let msg = {message: "User deleted...."}
        res.status(200).json(msg);  
    } catch (err) {
        console.log("Error generated while creating user....")
        console.log(err)
        let msg = {message: "Something went wrong when getting user...."}
        res.status(500).json(msg); 
    }
}

export const getOrgs = async (req, res, next) => {
    try{
        //let allOrgs = await Org.findOne({name: "WSU"}).populate('children')
        let allOrgs = await Org.findOne({name: 'WSU'}).populate({path: 'children', populate: { path: 'children', populate: { path: 'children' } }});
        console.log('debugxxxxxxxxxxxxxxxx', allOrgs)
        res.json(allOrgs)
    } catch (err) {
        console.log("ERROR GENERATED:")
        console.log(err)
    }

}

export const getPersons = async (req, res, next) => {
    try{
        let allPersons = await Person.findOne({ name: 'Allan' }).populate({path: 'friends', populate: { path: 'friends', populate: { path: 'friends' } }
        });
        console.log('debugAllPersons', allPersons)
        res.json(allPersons)
    } catch (err) {
        console.log("ERROR GENERATED:")
        console.log(err)
    }

}




/*

export const userAPI = async (req, res, next) => {
    let found = await UserModel.find({name: req.params.username})
    res.json(found)
}



*/