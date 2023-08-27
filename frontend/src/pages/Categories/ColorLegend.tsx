import { FC } from 'react';
import { Icon, Label } from 'semantic-ui-react';

const ColorLegend: FC = () => {
  return (
    <div>
      <Label color="green">
        <Icon name="circle" />
        Доход
      </Label>
      <Label color="red">
        <Icon name="circle" />
        Расход
      </Label>
    </div>
  );
};

export default ColorLegend;
