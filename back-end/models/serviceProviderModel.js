module.exports = (sequelize, DataTypes) => {
    const ServiceProviders = sequelize.define("ServiceProviders", {
        serviceProviderBIN:{
            type: DataTypes.STRING,
            allowNUll:false,
            //primaryKey: true,
        },

        serviceProviderName:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        serviceProviderEmail:{
            type: DataTypes.STRING,
            allowNUll:false
        },
        serviceProviderPassword:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        servicesOffered:{
            type: DataTypes.STRING,
            allowNUll:false
        },
        BankName:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        BankAccountNumber:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        phoneNumber:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        serviceProviderAuthorizationLetter: {
            type: DataTypes.BLOB,
            allowNull: false
        }


    })

       /* Services_id:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Services_name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Services_description:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Services_contact:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });*/
    return ServiceProviders;
};