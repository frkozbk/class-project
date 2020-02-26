import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'


const JoinClassModal = ({isOpen}) => {
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalHeader>Sınıfa Katıl</ModalHeader>
        <ModalBody>
          ModalBody
        </ModalBody>
      </Modal>
    </>
  )
}

export default JoinClassModal
