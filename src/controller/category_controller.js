import {TypeCategory, Category}  from "../models/category.js";

export const createCategory = async (req, res) => {
    
    const {name , types, quantity} = req.body

    try {
        const category = await new Category({
            name,
            types,
            quantity
        }).save()
        res.send(category)
    } catch (error) {
        res.status(400).send(error.toString())
    }
}

export const getCategorys = async (req, res) => {
    try{
        const categorys = await Category.find()

        if(categorys){
            res.send(categorys)
        }
    }catch(e){
        res.status(400).send(e.toString())
    }
}

export const getCategoryById = async (req, res) =>{
    try {
        const {id} = req.params
        const category = await Category.findById(id).populate({path: 'types', select:['_id', 'name'] }).exec()
        if(!category){
            return res.status(400).send('category don\'t exist')
        }
        res.send(category)
    } catch (error) {
        res.status(400).send(error.toString())
    }
}

export const createTypeCategory = async (req, res) => {
    
    const {name} = req.body

    try {
        const typeCategory = await new TypeCategory({
            name
        }).save()
        res.send(typeCategory)
    } catch (error) {
        res.status(400).send(error.toString())
    }
}



export const getTypeCategorys = async (req, res) => {
    try{
        const typeCategorys = await TypeCategory.find()

        if(typeCategorys){
            res.send(typeCategorys)
        }
    }catch(e){
        res.status(400).send(e.toString())
    }
}

// export const 
