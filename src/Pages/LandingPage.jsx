import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';


function LandingPage({database}) {
    const [show, setShow] = useState(false);

    const [title,setTitle] =useState('')
    const [documents,setDocuments]=useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const collectionRef = collection(database, 'docsData')

  const addDocument = ()=>{
    addDoc(collectionRef,
        {
            title:title
        })
        .then(()=>{
            alert('Data Added')
            handleClose()
        })
        .catch(()=>{
            alert('Cannot add Data')
             handleClose()
        })
       

  }

  const getDataFromFirebase = ()=>{
    onSnapshot(collectionRef, (data)=>{
        setDocuments(data.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        }))
    })
  }
  useEffect(()=>{
    getDataFromFirebase()
  },[])
  return (
    <div style={{minHeight:'100vh'}} className='docs-main-section  d-flex flex-column align-items-center justify-content-center'>
        <h1>Docs App</h1>
        <button onClick={handleShow} className='btn btn-info mt-3'>Add Document</button>
        <div>
        <div className='mt-5 d-flex justify-content-evently  align-items-center w-100'>
                {documents.map((doc,i) => {
                    return (
                           
                           
                                <div className='me-5'>
                                    <Card key={i} style={{ width: '18rem' }}>
                                        <Card.Body className='d-flex justify-content-between'>
                                            <Card.Title>{doc.title}</Card.Title>
                                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                            <Card.Text>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                            </Card.Text> */}
                                            <div>
                                                <Button className='bg-transparent text-dark me-2'><i class="fa-solid fa-pen-to-square"></i></Button>
                                                <Button className='bg-transparent text-dark '><i class="fa-solid fa-trash"></i></Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
           
                            

                    )
                })}
                </div>
            </div>
           
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        title={title}
        setTitle={setTitle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Your Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className=' p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Add the Title" value={title} onChange={(e) => setTitle(e.target.value)}  />
            </Form.Group>

            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addDocument} variant="info">Add</Button>
        </Modal.Footer>
      </Modal>
        </div>
  )
}

export default LandingPage