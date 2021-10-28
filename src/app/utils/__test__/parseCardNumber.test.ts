import { parseNumberCard } from '../common';

describe('compare', () => {
  const values =
    'Клиент: Iakimovaa Daria Andreevna Номер карты: 5131 7842 5454 1721 Скидка: 10%';

  it('get number 5131 7842 5454 1721', () => {
    const parsedNumber = parseNumberCard(values);
    expect(parsedNumber).toBe('5131 7842 5454 1721');
  });
});
