const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const teamSchema = new Schema({
  name:{
    type:String
  },
  team_head:{
    type:mongoose.Schema.Types.ObjectId,ref:'Employee'
  },
  department_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'Department'
  },
  team_members:[{type:mongoose.Schema.Types.ObjectId,ref:'Employee'}],
  color:{
    type:String
  },
},{timestamps:true});

const Team = mongoose.model('Team',teamSchema);
module.exports = Team;
