import React, { useState } from 'react';

import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';

import '../../styles/joinClassModal.scss';
import instance from '../../instance';

const JoinClassModal = ({ isOpen, onClose }) => {
  const [classCode, setClassCode] = useState('');
  const [joinClassIsPending, setJoinClassIsPending] = useState(true);
  const [joinClassIsFailed, setJoinClassIsFailed] = useState(false);
  const handleJoinClass = () => {
    setJoinClassIsPending(true);
    instance
      .post('/api/classroom/join', { secretcode: classCode })
      .then(response => {
        setJoinClassIsPending(false);
      })
      .catch(err => {
        setJoinClassIsPending(false);
        setJoinClassIsFailed(true);
      });
  };
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
              onChange={e => setClassCode(e.target.value)}
            />
            <Button block onClick={() => handleJoinClass(classCode)}>
              {joinClassIsPending ? (
                'Sınıfa Katıl'
              ) : (
                <Spinner animation="border" variant="primary" />
              )}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default JoinClassModal;
