import userModel from "../models/userModel.ts";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface LoginParams {
    email: string;
    password: string;
}


export const register = async ({ firstName, lastName, email, password }: RegisterParams) => {
    const finduser = await userModel.findOne({ email });

    if (finduser) {
        return { data: "User already exists!", statusCode: 400 };
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    return { data: genrateJWT({email,firstName,lastName}), statusCode: 201 };
}


export const login = async ({ email, password }: LoginParams) => {
    const finduser = await userModel.findOne({ email });
    if (!finduser) {
        return { data: "Invalid email or password!", statusCode: 400 };
    }
    const passwordMatch = bcrypt.compareSync(password, finduser.password);
    if (!passwordMatch) {
        return { data: "Invalid email or password!", statusCode: 400 };
    }
    return { data: genrateJWT({email,firstName: finduser.firstName,lastName: finduser.lastName}), statusCode: 200 };
}


const genrateJWT = (data: any) => {
    return JWT.sign(data, "qIGjDq6QUlk0PjeYDono6O7cJT28ZY9jiJBkAWOXXgI0p0wDguudFRTlkhInqDLS");
}