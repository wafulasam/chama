import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../databaseConfig";
import { RoleAttributes } from "types/roleTypes";

interface RoleCreationAttributes extends Optional<RoleAttributes, 'role_id'  | 'created_at' | 'updated_at'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public role_id?: number;
    public name!: string;
    public actions?: string[];
    public description?: string;  
    public created_at!: string;  
    public updated_at!: string;
}

Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actions: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
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
    },
    {
      sequelize,
      tableName: 'roles',
      timestamps: false,
    }
);

export default Role;