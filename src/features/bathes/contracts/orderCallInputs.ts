import { IInput } from '~/src/app/models/validate';

export const defaultOrderCallInputs: OrderCallInputs = {
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

export interface OrderCallInputs {
  name: IInput;
  phone: IInput;
  [key: string]: IInput;
}
