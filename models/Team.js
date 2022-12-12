const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const teamSchema = new Schema({
  name:{
    type:String
  },
  department_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'Department'
  },

  // employees_ids:[{type:mongoose.Schema.Types.ObjectId,ref:'Employee'}],

  color:{
    type:String
  },
},{timestamps:true});

const Team = mongoose.model('Team',teamSchema);
module.exports = Team;
