import Sequelize from "sequelize";

export const db = new Sequelize('dais','root','admin',{
    host:'localhost',
    dialect:'mysql',
    define: {
        timestamps: false
    }
});

export default db