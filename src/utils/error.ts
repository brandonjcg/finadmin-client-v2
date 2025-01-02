export interface ICustomError extends Error {
  cause: {
    code: string;
  };
}

export const buildError = (error: ICustomError) => {
  return error.cause?.code || error.message;
};
