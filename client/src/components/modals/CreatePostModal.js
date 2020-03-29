import React from 'react'
import { Modal,ModalHeader, ModalBody, Input, Form, Button } from 'reactstrap'
import MathJax from 'react-mathjax-preview'

const CreatePostModal = ({isOpen,toggle}) => {
  const [value,setValue] = React.useState('')
  const [showPreview,setShowPreview] = React.useState(false) 
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Bir Gönderi Oluştur</ModalHeader>
      <ModalBody>
      
        <Form>
          { showPreview && (
            <div style={{paddingLeft: '18px',paddingRight:'18px'}}>
              <MathJax math={value} />
            </div>)
          }
          <Input type="textarea" value={value} onChange={e => setValue(e.target.value)} />
        <Button type="button" color="info" onClick={() => setShowPreview(prevState =>!prevState)}>{!showPreview ? 'Önizlemeyi Aç' : 'Önizlemeyi Kapat'}</Button>
          <Button color="success" >Oluştur</Button>
        </Form>
        
      </ModalBody>
    </Modal>
  )
}

export default CreatePostModal
