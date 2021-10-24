from flask import Flask, abort, jsonify, request
from flask_cors import CORS
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__)
CORS(application)
application.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://user:pass@db/test"
db = SQLAlchemy(application)

pessoas = db.Table('pessoas',
    db.Column('pessoa_id', db.Integer, db.ForeignKey('pessoa.id'), primary_key=True),
    db.Column('projeto', db.Integer, db.ForeignKey('projeto.id'), primary_key=True)
)   

class Projeto(db.Model):
    __tablename__ = 'projeto'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(30), nullable=False)
    data_inicio = db.Column(db.Date(), nullable=False)
    data_termino = db.Column(db.Date(), nullable=False)
    risco = db.Column(db.Integer, nullable=False) 
    valor = db.Column(db.Numeric(10,2), nullable=False)
    pessoas = db.relationship('Pessoa', secondary=pessoas, backref=db.backref('projeto', lazy=True), lazy='subquery')

    def __rep__(self):
        return 'Codigo ' % self.id

    def to_json(self):

        a = [x.to_json() for x in self.pessoas]

        todo = {'id': self.id, 'nome': self.nome, 'data_inicio': self.data_inicio.isoformat(), 'risco': self.risco, 'data_termino': self.data_termino.isoformat(), 'valor': self.valor, 'participantes': a}

        return todo

class Pessoa(db.Model):
    __tablename__='pessoa'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    nome = db.Column(db.String(30), nullable=False) 

    def __rep__(self):
        return 'Codigo ' % self.id
    
    def to_json(self):
        pessoa = {'id': self.id, 'nome': self.nome, 'email': self.email}
        return pessoa  


@application.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def projetos():
    if request.method == 'POST':
        data = request.json

        agora = datetime.today()
        
        if agora < datetime.fromisoformat(data["data_termino"]):
            if datetime.fromisoformat(data["data_inicio"]) < datetime.fromisoformat(data["data_termino"]):

                if data.get('nome') is None:
                    resposta = {'mensagem': 'Campo nome precisa ser preenchido'}
                    return jsonify(resposta), 400 

                if data.get('data_termino') is None:
                    resposta = {'mensagem': 'Campo data termino precisa ser preenchido'}
                    return jsonify(resposta), 400 
                
                if data.get('data_inicio') is None:
                    resposta = {'mensagem': 'Campo risco precisa ser preenchido'}
                    return jsonify(resposta), 400 

                if data.get('risco') is None:
                    resposta = {'mensagem': 'Campo risco precisa ser preenchido'}
                    return jsonify(resposta), 400   
                
                if data.get('valor') is None:
                    resposta = {'mensagem': 'Campo valor precisa ser preenchido'}
                    return jsonify(resposta), 400 

                if data.get('participantes') is None:
                    resposta = {'mensagem': 'Campo de participantes precisa ser preenchido'}
                    return jsonify(resposta), 400 

                novo_projeto = Projeto(nome=data["nome"], data_termino=data["data_termino"], data_inicio=data["data_inicio"], risco=data["risco"], valor=data["valor"]) 

                for pessoa in data["participantes"]:
                    novo_projeto.pessoas.append(Pessoa.query.filter_by(id=pessoa["id"]).first_or_404())

                try:
                    db.session.add(novo_projeto)
                    db.session.commit()
                    return 'Salvo com sucesso!'
                except:
                    abort(403)

            resposta = {'mensagem': 'O tempo de inicio deve ser menor que o tempo de termino'}
            return jsonify(resposta), 400            

        resposta = {'mensagem': 'O tempo de termino precisa ser maior que hoje'}
        return jsonify(resposta), 400

    elif request.method == 'PUT':

        data = request.json

        agora = datetime.today()

        if agora < datetime.fromisoformat(data["data_termino"]):
            if datetime.fromisoformat(data["data_inicio"]) < datetime.fromisoformat(data["data_termino"]):
     
                id = request.args['id']      
                todo = Projeto.query.filter_by(id=id).first_or_404()   

                todo.pessoas = []         
            
                if data.get('nome') is not None:
                    todo.nome = data["nome"]
                else:
                    resposta = {'mensagem': 'Campo nome precisa ser preenchido'}
                    return jsonify(resposta), 400 

                if data.get('data_termino') is not None:
                    todo.data_termino = data["data_termino"]
                else:
                    resposta = {'mensagem': 'Campo data termino precisa ser preenchido'}
                    return jsonify(resposta), 400 
                
                if data.get('data_inicio') is not None:
                    todo.data_inicio = data["data_inicio"]
                else:
                    resposta = {'mensagem': 'Campo risco precisa ser preenchido'}
                    return jsonify(resposta), 400 

                if data.get('risco') is not None:
                    todo.risco = data["risco"]
                else:
                    resposta = {'mensagem': 'Campo risco precisa ser preenchido'}
                    return jsonify(resposta), 400   
                
                if data.get('valor') is not None:
                    todo.valor = data["valor"]
                else:
                    resposta = {'mensagem': 'Campo valor precisa ser preenchido'}
                    return jsonify(resposta), 400 

                if data.get('participantes') is None:
                    resposta = {'mensagem': 'Campo de participantes precisa ser preenchido'}
                    return jsonify(resposta), 400 

                for pessoa in data["participantes"]:
                    todo.pessoas.append(Pessoa.query.filter_by(id=pessoa["id"]).first_or_404())      
                
                db.session.commit()
                return 'Atualizado com sucesso'

            resposta = {'mensagem': 'O tempo de inicio deve ser menor que o tempo de termino'}
            return jsonify(resposta), 400 

        resposta = {'mensagem': 'Tempo de termino precisa ser maior que hoje'}
        return jsonify(resposta), 400    

    elif request.method == 'DELETE':
        id = request.args['id']
        
        todo = Projeto.query.filter_by(id=id).first_or_404()
        
        db.session.delete(todo)
        db.session.commit()

        return 'Excluído com sucesso!'
   
    else:
        if request.args.get('id') is not None:

            id = request.args['id']

            projeto = Projeto.query.filter_by(id=id).first_or_404()

            return projeto.to_json()

        projetos = Projeto.query.all()
        return jsonify([projeto.to_json() for projeto in projetos])   


@application.route('/pessoa', methods=['GET', 'POST'])
def pessoas():
    if request.method == 'POST':
        data = request.json

        pessoa_novo = Pessoa(nome=data["nome"], email=data["email"])
        try:
            db.session.add(pessoa_novo)
            db.session.commit()
            return 'Salvo com sucesso!'
        except:
            abort(403)  

    else:
        if request.args.get('id') is not None:

            id = request.args['id']

            pessoa = Pessoa.query.filter_by(id=id).first_or_404()

            return pessoa.to_json()

        pessoas = Pessoa.query.all()
        return jsonify([pessoa.to_json() for pessoa in pessoas])   


if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0')