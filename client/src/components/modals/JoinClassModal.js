import React, { useState } from 'react';

import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../styles/joinClassModal.scss';
import instance from '../../instance';
import { getUserClass } from '../../actions/getUserClass';

const JoinClassModal = ({ isOpen, onClose, getUserClassFn }) => {
  const [classCode, setClassCode] = useState('');
  const [joinClassIsPending, setJoinClassIsPending] = useState(false);
  const handleJoinClass = async () => {
    try {
      setJoinClassIsPending(true);
      const response = await instance.post('/api/classroom/join', {
        secretcode: classCode
      });
      setJoinClassIsPending(false);
      getUserClassFn();
      onClose();
    } catch (error) {
      setJoinClassIsPending(false);
    }
    setJoinClassIsPending(false);
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
              {joinClassIsPending && (
                <Spinner animation="border" variant="primary" />
              )}
              {!joinClassIsPending && 'Sınıfa Katıl'}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
const mapDispatchToProps = dispatch => ({
  getUserClassFn: bindActionCreators(getUserClass, dispatch)
});
export default connect(null, mapDispatchToProps)(JoinClassModal);
