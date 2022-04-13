import User from "../models/user.js";
import sharp from "sharp"

export const uploadAvatar = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if(!user){
        return res.status(400).send('something wrong') 
    }else{
        const buffer = await sharp(req.file.buffer).resize({
            fit: 'contain',
            width: 250,
            height: 250
        }).png().toBuffer()
        user.avatar = buffer
        await user.save()
        res.status(200).send('upload avatar success')
    }
}
