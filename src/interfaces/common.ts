import { IGenericErrorMessage } from './error';
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errormessage: IGenericErrorMessage[];
};
