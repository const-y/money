import { OperationFormValues } from '../../components/OperationForm';
import getAddOperationData from '../getAddOperationData';

describe('getAddOperationData()', () => {
  it('should return the correct CreateOperationRequestParams object', () => {
    const accountId = 1;

    const formValues: OperationFormValues = {
      amount: 100,
      description: 'Test Operation',
      date: new Date('2023-10-07'),
      categoryId: 5,
      counterpartyId: 10,
      isExpense: true,
    };

    const result = getAddOperationData({ accountId, formValues });

    const expected = {
      account: accountId,
      amount: formValues.amount,
      date: '2023-10-07',
      description: formValues.description,
      category: formValues.categoryId,
      counterparty: formValues.counterpartyId,
    };

    expect(result).toEqual(expected);
  });

  it('should ignore local time zone', () => {
    const accountId = 1;

    const formValues: OperationFormValues = {
      amount: 100,
      description: 'Test Operation',
      date: new Date('2023-10-07T00:00:00+04:00'),
      categoryId: 5,
      counterpartyId: 10,
      isExpense: true,
    };

    const result = getAddOperationData({ accountId, formValues });

    const expected = {
      account: accountId,
      amount: formValues.amount,
      date: '2023-10-07',
      description: formValues.description,
      category: formValues.categoryId,
      counterparty: formValues.counterpartyId,
    };

    expect(result).toEqual(expected);
  });
});
