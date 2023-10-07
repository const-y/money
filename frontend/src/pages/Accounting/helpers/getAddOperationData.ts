import { CreateOperationRequestParams } from '@/api/operations';
import assertIsDate from '@/helpers/assertIsDate';
import assertIsNumber from '@/helpers/assertIsNumber';
import { OperationFormValues } from '../components/OperationForm';

export default function getAddOperationData({
  accountId,
  formValues,
}: {
  accountId: number;
  formValues: OperationFormValues;
}): CreateOperationRequestParams {
  const { amount, description, date, categoryId, counterpartyId } = formValues;

  assertIsDate(date);
  assertIsNumber(categoryId);

  return {
    account: accountId,
    amount,
    date: date.toISOString().substring(0, 10),
    description,
    category: categoryId,
    counterparty: counterpartyId,
  };
}
