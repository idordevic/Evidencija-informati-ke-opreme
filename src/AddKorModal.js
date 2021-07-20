import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddKorModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Korisnik',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_korisnik:null,
                Ime:event.target.Ime.value,
                Prezime:event.target.Prezime.value,
                Email:event.target.Email.value,
                VPN:event.target.VPN.value
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
            Dodaj Korisnika
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Ime">
                        <Form.Label>Ime</Form.Label>
                        <Form.Control type="text" name="Ime" required 
                        placeholder="Ime"/>
                    </Form.Group>

                    <Form.Group controlId="Prezime">
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control type="text" name="Prezime" required 
                        placeholder="Prezime"/>
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="Email" required 
                        placeholder="Email"/>
                    </Form.Group>

                    <Form.Group controlId="VPN">
                        <Form.Label>VPN</Form.Label>
                        <Form.Control type="text" name="VPN" required 
                        placeholder="VPN"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Dodaj Korisnika
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