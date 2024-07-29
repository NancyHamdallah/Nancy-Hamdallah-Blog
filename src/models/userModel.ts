import { DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database' ;
//Define an interface for User attributes 
interface UserAttributes {

	id: number ;
name : string;
email : string;
password : string ;
}

//Define aninterface for User Creation attributes (optional id)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

//Define a class that extends the Sequelize Model Class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
public id!: number;
public name !: string;
public email !: string;
public password!: string ;
}

//Initialize the User model
User.init(
{
id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
email : {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
},
{
tableName : 'users',
sequelize,// passing the 'sequelize' instance is required
}




);

export default User;