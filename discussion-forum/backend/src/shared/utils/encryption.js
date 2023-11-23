import bcrypt from 'bcrypt';
const SALT = 10;
export const passwordHashing= (plainPassword)=> bcrypt.hashSync(plainPassword, SALT);

export const compareHash = (plainPassword, hashPassword)=> bcrypt.compareSync(plainPassword, hashPassword);
