import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddLokModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Lokacija',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_lokacija:null,
                Podruznica:event.target.Podruznica.value,
                Odjel:event.target.Odjel.value,
                Adresa:event.target.Adresa.value     
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Dodaj Lokaciju
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Podruznica">
                        <Form.Label>Podruznica</Form.Label>
                        <Form.Control type="text" name="Podruznica" required 
                        placeholder="Podruznica"/>
                    </Form.Group>

                    <Form.Group controlId="Odjel">
                        <Form.Label>Odjel</Form.Label>
                        <Form.Control type="text" name="Odjel" required 
                        placeholder="Odjel"/>
                    </Form.Group>

                    <Form.Group controlId="Adresa">
                        <Form.Label>Adresa</Form.Label>
                        <Form.Control type="text" name="Adresa" required 
                        placeholder="Adresa"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Dodaj Lokaciju
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Zatvori</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}