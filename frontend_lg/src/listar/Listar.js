import {useState, useEffect, Fragment} from "react"
import {Link} from "react-router-dom";
import { DateTime } from "luxon";
import {Modal, Button} from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

import ProjetosDataServices from "../servicos/projeto.service";

import './index.css'

export default function Listar(){

    const [show, setShow] = useState(false);
    const [showSimular, setShowSimular] = useState(false)
    const [modal, setModal] = useState({
        id: '',
        projeto: ''
    });

    const [investimento, setInvestimento] = useState({
        id: '',
        projeto: '',
        valor: '',
        risco: '',
        riscoPor: '',
        projetoValor: '',
        calculoInvestimento: '',
    });

    const [mensagem, setMensagem] = useState({
        foi: true, 
        mensagem: ''
    })

    const handleCloseExcluir = () => setShow(false);
    const handleShowExcluir = () => setShow(true);

    const handleCloseSimular = () => {
        setShowSimular(false)
        setInvestimento({...investimento, valor: '', calculoInvestimento: ''})
        setMensagem({foi: false, mensagem: ''})
    };
    const handleShowSimular = () => setShowSimular(true);

    const riscoSpan = (n) => {
        switch (n){
            case 0:
                return <span style={{color: 'blue'}}>Baixo</span>
            case 1:
                return <span style={{color: 'gray'}}>Médio</span>
            case 2:
                return <span style={{color: 'red'}}>Alto</span>
            default:
                return 'Fora de Cogitação'    
        }
    }

    const riscoPor = (n) => {
        switch (n){
            case 0:
                return 5
            case 1:
                return 10
            case 2:
                return 20
            default:
                return 0    
        }
    }

    //Lista usada para guardar os dados que vem do banco de dados
    const [projetos, setProjetos] = useState([]); 

    //Variavel usada para fazer a busca dos projetos
    const [busca, setBusca] = useState('');
   
    useEffect(async () => { 
        await ProjetosDataServices.pegarTodos().then(response => {
            //Ordena os proejtos por ordem do id
            setProjetos(response.data.sort((a, b) => a.id - b.id))

        })      
    }, [])

    //Metodo para excluir um todo da lista
    const deletar = () => {
        ProjetosDataServices.deletarProjeto(modal.id).then(() => {
            setProjetos(projetos.filter(u => u.id !== modal.id))
        })
        setModal({})
        handleCloseExcluir()
    }

    const simular = () => {

            if(Number(investimento.valor) > Number(investimento.projetoValor)){

                const porcentagem = riscoPor(investimento.risco)

                const t = (porcentagem/100) * investimento.valor


                setInvestimento({...investimento, calculoInvestimento: t})
                setMensagem({foi: true, mensagem: ''})

            } else {

                setMensagem({foi: false, mensagem: 'O valor do investimento precisa ser maior que o valor do projeto'})
            
            }

    }

    return (
       <div className="listar-todos">
           <h2>Lista de Projetos</h2>
           <div className="form-group">                 
                <input id="nome-projeto" placeholder="Buscar projeto por id ou nome"  name="nome-projeto" onChange={e => setBusca(e.target.value)} className="form-control" type="text"/>
            </div>
           {
           projetos.length > 0 ? 
           <div className="tabela">
            <table className="table tabela">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome do Projeto</th>
                            <th scope="col">Data de Início</th>
                            <th scope="col">Data de Termino</th>
                            <th scope="col">Risco</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Participantes</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projetos.filter(u => u.nome.includes(busca) || u.id == busca).map((t) =>   
                                <tr key={t.id}>                      
                                    <th scope="row"> {t.id} </th>
                                    <td> {t.nome} </td>
                                    <td> {DateTime.fromISO(t.data_inicio).toFormat('dd/MM/yyyy')} </td> 
                                    <td> {DateTime.fromISO(t.data_termino).toFormat('dd/MM/yyyy')} </td> 
                                    <td> {riscoSpan(t.risco)} </td>
                                    <CurrencyFormat value={t.valor} displayType={'text'} renderText={render => <td>{render}</td>} decimalSeparator={'.'}  thousandSeparator={','} prefix={'R$'}/>
                                    <td>{t.participantes.map(function mostrar(e, index){
                                        return (<Fragment key={index}>{e.nome}<br/></Fragment>)
                                    })}</td>
                                                                                                      
                                    <td>
                                        <Link to={`/editar/${t.id}`} id="editar-link" className="btn btn-primary f">Editar</Link> 
                                        <button type="button" onClick={(e) => {e.preventDefault(); setModal({projeto: t.nome, id:t.id}); handleShowExcluir()}} id="excluir-link" className="btn btn-danger f">Excluir</button>
                                        <button type="button" onClick={(e) => {e.preventDefault(); setInvestimento({...investimento, projeto: t.nome, id: t.id, risco: t.risco, projetoValor: t.valor}); handleShowSimular()}} id="excluir-link" className="btn btn-success">Simular</button>
                                    </td>                                                                      
                                </tr>
                            )
                        }                   
                    </tbody>
                    </table>
                </div>
                : <h3>Nenhum projeto cadastrado.</h3>
            }
            <Link to="/cadastrar" id="cadastrar-link" className="btn btn-primary">Cadastrar</Link>
            <Link to="/cadastrarPessoa" id="cadastrar-link" className="btn btn-primary">Cadastrar Pessoa</Link>

            <Modal show={show} onHide={handleCloseExcluir}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Projeto</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja excluir o projeto "{modal.projeto}"</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deletar}>
                        Deletar
                    </Button>
                    <Button variant="secondary" onClick={handleCloseExcluir}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
                <Modal show={showSimular} onHide={handleCloseSimular}>
                    <Modal.Header closeButton>
                        <Modal.Title>Simular Investimento "{investimento.projeto}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">  
                        <div htmlFor="projeto-simular-preco">Valor do projeto: <CurrencyFormat value={investimento.projetoValor} displayType={'text'} renderText={render => <span>{render}</span>} decimalSeparator={'.'}  thousandSeparator={','} prefix={'R$'}/></div> 
                        <div htmlFor="projeto-simular-valor">Risco do investimento: {riscoSpan(investimento.risco)} ({riscoPor(investimento.risco)}%)</div> 
                        <label htmlFor="projeto-simular-valor">Valor do Investimento:</label>
                        <CurrencyFormat className="form-control" id="projeto-valor" name="projeto-risco" required value={investimento.valor} min="0" max="9999999999" thousandSeparator={true} prefix={'R$'} onValueChange={(values) => {
                            const {formattedValue, value} = values;
    
                            setInvestimento({...investimento, valor: value})
                        }}/>
                        
                        {mensagem.foi ? <CurrencyFormat value={investimento.calculoInvestimento} displayType={'text'} renderText={render => <div>{render}</div>} decimalSeparator={'.'}  thousandSeparator={','} prefix={'R$'}/> : mensagem.mensagem}

                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={simular}>
                            Simular
                        </Button>
                        <Button variant="secondary" onClick={handleCloseSimular}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
       </div>
    )
}