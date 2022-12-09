import PropTypes from 'prop-types'
import Button from '../../components/button/index'
import SaveMessage from '../../components/save-message'

const Header = ({ title, isSaving, handleRemove, handleCreate, handleChange}) => {
  
  return (
    <header className='editor-header'>
      <input type="text" value={title} onChange={handleChange} placeholder='Sem Título'/>
      <SaveMessage  isSaving={isSaving}/>

      <Button onClick={handleCreate} kind='success'>
        Criar Novo
      </Button>

      <Button onClick={handleRemove} kind='danger'>
        Remover
      </Button>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default Header