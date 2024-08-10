import { DataTypes, Model, Optional} from 'sequelize';
import Post from './postModel'
import PostCategory from  './PostCategoryModel'
import sequelize from '../config/database' ;
//Define an interface for Post attributes 
interface CategoryAttributes {

	id: number ;
    categoryType : string;
}

//Define an interface for Category Creation attributes (optional id)
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

//Define a class that extends the Sequelize Model Class
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes{
    public id!: number;
    public categoryType !: string;
    
}

//Initialize the Category model
Category.init(
{
id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
categoryType : {
            type: DataTypes.STRING(128),
            allowNull: false,
            
        }


},
{
tableName : 'categories',
sequelize,// passing the 'sequelize' instance is required
}




);


// Define association between Post and Category models

Category.hasMany(PostCategory, { foreignKey: 'categoryId'} );
export default Category;