import routes from '@/constants/routes';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

interface ExpensesByCurrencyDetailsBreadcrumbProps {
  header: string;
}

const ExpensesByCurrencyDetailsBreadcrumb: FC<
  ExpensesByCurrencyDetailsBreadcrumbProps
> = ({ header }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/${routes.EXPENSES_BY_CURRENCIES_REPORT}`);
  };

  return (
    <Breadcrumb>
      <Breadcrumb.Section link onClick={handleBack}>
        Расходы по валютам
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section active>{header}</Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default ExpensesByCurrencyDetailsBreadcrumb;
