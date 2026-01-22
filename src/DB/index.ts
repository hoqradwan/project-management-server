import { User } from "../modules/user/user.model";
import { hashPassword } from "../modules/user/user.utils";


const admin = {
  name: "MD Admin",
  email: "admin@gmail.com",
  password: "123456",
  role: "ADMIN",
};

export const seedAdmin = async () => {
  const isAdminExists = await User.findOne({ email: admin.email });

  if (!isAdminExists) {
    const hashedPassword = await hashPassword(admin.password);
    const adminWithHashedPassword = { ...admin, password: hashedPassword };

    // console.log("Super Admin created");
    await User.create(adminWithHashedPassword);
  }
};

export default seedAdmin;
