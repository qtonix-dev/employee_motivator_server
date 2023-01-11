const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const employeeSchema = new Schema({
  isAdmin:{
    type:Boolean,
    default:false
  },
  is_reporting_manager:{
    type:Boolean,
    default:false
  },
  company:{
    type:String
  },
  is_same_address :{
    type:Boolean
  },
  picture:{
    type:String
  },
  name:{
    type:String
  },
  nick_name :{
    type:String
  },
  emp_number :{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  mobile:{
    type:String
  },
  mobile:{
    type:String
  },
  gender:{
    type:String
  },
  bloodgroup:{
    type:String
  },
  father_name:{
    type:String
  },
  martial_status:{
    type:String
  },
  marriage_date:{
    type:String
  },
  spouse_name:{
    type:String
  },
  nationality :{
    type:String
  },
  residential_status:{
    type:String
  },
  dob:{
    type:Date
  },
  place_of_birth:{
    type:String
  },
  country:{
    type:String
  },
  religion:{
    type:String
  },
  international_employee:{
    type:String
  },
  physically_challenged:{
    type:String
  },
  is_director:{
    type:String
  },
  is_director:{
    type:String
  },
  is_admin:{
    type:String
  },
  personal_email:{
    type:String
  },
  doj:{
    type:Date
  },
  confirmation_date:{
    type:String
  },
  emp_status:{
    type:String
  },
  probation_period:{
    type:String
  },
  notice_period :{
    type:String
  },
  previous_experience  :{
    type:String
  },
  department :{
    type:String
  },
  team :{
    type:String
  },
  designation :{
    type:String
  },
  location :{
    type:String
  },
  reporting_to :{
    type:String
  },
  present_add_name  :{
    type:String
  },
  permanent_add_name  :{
    type:String
  },
  present_add_address :{
    type:String
  },
  permanent_add_address :{
    type:String
  },
  present_add_city :{
    type:String
  },
  permanent_add_city :{
    type:String
  },
  present_add_state :{
    type:String
  },
  permanent_add_state :{
    type:String
  },
  present_add_country :{
    type:String
  },
  permanent_add_country :{
    type:String
  },
  present_add_pincode :{
    type:String
  },
  permanent_add_pincode :{
    type:String
  },
  present_add_phone1 :{
    type:String
  },
  permanent_add_phone1 :{
    type:String
  },
  present_add_Phone2 :{
    type:String
  },
  permanent_add_Phone2 :{
    type:String
  },
  present_add_ext :{
    type:String
  },
  permanent_add_ext :{
    type:String
  },
  present_add_fax:{
    type:String
  },
  permanent_add_fax:{
    type:String
  },
  present_add_mobile_no :{
    type:String
  },
  present_add_mobile_no :{
    type:String
  },
  present_add_email :{
    type:String
  },
  permanent_add_email :{
    type:String
  },
  emergency_name :{
    type:String
  },
  emergency_relationship:{
    type:String
  },
  emergency_address :{
    type:String
  },
  emergency_city :{
    type:String
  },
  emergency_state :{
    type:String
  },
  emergency_country :{
    type:String
  },
  emergency_pincode :{
    type:String
  },
  emergency_phone1 :{
    type:String
  },
  emergency_Phone2 :{
    type:String
  },
  emergency_ext :{
    type:String
  },
  emergency_fax :{
    type:String
  },
  emergency_mobile_no :{
    type:String
  },
  emergency_email  :{
    type:String
  },


  // // designation:{
  // //   type:String
  // // },
  // designation_id:{
  //   type:mongoose.Schema.Types.ObjectId,ref:'Designation'
  // },
  //
  // // department_id:{
  // //   type:String
  // // },
  // department_id:{
  //   type:mongoose.Schema.Types.ObjectId,ref:'Department'
  // },
  // reporting_to:{
  //   type:String
  // },
  // team:{
  // type:mongoose.Schema.Types.ObjectId,ref:'Team'
  // },
  //
  // is_team_leader :{
  //   type:Boolean
  // },

},{timestamps:true});

const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee;
