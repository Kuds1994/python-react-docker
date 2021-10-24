import http from '../http';

class ProjetosDataServices{
    pegarTodos(){
        return http.get("/")
    }

    cadastrarProjeto(data){
        return http.post("/", data)
    }

    atualizarProjeto(id, data){
        return http.put(`/?id=${id}`, data)
    }

    getProjeto(id){
        return http.get(`/?id=${id}`)
    }
    
    deletarProjeto(id){
        return http.delete(`/?id=${id}`)
    }

}

export default new ProjetosDataServices();