/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const login = async (input: { username: string; password: string }) => {
  try {
    const method = 'POST';
    const url = '/login';

    const response = await axios({
      method,
      url,
      data: {
        username: input.username,
        password: input.password,
      },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err?.response.data.message || 'Failed to login');
  }
};
