import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddLokModal} from './AddLokModal';
import {EditLokModal} from './EditLokModal';


export class Lokacija extends Component{


    constructor(props){
        super(props);
        this.state={loks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Lokacija')
        .then(response=>response.json())
        .then(data=>{
            this.setState({loks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteLok(lokid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Lokacija/'+lokid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


    render(){
        const {loks, lokid, lokpodruznica, lokodjel, lokadresa}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>id_lokacija</th>
                        <th>Podružnica</th>
                        <th>Odjel</th>
                        <th>Adresa</th>
                        <th>Dadatno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loks.map(lok=>
                            <tr key={lok.id_lokacija}>
                                <td>{lok.id_lokacija}</td>
                                <td>{lok.Podruznica}</td>
                                <td>{lok.Odjel}</td>
                                <td>{lok.Adresa}</td>
                                <td>
                                <ButtonToolbar>
    <Button className="mr-2" variant="primary"
    onClick={()=>this.setState({editModalShow:true,
        lokid:lok.id_lokacija,lokpodruznica:lok.Podruznica,lokodjel:lok.Odjel,lokadresa:lok.Adresa})}>
            Uredi
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteLok(lok.id_lokacija)}>
            Obriši
        </Button>

        <EditLokModal show={this.state.editModalShow}
        onHide={editModalClose}
        lokid={lokid}
        lokpodruznica={lokpodruznica}
        lokodjel={lokodjel}
        lokadresa={lokadresa}/>
</ButtonToolbar>               
                                </td>
                        
                             </tr>)}
                   
                   </tbody>
                
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Dodaj Lokaciju</Button>

                    <AddLokModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            
            </div>
        )
    }
}