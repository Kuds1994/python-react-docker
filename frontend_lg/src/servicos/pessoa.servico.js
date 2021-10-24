import http from '../http';

class PessoaDataServices{
    pegarTodos(){
        return http.get("/pessoa")
    }

    cadastrarPessoa(data){
        return http.post("/pessoa", data)
    }

    getPessoa(id){
        return http.get(`/pessoa?id=${id}`)
    }

}

export default new PessoaDataServices();