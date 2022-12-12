const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const employeeSchema = new Schema({
  isAdmin:{
    type:Boolean,
    default:false
  },
  name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  phone:{
    type:String,
    default:''
  },
  employee_id:{
    type:String
  },
  dob:{
    type:String
  },
  marriage_anniversary_date :{
    type:String
  },
  hobby:{
    type:String
  },
  // designation:{
  //   type:String
  // },
  designation_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'Designation'
  },
  joining_date:{
    type:String
  },
  employee_type:{
    type:String
  },
  // department_id:{
  //   type:String
  // },
  department_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'Department'
  },
  reporting_to:{
    type:String
  },
  team:{
  type:mongoose.Schema.Types.ObjectId,ref:'Team'
  },
  gender:{
    type:String
  },
  location:{
    type:String
  },
  is_team_leader :{
    type:Boolean
  },

},{timestamps:true});

const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee;
