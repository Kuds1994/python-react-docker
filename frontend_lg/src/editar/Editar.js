import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

import ProjetosDataServices from "../servicos/projeto.service";
import PessoaDataServices from "../servicos/pessoa.servico"

import './index.css';

export default function Editar(){

    const { id } = useParams();

    const [checkedState, setCheckedState] = useState([]);   

    const [pessoas, setPessoas] = useState([])

    const [participantes, setParticipantes] = useState([]);

    const [projeto, setProjeto] = useState({
        id: '',
        nome: '',
        data_inicio: '',
        data_termino:'',  
        risco: '',
        valor: '',
        participantes: []         
    })

    const [mensagem, setMensagem] = useState({
        texto: '',
        sucesso: false,
        status: false,
    });

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


    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" role="alert">{mensagem.texto}</div>
        }
    }

    useEffect(() => { 

        async function fetch(){
            const response = await PessoaDataServices.pegarTodos()
            
            let check = []
          
            const getProjetos = await ProjetosDataServices.getProjeto(id)

            getProjetos.data.participantes.map((e, index) => {
                const achou = response.data.filter((j) => j.id === e.id)

                if(achou != null){
                    check[index] = true
                } else {
                    check[index] = false
                }
            })

            const c = new Array(response.data.length - check.length).fill(false)

            check.push(...c)
            
            
            setCheckedState(check)   
            setPessoas(response.data)
            setParticipantes(getProjetos.data.participantes)
            setProjeto(getProjetos.data)
            
        }

        fetch()

         
    }, [id])  
    
    const salvar = (e) => {
        e.preventDefault(); 

        const a = projeto

        a.participantes = participantes

        ProjetosDataServices.atualizarProjeto(a.id, a).then(response => {
            
            setMensagem({status: true, texto: "Atualizado com sucesso", sucesso: true})
        }).catch(error  => {
            console.log(error.response)
            setMensagem({status: true, texto: error.response.data.mensagem, sucesso: false})
        });    
    }

    return (
       <div className="section-cadastro">
           <h2>Editar Projeto</h2>
           <form className="editar-todos" onSubmit={salvar}>
           <div className="form-group">  
                    <label htmlFor="projeto-nome">Nome do Projeto</label> 
                    <input id="projeto-nome" name="projeto-nome" onChange={e => setProjeto({...projeto, nome: e.target.value})} value={projeto.nome} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="projeto-inicio">Data de Inicio</label> 
                    <input id="projeto-inicio" name="projeto-inicio" onChange={e => setProjeto({...projeto, data_inicio: e.target.value})} value={projeto.data_inicio} className="form-control" type="date"/>
                </div> 
                <div className="form-group"> 
                    <label htmlFor="projeto-datatermino">Data de Termino</label> 
                    <input id="projeto-datatermino" name="projeto-datatermino" onChange={e => setProjeto({...projeto, data_termino: e.target.value})} value={projeto.data_termino} className="form-control" type="date"/>
                </div> 
                <div className="form-group"> 
                    <label htmlFor="projeto-risco">Risco</label> 
                    <input id="projeto-risco" name="projeto-risco" onChange={e => setProjeto({...projeto, risco: e.target.value})} max="100" min="0" value={projeto.risco} className="form-control" type="number"/>
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
                <button id="atualizar-submit" className="btn btn-primary" type="submit">Atualizar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/listar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}