module.exports = (sequelize, DataTypes) => {
    const payment = sequelize.define("payment", {
        paymentID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payerID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payeeID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        receiptNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return payment;
};