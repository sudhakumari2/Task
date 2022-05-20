const db = require('../connection/database');
const Sequelize = require('sequelize');
const candidate = db.define("candidate_details",{
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:Sequelize.INTEGER
      },
    first_name:{
        type:Sequelize.STRING},
    last_name:{
        type:Sequelize.STRING},
    city:{
        type:Sequelize.STRING},
    company:{
        type:Sequelize.STRING}
})

module.exports = candidate