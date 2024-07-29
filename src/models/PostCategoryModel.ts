import { DataTypes, Model, Optional} from 'sequelize';
import Post from './postModel'
import Category from './categoryModel'
import sequelize from '../config/database' ;
//Define an interface for Post attributes 
interface PostCategoryAttributes {

	id: number ;
    postId: number;
    categoryId: number;
}

//Define an interface for Post Creation attributes (optional id)
interface PostCategoryCreationAttributes extends Optional<PostCategoryAttributes, 'id'> {}

//Define a class that extends the Sequelize Model Class
class PostCategory extends Model<PostCategoryAttributes, PostCategoryCreationAttributes> implements PostCategoryAttributes{
    public id!: number;
    public postId!: number;
    public categoryId!: number;
    
}

//Initialize the PostCategory model
PostCategory.init(
{
id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
postId : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
            
        },
categoryId : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
}

},
{
tableName : 'postCategory',
sequelize,// passing the 'sequelize' instance is required
}




);



export default PostCategory;