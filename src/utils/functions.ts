import { UserFulfilled } from "@/types/User";

export function validateEmail(email: string) {
  // eslint-disable-next-line
  let validate =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validate.test(email);
}

export const makeScrollOfPage = (isScroll: boolean) => {
  if (typeof document !== 'undefined')
    document.documentElement.style.overflowY = isScroll ? 'auto' : 'hidden';
};

export const deletePasswordKey = (obj: UserFulfilled) => {
  delete obj.password;
  return obj;
};
