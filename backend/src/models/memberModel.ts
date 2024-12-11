import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../databaseConfig";
import { MemberAttributes } from "types/memberTypes";

interface MemberCreationAttributes extends Optional<MemberAttributes, 'member_id' | 'created_at' | 'updated_at'> {}

class Member extends Model<MemberAttributes, MemberCreationAttributes> implements MemberAttributes {
    public member_id?: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public date_of_birth?: string;
    public role!: number;
    public profile_picture!: string;
    public password!: string;
    public created_at!: string;
    public updated_at!: string;
    public created_by!: string;
}

Member.init(
  {
    member_id: {
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
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'members',
    timestamps: false,
  }
);

export default Member;