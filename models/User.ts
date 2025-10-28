import mongoose, {Schema,model, models} from "mongoose";
import bcrypt from "bcryptjs"; 

export interface InterUser{
    email:string,
    password:string,
    _id?: mongoose.Types.ObjectId;
    createAt?: Date;
    updateAt?: Date;
}

const userSchema = new Schema<InterUser>(
    {
       email:{ type: String,required:true,unique:true},
       password:{type:String,required:true}
    },{
        timestamps:true
    }
)

/* Here we are just checking whren i password about to save in side the db before that password should be hash 
then it can save on database! simple 
*/
userSchema.pre('save', async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,18);
    }
    next();
})

const User = models?.User || model<InterUser>("User",userSchema);

export default User;