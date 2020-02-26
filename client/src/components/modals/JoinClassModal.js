import React,{useState} from 'react'
import { joinClass } from '../../actions/classActions'
import {connect} from 'react-redux'

import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

import '../../styles/joinClassModal.scss'

const JoinClassModal = ({isOpen,onClose}) => {
  const [classCode,setClassCode] = useState('')
  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader>Sınıfa Katıl</ModalHeader>
        <ModalBody>
          <div className="joinClassModal">
            <p>Size verilmiş olan sınıf kodunu giriniz</p>
            <input 
              name="secretCode" 
              type="text" 
              placeholder="Sınıf Kodu" 
              value={classCode} 
              onChange={(e) => setClassCode(e.target.value)}  
            />
            <Button block onClick={() => joinClass(classCode)}>Sınıfa Katıl</Button>
          </div>
          
        </ModalBody>
      </Modal>
    </>
  )
}

export default connect(null,{joinClass})(JoinClassModal)
