import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../db/connection";
import User from "./User";

class Tasks extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public userId!: number;

  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Tasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "tasks",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

Tasks.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Tasks, { foreignKey: "userId" });

export default Tasks;
