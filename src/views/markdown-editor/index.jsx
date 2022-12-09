import PropTypes from 'prop-types'
import Files from './Files'
import Header from './Header'

const MarkdownEditor = ({ valueTextArea, getMarkup, handleChange, textarea, files, handleOpenFile, ...props}) => {

  return (
    <section className='editor'>
      <Header {...props} handleChange={handleChange('title')}/>
      <Files files={files} handleOpenFile={handleOpenFile}/>
      <textarea value={valueTextArea} onChange={handleChange()} autoFocus ref={textarea}/>
      <article className='view' dangerouslySetInnerHTML={getMarkup} />
    </section>
  ) 
}

MarkdownEditor.propTypes = {
  valueTextArea: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  getMarkup: PropTypes.object.isRequired,
}


export default MarkdownEditor