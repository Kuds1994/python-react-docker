<p align="center">
    <img src="https://i.imgur.com/rSyq3MW.png" alt="Documentção"></a>
</p>

<h3 align="center">Gerenciador de Projetos</h3>

<h4 align="center">O projeto tem como o objetivo fazer o gerenciamento dos projetos, seus custos, o valor do investimento e ect.</h4>

## Tecnologias usadas no projeto

- [Python 3.8]
    - [Flask 2.0.2]
    - [SQLAlchememy 2.5.1]
- [Node.js 14.18.1]
- [React.js 17.0.2]
- [Mysql 8.0.27]
- [Docker]

## Instalação

O projeto e divido em duas camadas: Frontend e Backend. Ambas passam por processos distintos de instalação.
Para evitar a possível incompatibilidade entre os diversos tipos de tecnologias usadas no projeto, foi criado 2 formas para a instalação do backend.
Nesta branch será descrito o método para a instalação sem o docker. Para seguir o 1° método, é preciso clonar a branch "master".

## Atenção

Para executar o projeto corretamente, e preciso instalar o node.js, mysql, docker e python.
Criar um virtual env para executar os comandos do python no método 2.
Para a melhor reproduzação do projeto, abrir o frontend no google chrome.

## Instalação

** O segundo método precisa que todas as tecnologias mencionadas acima estejam instaladas no computador

- Após clonar o repositório, abrir a pasta raiz do projeto, executar o seuinte comando no Prompt, para entrar na pasta do frontend:

```bash
cd frontend_lg
``` 

- Com o node instalado, executar o seguinte comando na pasta "frontend_lg": 

```bash
npm install
``` 

- Depois que as dependências forem instaladas, executar o seguinte comando, para executar o frontend.:

```bash
npm start
``` 

Após isso o frontend já estará sendo executado, agora é preciso instalar o backend.

- Abrir um prompt na raiz do projeto e executar o comando "cd backend_lg" para entrar na pasta do backend.

- Com o python instalado, executar o seguinte comando, para instalar as dependências do python: 

```bash
pip install -r requirements.txt
``` 

- Abrir o arquivo app.py localizado em "backend_lg", ir na linha 9 e substituir os campos:

```python
"mysql+mysqlconnector://<usuario_do_banco>:<senha_do_usuario>@localhost/test"
```

- Abrir o arquivo localizado na pasta "backend_lg/scripts" chamado "init.sql" e executar o script no SGBD (Sistema Gerenciadador do Banco de Dados)

- Após isso executar o seguinte comando, na pasta "backend_lg", para executar o backend:

```bash
python app.py
``` 

- Após esse processo, abrir o google chrome no endereço "localhost:3000" ou no endereço indicado no prompt de comando do frontend.

## O sistema

O sistema consta com 3 telas: listagem de projetos, cadastro de projetos e cadastro de pessoas. Para adicionar alguem no projeto, é preciso cadastrar uma pessoa primeiro. Na tela de projetos é possível listar, buscar por nome ou por id, excluir projetos, editar projetos, e simular o investimento no projeto.

## Agredecimentos

Gostaria de agradecer a LG pela oportunidade e qualquer duvida sobre a execução do projeto ou instalação, estou a disposição para tentar resolver os problemas, sendo pelo email, telefone ou qualquer outro método de comunicação já fornecido anteriormente.
