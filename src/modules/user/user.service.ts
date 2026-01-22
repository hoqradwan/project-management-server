import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import { comparePassword, generateInviteToken, hashPassword } from "./user.utils";
import { Invite } from "../invite/invite.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { UserRole } from "../../enums/user";
export const inviteUserInToDB = async (email: string, role: string) => {

    const token = generateInviteToken()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const createdInvite = await Invite.create({ email, role, token, expiresAt })
    return createdInvite.token;
}
export const registerViaInviteIntoDB = async (registerData: any) => {
    const { token, name, password } = registerData;
    const invite = await Invite.findOne({ token, acceptedAt: null })
    if (!invite || invite.expiresAt as any < new Date()) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid or expired invite token')
    }

    const hashed = await hashPassword(password)

    const user = await User.create({
        name,
        email: invite.email,
        password: hashed,
        role: invite.role,
        invitedAt: invite.createdAt,
    })

    invite.acceptedAt = new Date()
    await invite.save()
    return user;

}
export const loginUserToDB = async (userData: IUser) => {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    if(user.status === 'INACTIVE'){
        throw new Error("Cannot login. User is inactive");
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role, invitedAt: user.invitedAt }, JWT_SECRET_KEY as string, {
        expiresIn: "7d",
    });
    return { user, token };
}

export const getPRofileInfoFromDB = async (userData: IUser) => {
    const { id } = userData;
    const user = await User.findById(id).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}


export const getAllUsersFromDB = async () => {
    const users = await User.find().select("-password");
    return users;
}
export const changeUserRoleIntoDB = async (id: string, role: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    if(user.role === role){
        throw new Error("User already has this role");
    }
    if(user.role === 'ADMIN'){
        throw new Error("Cannot change role of ADMIN user");
    }
    if(role !== UserRole.MANAGER && role !== UserRole.STAFF){
        throw new Error("Invalid role");
    }
    user.role = role as any;
    await user.save();
    return user;
}
export const changeUserStatusIntoDB = async (id: string, status: string) => {
    const user = await User.findById(id);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,"User not found");
    }
    if(user.status === status){
        throw new AppError(httpStatus.BAD_REQUEST,"User already has this status");
    }
    if(status !== 'ACTIVE' && status !== 'INACTIVE'){
        throw new AppError(httpStatus.BAD_REQUEST,"Invalid status");
    }
    user.status = status as any;
    await user.save();
    return user;
}