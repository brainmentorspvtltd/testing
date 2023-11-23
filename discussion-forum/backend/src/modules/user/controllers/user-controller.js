import { userService } from "../services/user-service.js";

export const login = async (request, response, next) => {
  const user = request.body;
  try {
    const userInfo = await userService.login(user);

    if (userInfo.user) {
      return response.status(200).json({ ...userInfo });
    }

    return response.status(403).json({ error: "incorrect password or mail" });
  } catch (err) {
    next(err);
  }
};
export const register = async (request, response, next) => {
  try {
    const user = request.body;
    const doc = await userService.register(user);
    response.status(200).json(doc);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getUserById = async (request, response, next) => {
  try {
    const id = request.decoded.id;
    const doc = await userService.getUserById(id);
    response.status(200).json(doc);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
