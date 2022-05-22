import Banner from "../models/banner.js";


export const uploadBanner = async (req, res) => {
  const body = req.body

  try {
    
    const newBanner = new Banner({
        ...body
    });
    await newBanner.save()
    return res.send(newBanner)
  } catch (error) {
      res.status(400).send(error.toString())
  }
}

export const getAllBanner = async (req, res) =>{
    try {
        const banners = await Banner.find()
        .populate({path: 'product'}).exec()
        if(!banners){
            return res.status(400).send('no data')
        }
        res.send(banners)        
    } catch (error) {
        res.send(error.toString())
    }
}

