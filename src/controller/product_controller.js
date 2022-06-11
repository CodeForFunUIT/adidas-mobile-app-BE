import Product from "../models/product.js"
import Image from "../models/image.js"
import Sharp from "sharp"
import { ProductType, UploadDir } from "../utils/enum.js"
import { Category } from "../models/category.js"
import User from "../models/user.js"

export const getAllProduct = async (req, res) =>{
    try {
        const products = await Product.find()
        .populate({path: 'category', select: ['_id', 'types', 'name']}).exec()
        if(!products){
            return res.status(400).send('no data')
        }
        res.send(products)        
    } catch (error) {
        res.send(error.toString())
    }
}

export const uploadProduct = async(req, res) => {
    const {price, name, introduction, category, tag} = req.body
    let images = []
    try{
        if(req.files){
            const list = images.concat(
                await Promise.all(
                    req.files.map(async (e) => {
                    const buffer = await Sharp(e.buffer).resize({
                        fit: 'contain',
                        width: 400,
                        height: 400
                    }).png().toBuffer()
                    const image = await new Image({ data: buffer }).save();
                  return `https://adidas-mobile-app.herokuapp.com/"${UploadDir.product}/${image._id}`;
                })
              )
            )
            images = [...list]
        }
        else{
            return res.status(400).send({msg: 'please upload image'})
        }
        
        const newProct = new Product({
            images,
            price,
            tag,
            name,
            introduction,
            category,
          });
        await newProct.save()
        return res.send({msg: 'upload image success'})

    }catch(e){
        res.status(400).send(e.toString())
    }
}

export const likeProduct = async (req, res) => {
    try {
        const {idProd, idUser} = req.params
        const product = await Product.findByIdAndUpdate(idProd
                    ,{$inc : {'favorites': 1},$set: {'isFav': true}}
                    ,{multi: true}).exec()
        if(!product){
            return res.status(400).send({message: "no product found", status: false })
        }

        const user = await User.findByIdAndUpdate(idUser, {$addToSet: {'listFav': idProd}}).exec()
        if(!user){
            return res.status(400).send({message: "no User found", status: aflse})
        }
        res.status(200).send({status: true, message: "like product success"})
    } catch (error) {
        res.send("error")
    }
}

export const dislikeProduct = async (req, res) => {
    try {
        const {idProd, idUser} = req.params

        const product = await Product.findByIdAndUpdate(idProd
                    ,{$inc : {'favorites': -1},$set: {'isFav': false}}
                    ).exec()
        if(!product){
            return res.status(400).send({message: "dislike product faile", status: false })
        }
        const user = await User.findByIdAndUpdate(idUser, {$pull: {'listFav': idProd}}).exec()
        if(!user){
            return res.status(400).send({message: "no User found", status: aflse})
        }
        res.status(200).send({status: true, message: "dislike product success"})
    } catch (error) {
        res.send(error.toString())
    }
}

export const addToBag = async (req, res) => {
    try {
        const {idProd, idUser} = req.params

        const user = await User.findByIdAndUpdate(idUser, {$addToSet: {'listBag': idProd}}).exec()
        if(!user){
            return res.status(400).send({message: "no User found", status: aflse})
        }
        res.status(200).send({status: true, message: "add product to bag success"})
    } catch (error) {
        res.send("error")
    }
}

export const removeFromBag = async (req, res) => {
    try {
        const {idProd, idUser} = req.params

        const user = await User.findByIdAndUpdate(idUser, {$pull: {'listBag': idProd}}).exec()
        if(!user){
            return res.status(400).send({message: "no User found", status: false})
        }
        res.status(200).send({status: true, message: "remove product success"})
    } catch (error) {
        res.send(error.toString())
    }
}


export const buyProduct = async (req, res) =>{
    try {
        const {id, size, color} = req.params
        const product = await Category.findOneAndUpdate({'_id': id, 'quantity.size': Number(size)}, {$inc: {[`quantity.$.${color.toString()}`]: -1}},{new: true}).clone()
        console.log(product)
        res.send(product)
    } catch (error) {
        res.status(400).send(error.toString())
    }
}

export const getProductByCategoryId = async (req, res) => {
    try {   
        const {id} = req.params
        // let product ;

        const product = await Product.find({category: id})

        // .populate({path: 'category', select: ['_id', 'types']}).exec()
        
        if(!product){
            return res.status(400).send('no data')
        }       
        res.send(product)   
    } catch (error) {
        res.status(400).send(error.toString())
    }
}

export const getSneakerProducts = async (req, res) => {
    try {
        const products = await Product.find({ type: ProductType.sneaker })
          .exec();
        if(products.length === 0){
            return res.send({
                status: false,
                message: "product is null",
            })
        }
        res.json({ data: products, message: "OK" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getShirtProducts = async (req, res) => {
    try {
        const products = await Product.find({ type: ProductType.shirt })
          .exec();
        if(products.length === 0){
            return res.send({
                status: false,
                message: "product is null",
            })
        }
        res.json({ data: products, message: "OK" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getShortProducts = async (req, res) => {
    try {
        const products = await Product.find({ type: ProductType.shorts })
          .exec();
        if(products.length === 0){
            return res.send({
                status: false,
                message: "product is null",
            })
        }
        res.json({ data: products, message: "OK" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTrouserProducts = async (req, res) => {
    try {
        const products = await Product.find({ type: ProductType.trousers })
          .exec();
        if(products.length === 0){
            return res.send({
                status: false,
                message: "product is null",
            })
        }
        res.json({ data: products, message: "OK" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
