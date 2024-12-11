import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../databaseConfig";
import { ActivityAttributes } from "types/activityTypes";
import User from "./userModel";
import Member from "./memberModel";

interface ActivityCreationAttributes extends Optional<ActivityAttributes, 'activity_id' | 'created_at'> {}

class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> implements ActivityAttributes {
    public activity_id?: number;  
    public user_id!: number;          
    public member_id!: number;        
    public action_type?: string;     
    public description?: string;
    public created_at!: string;
}

Activity.init(
    {
      activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,    
      },
      action_type: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      tableName: 'activity_logs',
      timestamps: false,
    }
);

// define associations and relations
Activity.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Activity.belongsTo(Member, { foreignKey: 'member_id', as: 'member' }); 

export default Activity;