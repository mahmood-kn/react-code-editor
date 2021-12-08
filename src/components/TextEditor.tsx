import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { Cell } from '../state';
import './TextEditor.css';
import { useActions } from '../hooks/useActions';
interface Props {
  cell: Cell;
}

const TextEditor = ({ cell }: Props) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.addEventListener('click', listener, { capture: true });
    };
  }, []);
  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    );
  }
  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
