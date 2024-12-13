import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage:'./chama.db',
    // logging: false,
})

export default sequelize;