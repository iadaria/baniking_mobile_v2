import { phoneFormat } from '../common';

describe('format phone +79999999999 -> +7(999)999-99-99', () => {
  it('formate from  ', () => {
    const formated = phoneFormat('+79999999999');
    expect(formated).toBe('+7(999)999-99-99');
  });
});
