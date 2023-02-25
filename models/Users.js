module.exports = (sequelize,DataTypes)=>{
const Users = sequelize.define("Users",{
First_Name:{
    type: DataTypes.STRING,
    allowNull:false
},
Last_Name:{
    type: DataTypes.STRING,
    allowNull:false
},
Gender:{
    type: DataTypes.STRING,
    allowNull:false
},
Number:{
    type: DataTypes.STRING,
    allowNull:false
},
username:{
    type: DataTypes.STRING,
    allowNull:false
},
password:{
    type: DataTypes.STRING,
    allowNull:false
},
address:{
    type: DataTypes.STRING,
    allowNull:false
}

});

return Users
}