import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import { Table, Row, Col, Container, Button, Alert } from 'react-bootstrap';

function TokenFormEditor() {
  const [jsonData, setJsonData] = useState({
    Symbol: 'SOLX', 
    Name: 'SOLARX',
    Decimal: 18,
    FixedSupply: false, // or true
    InitalSupply: 100000,
    OwnerAddressToken: '0x123ABC',
    Burn: false,
    BurnAddress: '0x456DEF',
    Mint: false,
    MintAddress: '0x789GHI',
    TransferFeeTokenValue: 0.01,
    FeeTokenRecieverAddress: '0xABCFEE',
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const handleEditorChange = (value) => {
    try {
      const parsedData = JSON.parse(value);
      setJsonData(parsedData);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3100/createToken', jsonData);
      const { success, message, tokenID } = response.data;
  
      if (success) {
        setResponseMessage(`Token data submitted successfully! Address Token: ${tokenID}`);
      } else {
        setResponseMessage(`Error: ${message}`);
      }
    } catch (error) {
      setResponseMessage('Error submitting token data. Please try again.');
      console.error('Error submitting token data:', error);
    }
  };

  return (
    <Container className="mt-4">
    <h3 className="mb-3">Create Token</h3>
    <Row>
      <Col>
        <AceEditor
          mode="json"
          theme="monokai"
          value={JSON.stringify(jsonData, null, 2)}
          onChange={handleEditorChange}
          name="json-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          style={{ height: '400px' }}
        />
      </Col>
    </Row>
    <Row className="mt-3">
      <Col>
        <Button onClick={handleSubmit} variant="primary">
          Create Token
        </Button>
      </Col>
    </Row>
    {responseMessage && (
        <Row className="mt-3">
          <Col>
            <Alert variant="info">{responseMessage}</Alert>
          </Col>
        </Row>
      )}
  </Container>
  );
}

export default TokenFormEditor;