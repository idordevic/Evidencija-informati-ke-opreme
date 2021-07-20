import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditOprModal extends Component{
    constructor(props){
        super(props);
        this.state={kors:[]};
        this.state={loks:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Korisnik')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kors:data});
        });
  
        fetch(process.env.REACT_APP_API+'Lokacija')
        .then(response=>response.json())
        .then(data=>{
            this.setState({loks:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Oprema',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_oprema:null,
                Marka:event.target.Marka.value,
                Model:event.target.Model.value,
                Tip:event.target.Tip.value,
                Korisnik:event.target.Korisnik.value,
                Lokacija:event.target.Lokacija.value   
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
                <Form.Group controlId="id_oprema">
                        <Form.Label>id_oprema</Form.Label>
                        <Form.Control type="text" name="id_oprema" required
                        disabled
                        defaultValue={this.props.oprid} 
                        placeholder="id_oprema"/>
    
                    </Form.Group>

                    <Form.Group controlId="Marka">
                        <Form.Label>Marka</Form.Label>
                        <Form.Control type="text" name="Marka" required 
                        defaultValue={this.props.oprmarka}
                        placeholder="Marka"/>
                    </Form.Group>

                    <Form.Group controlId="Model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="Model" required 
                        defaultValue={this.props.oprmodel}
                        placeholder="Model"/>
                    </Form.Group>

                    <Form.Group controlId="Tip">
                        <Form.Label>Tip</Form.Label>
                        <Form.Control type="text" name="Tip" required 
                        defaultValue={this.props.oprtip}
                        placeholder="Tip"/>
                    </Form.Group>

                    <Form.Group controlId="Korisnik">
                        <Form.Label>Korisnik</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.kore}>
                        {this.state.kors.map(kor=>
                            <option key={kor.id_korisnik}>{kor.Email}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Lokacija">
                        <Form.Label>Lokacija</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.lokp}>
                        {this.state.loks.map(lok=>
                            <option key={lok.id_lokacija}>{lok.Podruznica}</option>)}
                        </Form.Control>
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