module.exports=(sequelize,DataTypes)=>{
    const Agents = sequelize.define("Agents",{
        agentBIN:{
            type: DataTypes.STRING,
            allowNUll:false,
            primarykey: true,
        },

        agentName:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        agentEmail:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        agentPassword:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        servicesOffered:{
            type: DataTypes.STRING,
            allowNUll:false
        },


        phoneNumber:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        agentAuthorizationLetter: {
            type: DataTypes.BLOB,
            allowNull: false
        }


    })
    return Agents;
}