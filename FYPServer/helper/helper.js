const mongoose = require('mongoose')
const multer = require('multer')





module.exports = {
    //up load to resize the picture
    upload: multer({
        limits: {
            fileSize: 4 * 1024 * 1024,
        }
    }),
    // assignment new Name for picture
    UploadToGetNewImageName: () => {

    },

    isUserEmailExist: async (email) => {
        return await User.findOne({ email: email }).exec()
    },
    isUserExist: async (id) => {
        return await User.findOne({ _id: id }).exec()
    },
    sendErrorResponse: (msg, err, res, ...moreObjects) => {
        let resp = { status: "fail", message: msg, err: err }

        // Allow variable number of error objects
        for (let i = 0; i < moreObjects.length; i++) {
            let target = moreObjects[i]
            if (target == undefined) target = null
            resp["object" + (i + 1)] = target
        }

        res.json(resp).status(500)
    },
}