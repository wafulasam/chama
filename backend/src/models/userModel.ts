import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../databaseConfig";
import { UserAttributes } from "types/userTypes";

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id?: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public role!: number;
    public created_at!: string;
    public updated_at!: string;
    public created_by?: number;
}

User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
    }
);

export default User;