import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

import ProjetosDataServices from "../servicos/projeto.service";
import PessoaDataServices from "../servicos/pessoa.servico"


import './index.css';

export default function Cadastrar(){

    const [checkedState, setCheckedState] = useState([]);

    const [pessoas, setPessoas] = useState([])

    const [participantes, setParticipantes] = useState([]);

    const [projeto, setProjeto] = useState({
        nome: '',
        data_inicio: '',
        data_termino:'',  
        risco: 0,
        valor: '',
        participantes: []     
    })

    useEffect(() => {
        async function fetch(){
            let response = await PessoaDataServices.pegarTodos()
            setCheckedState(new Array(response.data.length).fill(false))   
            setPessoas(response.data)       
        }

        fetch()
    },[])

    const handleOnChange = (position, checked) => {

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState)

        if(updatedCheckedState[position] === true){
            setParticipantes(p => [...p, pessoas[position]])
                      
        }else {
            setParticipantes(participantes.filter((p1) => p1.id !== pessoas[position].id))
        }     
        
    }

    const [mensagem, setMensagem] = useState({
        texto: '',
        sucesso: false,
        status: false,
    });

    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" role="alert">{mensagem.texto}</div>
        }
    }


    const salvar = async (e) => {
        e.preventDefault();

        const a = projeto

        a.participantes = participantes

        await ProjetosDataServices.cadastrarProjeto(a).then(response => {
            setMensagem({status: true, texto: "Salvo com sucesso", sucesso: true})
        })
        .catch((error)  => {
            
            setMensagem({status: true, texto: error.response.data.mensagem, sucesso: false})

        });   

    }


    return (
       <div className="section-cadastro">
           <h2>Cadastro de Projeto</h2>
           <form className="cadastro-todos" onSubmit={salvar}>   
                <div className="form-group">  
                    <label htmlFor="projeto-nome">Nome do Projeto</label> 
                    <input id="projeto-nome" name="projeto-nome" required onChange={e => setProjeto({...projeto, nome: e.target.value})} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="projeto-inicio">Data de Inicio</label> 
                    <input id="projeto-inicio" name="projeto-inicio" required onChange={e => setProjeto({...projeto, data_inicio: e.target.value})} className="form-control" type="date"/>
                </div> 
                <div className="form-group"> 
                    <label htmlFor="projeto-datatermino">Data de Termino</label> 
                    <input id="projeto-datatermino" name="projeto-datatermino" required onChange={e => setProjeto({...projeto, data_termino: e.target.value})} className="form-control" type="date"/>
                </div> 
                <div className="form-group"> 
                    <label htmlFor="projeto-risco">Risco</label> 
                    <select className="form-control " onChange={e => setProjeto({...projeto, risco: e.target.value})} required>
                        <option value="0">Baixo</option>
                        <option value="1">Médio</option>
                        <option value="2">Alto</option>
                    </select>
                </div>
                <div className="form-group"> 
                    <label htmlFor="projeto-valor">Valor</label> 
                    <CurrencyFormat className="form-control" id="projeto-valor" name="projeto-risco" required value={projeto.valor} min="0" max="9999999999" thousandSeparator={true} prefix={'R$'} onValueChange={(values) => {
                        const {formattedValue, value} = values;
    
                        setProjeto({...projeto, valor: value})
                    }}/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="projeto-participantes">Selecione os participantes</label> 
                    <ul className="list-group lista-pessoas">
                        {   
                            pessoas.map((p, index) =>          
                                <li key={p.id} className="list-group-item"> <input type="checkbox" id={"check-" + p.id} checked={checkedState[index]}  onChange={(e) => handleOnChange(index, e.target.checked)}/> {p.nome}</li>                          
                            )
                        }
                    </ul>
                </div>   
                <button id="cadastro-submit" className="btn btn-primary" type="submit">Cadastrar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/cadastrar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}