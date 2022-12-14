import PropTypes from 'prop-types'
import './button.css'

const Button = ({ onClick, children, kind}) => {
  return (
    <button onClick={onClick} className={`button ${kind ? '-' + kind : ''}`}>
      {children}
    </button>
  )
}

Button.protoTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  kind: PropTypes.oneOf(['success', 'danger'])
}

export default Button