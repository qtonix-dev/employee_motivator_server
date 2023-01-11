const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const teamSchema = new Schema({
  speed:{
    type:Number,
    default:5
  },
},{timestamps:true});

const ScrollTextSpeed = mongoose.model('ScrollTextSpeed',teamSchema);
module.exports = ScrollTextSpeed;
