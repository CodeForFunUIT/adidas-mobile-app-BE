import Product from "../models/product.js"
import Image from "../models/image.js"
import Config from "../utils/utils.js"
import sharp from "sharp"

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
    const {price, type} = req.body
    try{
        if(req.file){
            const buffer = await sharp(req.file.buffer).resize({
                fit: 'contain',
                width: 400,
                height: 400
            }).png().toBuffer()
            const image = await new Image({ data: buffer }).save();
            const newProct = new Product({
                image: `${Config.Instance.UploadImageDir}/${image._id}`,
                price,
                type
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