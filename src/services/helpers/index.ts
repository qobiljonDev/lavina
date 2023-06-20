import md5 from "md5";
import { Method } from "axios";
import storage from "services/storage";
import { IUser } from "type";

type ICreateSignReturn = {
  Key: string;
  Sign: string;
};

const calculateHeaders = (
  method: Method,
  path: string,
  body: object | string
): ICreateSignReturn | any => {
  const user = JSON.parse(storage.get("user") as string);

  let m = method.toUpperCase();

  if (!!user) {
    const { secret, key } = user as IUser;
    const signStr = `${m}${path}${body}${secret}`;

    return {
      Key: key.toString(),
      Sign: md5(signStr).toString(),
    };
  }
};

export default {
  calculateHeaders,
};
