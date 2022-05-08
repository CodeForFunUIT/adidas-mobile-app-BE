import Product from "../models/product.js"
import Image from "../models/image.js"
import Sharp from "sharp"
import { ProductType, UploadDir } from "../utils/enum.js"

export const getAllProduct = async (req, res) =>{
    Product.find({},(error, data) =>{
        if(!error){
            res.send(data)
        }else{
            console.log(error)
        }
    })
}

export const uploadProduct = async(req, res) => {
    const {price, type, name, introduction} = req.body
    try{
        if(req.file){
            const buffer = await Sharp(req.file.buffer).resize({
                fit: 'contain',
                width: 400,
                height: 400
            }).png().toBuffer()
            const image = await new Image({ data: buffer }).save();
            const newProct = new Product({
                image: `${UploadDir.product}/${image._id}`,
                price,
                type,
                name,
                introduction
              });
            await newProct.save()
            res.status(200).send('upload product success')
        }else{
            res.status(400).send({msg: 'please upload image'})
        }
    }catch(e){
        res.status(400).send(e)
    }
}

export const likeProduct = async (req, res) => {
    try {
        const {idProd, idUser} = req.params
        const product = await Product.findByIdAndUpdate(idProd
                    ,{$inc : {'favorites': 1},$addToSet: {'likedBy': idUser}}
                    ,{multi: true}).exec()
        if(!product){
            return res.status(400).send({message: "no product found", status: false })
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
                    ,{$inc : {'favorites': -1},$pull: {'likedBy': idUser}}
                    ).exec()
        if(!product){
            return res.status(400).send({message: "dislike product faile", status: false })
        }
        res.status(200).send({status: true, message: "dislike product success"})
    } catch (error) {
        res.send(error)
    }
}

export const getProductByType = async (req, res) => {

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
