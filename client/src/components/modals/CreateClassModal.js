import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Spinner
} from 'reactstrap';

import '../../styles/joinClassModal.scss';
import { bindActionCreators } from 'redux';
import instance from '../../instance';
import { getUserClass } from '../../actions/getUserClass';

const CreateClassModal = ({ isOpen, onClose, getUserClassFn }) => {
  const [className, setClassName] = useState('');
  const [createClassIsPending, setCreateClassIsPending] = useState(false);
  const [createClassIsFailed, setCreateClassIsFailed] = useState(false);
  const [classSecretCode, setClassSecretCode] = useState('');
  const [showSecretCode, setShowSecretCode] = useState(false);
  const createClass = className => {
    setCreateClassIsPending(true);
    instance
      .post('/api/classroom/create', { name: className })
      .then(({ data }) => {
        setClassSecretCode(data.secretCode);
        setShowSecretCode(true);
        setCreateClassIsPending(false);
        getUserClassFn();
        setClassName('');
      })
      .catch(error => {
        setCreateClassIsFailed(true);
      });
  };
  const handleToggle = () => {
    setClassName('');
    setCreateClassIsPending(false);
    setShowSecretCode(false);
    setClassName('');
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={handleToggle}>
        <ModalHeader>Sınıf Oluştur</ModalHeader>
        {!showSecretCode ? (
          <ModalBody>
            <div className="createClassModal">
              <p>Lütfen oluşturmak istediğiniz sınıfın ismini giriniz?</p>
              <Input
                type="text"
                value={className}
                placeholder="Sınıf ismini giriniz."
                onChange={e => setClassName(e.target.value)}
                className="mb-3"
              />
              <Button
                block
                disabled={createClassIsPending}
                onClick={e => createClass(className)}
              >
                {!createClassIsPending ? (
                  'Sınıf Oluştur'
                ) : (
                  <Spinner animation="border" variant="primary" />
                )}
              </Button>
            </div>
          </ModalBody>
        ) : (
          <SecretCodeModalBody
            secretCode={classSecretCode}
            handleClose={onClose}
          />
        )}
      </Modal>
    </>
  );
};
const mapDispatchToProps = dispatch => ({
  getUserClassFn: bindActionCreators(getUserClass, dispatch)
});
const SecretCodeModalBody = ({ secretCode }) => {
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = () => {
    const copyText = document.getElementsByClassName('form-control')[0];
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    console.log(secretCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <ModalBody>
      <div className="createClassModal">
        <p>Lütfen kodunuzu kopyalayıp öğrencilerinizle paylaşın!</p>
        <Input
          className="secretCode"
          type="text"
          value={secretCode}
          readOnly
          className="mb-3"
        />
        <Button block onClick={() => copyToClipboard(secretCode)}>
          {!copied ? 'Panoya Kopyala' : 'Kopyalandı'}
        </Button>
      </div>
    </ModalBody>
  );
};
export default connect(null, mapDispatchToProps)(CreateClassModal);
