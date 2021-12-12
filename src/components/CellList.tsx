import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';
import './CellList.css';
import { useActions } from '../hooks/useActions';

interface Props {}

const CellList = (props: Props) => {
  const { fetchCells } = useActions();
  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </React.Fragment>
  ));
  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
