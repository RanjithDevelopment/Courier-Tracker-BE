const packageDetails = require('../Models/courierModel.js');
const { ObjectId } = require('mongodb');
module.exports.addPackage = async (req, res) => {
    try {
      
        const package = await new packageDetails({
            packageName: req.body.packageName,
            image: req.body.image,
            sender: req.body.sender,
            reciver: req.body.reciver,
            shipmentDetails: req.body.shipmentDetails,
            tracking: [{
                location: req.body.location,
                status: req.body.status,

            }],
        })
        await package.save();
        res.status(200).send("Package details inserted successfully")

    } catch (error) {
        res.status(400).send("Not able to add the new package details", error)
    }
}
module.exports.getPackages = async (req, res) => {
    try {

        const allPackages = await packageDetails.find({});
        res.status(200).send(allPackages);


    } catch (error) {
        res.status(400).send("Not able to Fecth the package details", error)
    }
}
module.exports.updatePackage = async (req, res) => {
    try {
        const newTrackingData = {
            location: req.body.location,
            status: req.body.status,
        };

        const updation = await packageDetails.findById(req.params.id);

        if (!updation) {
            return res.status(404).send('Package not found');
        }

        updation.packageName = req.body.packageName;
        updation.sender = req.body.sender;
        updation.reciver = req.body.reciver;
        updation.shipmentDetails = req.body.shipmentDetails;

        updation.tracking.push(newTrackingData);
        await updation.save();

        res.status(200).send('Package tracking data updated successfully');
    } catch (error) {
        console.error('Error updating package data:', error);
        res.status(400).send('Package data not updated');
    }
};
module.exports.DeletePackage = async(req,res)=>{
    try {
        const isValid = ObjectId.isValid(req.params.id);
       
     if(isValid){
        const remove = await packageDetails.deleteOne({ _id: new ObjectId(req.params.id) });
     if(remove){
        return res.status(200).json({ remove });
     }
    }
     res.status(500).send({msg:"can't able to delete the Package data"})
    } catch (error) {
        console.error('Error deleting package data:', error);
        res.status(400).send('Package data not deleted');
    }
}


