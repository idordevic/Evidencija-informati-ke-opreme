import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddRevModal} from './AddRevModal';
import {EditRevModal} from './EditRevModal';


export class Revers extends Component{


    constructor(props){
        super(props);
        this.state={revs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Revers')
        .then(response=>response.json())
        .then(data=>{
            this.setState({revs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteRev(revid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'revers/'+revid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


    render(){
        const {revs, revid, revnaziv, revdatum, revslika}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>id_revers</th>
                        <th>Naziv</th>
                        <th>Datum</th>
                        <th>Dadatno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revs.map(rev=>
                            <tr key={rev.id_revers}>
                                <td>{rev.id_revers}</td>
                                <td>{rev.Naziv}</td>
                                <td>{rev.Datum}</td>
                                <td>
                                <ButtonToolbar>
    <Button className="mr-2" variant="primary"
    onClick={()=>this.setState({editModalShow:true,
        revid:rev.id_revers,revnaziv:rev.Naziv,revdatum:rev.Datum,revslika:rev.Slika})}>
            Uredi
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteRev(rev.id_revers)}>
            Obriši
        </Button>

        <EditRevModal show={this.state.editModalShow}
        onHide={editModalClose}
        revid={revid}
        revnaziv={revnaziv}
        revdatum={revdatum}
        revslika={revslika}/>
</ButtonToolbar>               
                                </td>
                        
                             </tr>)}
                   
                   </tbody>
                
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Dodaj Revers</Button>

                    <AddRevModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            
            </div>
        )
    }
}