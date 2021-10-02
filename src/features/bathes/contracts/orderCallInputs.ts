import { IInput } from '~/src/app/models/validate';

export const defaultOrderCallInputs: IOrderCallInputs = {
  name: {
    type: 'name',
    value: '',
    require: true,
  },
  phone: {
    type: 'phoneWithMask',
    value: '',
    require: true,
  },
};

export interface IOrderCallInputs {
  name: IInput;
  phone: IInput;
  [key: string]: IInput;
}
