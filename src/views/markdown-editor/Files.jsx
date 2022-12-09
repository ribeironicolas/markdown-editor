import React from 'react'

const Files = ({ files, handleOpenFile}) => {

  return (
    <div className='files-list-container'>
      <h2 className='files'>Files</h2>

      <ul>
        {files && (Object.keys(files).map((fileId) => 
          <li key={fileId}>
            <button className='buttons' onClick={handleOpenFile(fileId)}>{files[fileId].title}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Files