import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';
import './CellListItem.css';

interface Props {
  cell: Cell;
}

const CellListItem = ({ cell }: Props) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <ActionBar id={cell.id} />
        <TextEditor cell={cell} />
      </>
    );
  }
  return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
