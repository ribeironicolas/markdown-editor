import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import MarkdownEditor from './views/markdown-editor'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { v4 } from 'uuid'

import './App.css'

const App = () => {
  const [valueTextArea, setValueTextArea] = useState('')
  const [isSaving, setIsSaving] = useState(null)
  const [id, setId] = useState(v4())
  const [files, setFiles] = useState({})
  const [title, setTitle] = useState('')

  marked.setOptions({
    highlight: (code, lang) => {
      if(lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, code).value
      }
      return hljs.highlightAuto(code).value
    }
  })

  const getMarkup = () => {
    return { __html: marked(valueTextArea)}
  }

  const handleChange = (field) => (e) => {
    switch(field) {
      case 'title': 
        setTitle(e.target.value)
        setIsSaving(true)
        break
      default: 
        setValueTextArea(e.target.value)
        setIsSaving(true)
    }
  }

  const handleSave = useCallback(() => {
    if(isSaving) {
    const files_ = {
      ...files,
      [id]: {
        title: title || 'Sem título',
        content: valueTextArea
      }
    }
      localStorage.setItem('markdown-editor', JSON.stringify(files_))
      setIsSaving(false)
      setFiles(files_)
    }
  }, [files, id, isSaving, title, valueTextArea])

  const clearState = () => {
    setId(v4())
    setValueTextArea('')
    setTitle('')
  }

  const createNew = () => {
    clearState()
    textarea.current.focus()
  }

  const handleRemove = () => {
    const { [id]: idf, ...files_ } = files
    localStorage.setItem('markdown-editor', JSON.stringify(files_))
    setFiles(files_)
    createNew()
  }

  const textarea = useRef(null)
  const handleCreate = () => {
    createNew()
  }

  const handleOpenFile = (fileId) => () => {
    setValueTextArea(files[fileId].content)
    setTitle(files[fileId].title)
    setId(fileId)
  }

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      const files_ = JSON.parse(localStorage.getItem('markdown-editor'))
      setFiles(files_)
      mounted.current = true;
    } else {
      const teste = setTimeout(handleSave, 300)
      return () => clearInterval(teste)
    }
  }, [files, handleSave]);

  return (
    <MarkdownEditor 
    valueTextArea={valueTextArea} 
    setValueTextArea={setValueTextArea}
    getMarkup={getMarkup()}
    handleChange={handleChange}
    isSaving={isSaving}
    setIsSaving={setIsSaving}
    handleRemove={handleRemove}
    handleCreate={handleCreate}
    textarea={textarea}
    files={files}
    handleOpenFile={handleOpenFile}
    title={title}
    />
  )
}

App.propTypes = {
  valueTextArea: PropTypes.string,
  getMarkup: PropTypes.func
}

export default App