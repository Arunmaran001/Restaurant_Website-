

const Models1 = require('../Models/Models1');
const multer = require('multer');
const path = require('path');


exports.create = async (req, res, next) => {
    try {
        const { name, price, quantity } = req.body;

        if (!name || !price || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const FoodDoc = new Models1({ name, price, quantity });
        await FoodDoc.save();
        return res.status(201).json({ message: "Created Successfully", data: FoodDoc });
    } catch (err) {
        return res.status(400).json({ error: 'Something went wrong', message: err.message });
    }
};


exports.getall = async (req, res, next) => {
    try {
        const FoodDoc = await Models1.find({}, { _id: 0 });
        return res.status(200).json({ data: FoodDoc });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedRecord = await Models1.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({ message: "Data not found" });
        }

        return res.status(200).json({ message: "Record deleted successfully", data: deletedRecord });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};


exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;

        const updatedObject = {};

        if (name) updatedObject.name = name;
        if (price) updatedObject.price = price;
        if (quantity) updatedObject.quantity = quantity;

        const updatedRecord = await Models1.findByIdAndUpdate(id, updatedObject, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.status(200).json({ message: "Record Updated Successfully", data: updatedRecord });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


exports.getbyid = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await Models1.findById(id);

        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }

        return res.status(200).json({ data });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.imageupload = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../Data/Image');
        const uploadStorage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalName = file.originalname;
                const fileExtension = path.extname(originalName);
                const uniqueSuffix = Date.now();
                const newFileName = path.basename(originalName, fileExtension) + '_' + uniqueSuffix + fileExtension;
                const uploadedFileName = '/Data/Image/' + newFileName;

                cb(null, newFileName);
            }
        });

        const upload = multer({ storage: uploadStorage }).single('image');

        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({ command: "Error Uploading file", error: err });
            }
            const uploadedFileName = '/Data/Image/' + req.file.filename;
            res.status(200).json({ ImageUploaded: uploadedFileName });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
