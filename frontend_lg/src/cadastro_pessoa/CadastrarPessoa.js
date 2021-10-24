import {useState} from "react"
import {Link} from "react-router-dom";

import PessoaDataServices from "../servicos/pessoa.servico";

import './index.css';

export default function CadastrarPessoa(){

    const [pessoa, setPessoa] = useState({
        nome: '',
        email: ''         
    })

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


    const salvar = (e) => {
        e.preventDefault();

        PessoaDataServices.cadastrarPessoa(pessoa).then(response => {
            setMensagem({status: true, texto: "Salvo com sucesso", sucesso: true})
        })
        .catch(error  => {
            setMensagem({status: true, texto: error.response.data.mensagem, sucesso: false})
        });   

    }

    return (
       <div className="section-cadastro">
           <h2>Cadastro de Pessoas</h2>
           <form className="cadastro-pessoas" onSubmit={salvar}>   
                <div className="form-group">  
                    <label htmlFor="pessoas-nome">Nome da Pessoa</label> 
                    <input id="pessoas-nome" name="pessoas-nome" required onChange={e => setPessoa({...pessoa, nome: e.target.value})} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="pessoas-email">Email</label> 
                    <input id="pessoas-email" name="pessoas-email" required onChange={e => setPessoa({...pessoa, email: e.target.value})} className="form-control" type="email"/>
                </div>    
                <button id="cadastro-submit" className="btn btn-primary" type="submit">Cadastrar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/cadastrar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}