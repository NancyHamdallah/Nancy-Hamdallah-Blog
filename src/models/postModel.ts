import { DataTypes, Model, Optional} from 'sequelize';
import User from './userModel'
import sequelize from '../config/database' ;
import Category from './categoryModel';
import PostCategory from './PostCategoryModel';
//Define an interface for Post attributes 
interface PostAttributes {

	id: number ;
    title : string;
    body : string;
    userId: number;
}

//Define an interface for Post Creation attributes (optional id)
interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

//Define a class that extends the Sequelize Model Class
class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes{
    public id!: number;
    public title !: string;
    public body !: string;
    public userId!: number;
    
}

//Initialize the User model
Post.init(
{
id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
body : {
            type: DataTypes.STRING(128),
            allowNull: false,
            
        },
userId : {
            type: DataTypes.INTEGER.UNSIGNED
            
}

},
{
tableName : 'posts',
sequelize,// passing the 'sequelize' instance is required
}




);

// Define association between User and Post models
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export default Post;