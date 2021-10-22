import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import dummy from '@/utils/dummyData.json';
import {LoginInput, UserFulfilled } from '@/types/User';
import {deletePasswordKey, validateEmail } from './functions';

const initialUser: UserFulfilled = {
  access: '',
  accessibility: '',
  email: '',
  full_name: '',
  id: 0,
  message: '',
  refresh: '',
  username: '',
};

//clone deep without lodash
let user: UserFulfilled = JSON.parse(JSON.stringify(initialUser));

//preventing Race Condition
let isAlreadyFetchingAccessToken = false;
let counter = 0;

const baseURL = 'https://api.datamuse.com';

let fakeAxios = axios.create({ baseURL });
let mock = new MockAdapter(fakeAxios);

let defaultApi = axios.create({ baseURL });

fakeAxios.interceptors.request.use((config) => {
  if (typeof localStorage !== 'undefined')
    user = JSON.parse(<string>localStorage.getItem('user'));

  if (
    user === null ||
    user.access === null ||
    user.access === '' ||
    Object.keys(user).length === 0
  )
    return config;
  else if (config.url !== `${baseURL}/users/token/refresh/` && config.headers) {
    config.headers.Authorization = `Bearer ${user.access}`;
    return config;
  }

  return config;
});

fakeAxios.interceptors.response.use(
  function (response) {
    counter = 0;
    return response;
  },
  function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (
      status === 401 &&
      counter <= 5 &&
      !config.url.includes(`${baseURL}/users/token/`)
    ) {
      counter++;
      if (!isAlreadyFetchingAccessToken && user?.refresh) {
        isAlreadyFetchingAccessToken = true;
        users_token_refresh_create(user.refresh).then((data: any) => {
          isAlreadyFetchingAccessToken = false;

          if (typeof data.access !== 'undefined') {
            user = {
              accessibility: '',
              email: '',
              full_name: '',
              id: 0,
              message: '',
              username: '',
              access: data.access,
              refresh: data.refresh,
            };
            localStorage.setItem(
              'user',
              JSON.stringify({
                access: data.access,
                refresh: data.refresh,
              }),
            );
          } else {
            user = JSON.parse(JSON.stringify(initialUser));
            localStorage.setItem('user', JSON.stringify({}));
            window.location.assign('/');
          }
        });
      }

      return new Promise((resolve) => {
        originalRequest.headers['Authorization'] = 'Bearer ' + user.access;
        resolve(fakeAxios(originalRequest));
      });
    } else return Promise.reject(error);
  },
);


export function users_token_create({ usernameOrEmail, password }: LoginInput) {
  const createLoginData = () =>
    validateEmail(usernameOrEmail)
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

  const { users } = dummy;

  const validatedUser = () =>
    users.data.find(
      (user) =>
        user.username.toLowerCase() === usernameOrEmail ||
        user.email.toLowerCase() === usernameOrEmail,
    );

  const isPasswordFits = () => validatedUser()?.password === password;

  //clone deep without lodash
  const resultData = JSON.parse(JSON.stringify(validatedUser()));

  if (resultData?.password) deletePasswordKey(resultData);

  mock
    .onPost('/users/token/')
    .reply(
      validatedUser() && isPasswordFits() ? 200 : 401,
      validatedUser() && isPasswordFits() ? resultData : users.error,
    );

  return fakeAxios({
    method: 'post',
    url: `${baseURL}/users/token/`,
    data: createLoginData(),
  })
    .then((res) => res)
    .catch((err) => (typeof err.response !== 'undefined' ? err.response : err));
}

export function users_token_refresh_create(refreshToken: string) {
  const { users, refresh } = dummy;

  const validatedAccessToken = () =>
    users.data.find(
      (user: { refresh: string }) => user.refresh === refreshToken,
    );

  mock
    .onPost('/users/token/')
    .reply(
      validatedAccessToken() ? 200 : 401,
      validatedAccessToken() ? refresh.data : refresh.error,
    );

  return fakeAxios({
    method: 'post',
    url: `${baseURL}/users/token/refresh/`,
    data: {
      refresh: refresh,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response !== undefined ? err.response.status : err;
    });
}

export function searchAPI(letters: string) {
  return defaultApi({
    method: 'get',
    url: `${baseURL}/sug?s=${letters}`,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response !== undefined ? err.response.status : err;
    });
}

