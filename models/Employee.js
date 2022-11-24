const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const employeeSchema = new Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  },
  employee_id:{
    type:String
  },
  dob:{
    type:String
  },
  Marriage_anniversary_date:{
    type:String
  },
  hobby:{
    type:String
  },
  designation:{
    type:String
  },
  Joiningdate:{
    type:String
  },
  employee_type:{
    type:String
  },
  department_id:{
    type:String
  },
  reporting_to:{
    type:String
  },
  team:{
    type:String
  },
  is_team_leader :{
    type:Boolean
  },

},{timestamps:true});

const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee;
