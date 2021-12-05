import { useRef, useEffect } from 'react';
import './Preview.css';

interface Props {
  code: string;
  error: string;
}

const html = `
  <html>
    <head>
      <style>
        html{
          background-color: white;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
      const handleError=(err)=>{
        const root = document.querySelector('#root')
            root.innerHTML='<div style="color:red;"><h4>Runtime Error</h4>'+err+'</div>'
            console.error(err)
      }
      window.addEventListener('error',(e)=>{
        e.preventDefault()
        handleError(e.error)
      })
        window.addEventListener('message',(e) => {
          try{
            eval(e.data)
          }catch(err){
            handleError(err)
          }
        },false)
      </script>
    </body>
  </html>
  `;

const Preview = ({ code, error }: Props) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className='preview-wrapper'>
      <iframe
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={html}
        title='preview'
      />
      {error && <div className='preview-error'>{error}</div>}
    </div>
  );
};

export default Preview;
