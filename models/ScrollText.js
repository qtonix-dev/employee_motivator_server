const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const teamSchema = new Schema({
  name:{
    type:String
  },
  order:{
    type:Number
  },
  status:{
    type:Boolean,
    default:true
  }
},{timestamps:true});

const ScrollText = mongoose.model('ScrollText',teamSchema);
module.exports = ScrollText;
