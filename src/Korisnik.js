import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddKorModal} from './AddKorModal';
import {EditKorModal} from './EditKorModal';

export class Korisnik extends Component{

    constructor(props){
        super(props);
        this.state={kors:[], addModalShow:false, editModalShow:false}
        
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Korisnik')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kors:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteKor(korid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Korisnik/'+korid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {kors,korid,korime,korprezime,koremail,korvpn}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>id_korisnik</th>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>VPN</th>
                        <th>Dadatno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kors.map(kor=>
                            <tr key={kor.id_korisnik}>
                                <td>{kor.id_korisnik}</td>
                                <td>{kor.Ime}</td>
                                <td>{kor.Prezime}</td>
                                <td>{kor.Email}</td>
                                <td>{kor.VPN}</td>
                                <td>
                                <ButtonToolbar>
    <Button className="mr-2" variant="primary"
    onClick={()=>this.setState({editModalShow:true,
        korid:kor.id_korisnik,korime:kor.Ime,korprezime:kor.Prezime,koremail:kor.Email,korvpn:kor.VPN})}>
            Uredi
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteKor(kor.id_korisnik)}>
            Obriši
        </Button>

        <EditKorModal show={this.state.editModalShow}
        onHide={editModalClose}
        korid={korid}
        korime={korime}
        korprezime={korprezime}
        koremail={koremail}
        korvpn={korvpn}/>
</ButtonToolbar>

                                
                                </td>
                        
                             </tr>)}
                   
                   </tbody>
                
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Dodaj Korisnika</Button>

                    <AddKorModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            
            </div>
        )
    }
}