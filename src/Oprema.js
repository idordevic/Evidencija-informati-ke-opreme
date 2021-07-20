import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddOprModal} from './AddOprModal';
import {EditOprModal} from './EditOprModal';


export class Oprema extends Component{


    constructor(props){
        super(props);
        this.state={oprs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Oprema')
        .then(response=>response.json())
        .then(data=>{
            this.setState({oprs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteOpr(oprid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Oprema/'+oprid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


    render(){
        const {oprs, oprid, oprmarka, oprmodel, oprtip, kore, lokp}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>id_oprema</th>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Tip</th>
                        <th>Korisnik</th>
                        <th>Lokacija</th>
                        <th>Dadatno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oprs.map(opr=>
                            <tr key={opr.id_oprema}>
                                <td>{opr.id_oprema}</td>
                                <td>{opr.Marka}</td>
                                <td>{opr.Model}</td>
                                <td>{opr.Tip}</td>
                                <td>{opr.Korisnik}</td>
                                <td>{opr.Lokacija}</td>
                                <td>
                                <ButtonToolbar>
    <Button className="mr-2" variant="primary"
    onClick={()=>this.setState({editModalShow:true,
        oprid:opr.id_oprema,oprmarka:opr.Marka,oprmodel:opr.Model,oprtip:opr.Tip,kore:opr.Korisnik, lokp:opr.Lokacija})}>
            Uredi
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteOpr(opr.id_oprema)}>
            Obriši
        </Button>

        <EditOprModal show={this.state.editModalShow}
        onHide={editModalClose}
        oprid={oprid}
        oprmarka={oprmarka}
        oprmodel={oprmodel}
        oprtip={oprtip}
        kore={kore}
        lokp={lokp}/>
</ButtonToolbar>               
                                </td>
                        
                             </tr>)}
                   
                   </tbody>
                
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Dodaj Opremu</Button>

                    <AddOprModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            
            </div>
        )
    }
}