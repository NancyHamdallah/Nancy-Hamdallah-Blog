import { DataTypes, Model, Optional} from 'sequelize';
import User from './userModel'
import sequelize from '../config/database' ;

//Define an interface for Post attributes 
interface RoleAttributes {

	id: number ;
    type: string;
    
}

//Define an interface for Post Creation attributes (optional id)
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

//Define a class that extends the Sequelize Model Class
class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes{
    public id!: number;
    public type !: string;
 
    
}

//Initialize the User model
Role.init(
{
id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
type: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
},
{
tableName : 'roles',
sequelize,// passing the 'sequelize' instance is required
}


);


// Define association between Post and Comment models
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

export default Role;