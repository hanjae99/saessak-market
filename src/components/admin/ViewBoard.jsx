import React from 'react';

const ViewBoard = ({ dataAry, viewList, onClick }) => {
  let viewKey = 1;
  return (
      <div className='table'>
        <div className='tr'>
          {Object.keys(viewList).map(q => <div key={q} className='th'>{viewList[q]}</div>)}
        </div>

        {dataAry.map(p =>
          <div className='tr' key={'viewBoard'+viewKey++} onClick={(e,p)=>onClick(e,p)}>
            {Object.keys(viewList).map(q => <div key={q} className='td'>{p[q]}</div>)}
          </div>
        )}
      </div>
  )
}

export default ViewBoard