import { DataTypes, Model, Optional} from 'sequelize';
import User from './userModel'
import Post from './postModel'
import sequelize from '../config/database' ;
//Define an interface for Post attributes 
interface CommentAttributes {

	id: number ;
    body : string;
    userId: number;
    postId: number
}

//Define an interface for Post Creation attributes (optional id)
interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

//Define a class that extends the Sequelize Model Class
class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes{
    public id!: number;
    public body !: string;
    public userId!: number;
    public postId!: number;
    
}

//Initialize the Comment model
Comment.init(
{
id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
body : {
            type: DataTypes.STRING(128),
            allowNull: false,
            
        },
userId : {
            type: DataTypes.INTEGER.UNSIGNED
},
postId : {
            type: DataTypes.INTEGER.UNSIGNED
}

},
{
tableName : 'comments',
sequelize,// passing the 'sequelize' instance is required
}




);

// Define association between User and Comment models
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Define association between Post and Comment models
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export default Comment;