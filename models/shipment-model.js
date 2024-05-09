import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    shipmentType: {
        type: String,
        required: true
    },
    shipmentWeightVolume: {
        type: String,
        required: true
    },
    pickupDateTime: {
        type: Date,
        required: true
    },
    deliveryDateTime: {
        type: Date,
        required: true
    },
    addDetails:{
        type: String,
    }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);    
export default Shipment;