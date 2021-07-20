import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditKorModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Korisnik',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_korisnik:event.target.id_korisnik.value,
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
            Uređivanje
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="id_korisnik">
                        <Form.Label>id_korisnik</Form.Label>
                        <Form.Control type="text" name="id_korisnik" required
                        disabled
                        defaultValue={this.props.korid} 
                        placeholder="id_korisnik"/>
    
                    </Form.Group>

                    <Form.Group controlId="Ime">
                        <Form.Label>Ime</Form.Label>
                        <Form.Control type="text" name="Ime" required 
                        defaultValue={this.props.korime}
                        placeholder="Ime"/>
                    </Form.Group>

                    <Form.Group controlId="Prezime">
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control type="text" name="Prezime" required 
                        defaultValue={this.props.korprezime}
                        placeholder="Prezime"/>
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="Email" required 
                        defaultValue={this.props.koremail}
                        placeholder="Email"/>
                    </Form.Group>

                    <Form.Group controlId="VPN">
                        <Form.Label>VPN</Form.Label>
                        <Form.Control type="text" name="VPN" required 
                        defaultValue={this.props.korvpn}
                        placeholder="VPN"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Spremi
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