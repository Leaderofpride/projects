const Sequelize = require("sequelize");
const sequelize = new Sequelize("karmadb", "root", "1234", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});
sequelize.sync().then(console.log("Synchronize")).catch((err) => {
    console.log(err);
});
module.exports = sequelize;
global.sequelize = sequelize;
//{ force: true }