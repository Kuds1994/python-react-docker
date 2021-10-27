<p align="center">
    <img src="https://i.imgur.com/rSyq3MW.png" alt="Documentção"></a>
</p>

<h3 align="center">Gerenciador de Projetos Lorem Ipsum Inc.</h3>

<h4 align="center">O projeto tem como o objetivo fazer o gerenciamento dos projetos, seus custos, o valor do investimento e ect.</h4>

## Tecnologias usadas no projeto

- [Python 3.8]
    - [Flask 2.0.2]
    - [SQLAlchememy 2.5.1]
- [Node.js 14.18.1]
- [React.js 17.0.2]
- [Mysql 8.0.27]
- [Docker]

## Métodos para intalação

O projeto e divido em duas camadas: Frontend e Backend. Ambas passam por processos distintos de instalação.
Para evitar a possível incompatibilidade entre os diversos tipos de tecnologias usadas no projeto, foi criado 2 formas para a instalação do projeto.
Nesta branch será descrito o método para a instalação usando o docker. Para seguir o 2º método, é preciso clonar a branch "no-docker". 

## Atenção

Para executar o projeto corretamente, e preciso instalar o node.js, mysql, docker e python.
Criar uma virtual env para executar os comandos do python no método 2.
Para a melhor reproduzação do projeto, abrir o frontend no google chrome.

## Instalação

- Após clonar o repositório, abrir a pasta raiz do projeto, e executar o comando:

```bash
docker-compose up
``` 

- O processo irá demorar alguns minutos para instalar as ferramentas e dependências.
- O docker irá instalar as dependências do banco(Mysql), backend(Python) e o frontend(Node/React)
- O projeto irá executar no endereço "http://localhost:3000"


## O Sistema

O sistema consta com 2 telas: listagem de todos e cadastro de todos.
A tela de cadastro possui os campos: título, descrição e a data de conclusão do todo.
Todos os campos são obrigatórios.
Na tela de listagem de todo, é possível buscar todos pelo nome ou descrição, editar um todo, concluir um todo e excluir um todo.
Para buscar um todo pelo nome ou descrição, é só digitar o nome na busca.
Para concluir um todo, é só clicar no botão concluir no todo específico.
Para excluir um todo, é só clicar no botão excluir no todo específico. Uma tela de confirmação irá aparacer para confirmar se deseja excluir o todo.
Na tela de projetos é possível listar, buscar por nome ou por id, excluir projetos, editar projetos, e simular o investimento no projeto.

## Testes

O sistema possui testes, tanto na parte do backend quanto na parte do front end.

- Para realizar testes no backend, é preciso entrar na pasta "backend" localizada na raiz do projeto.
- Após isso, executar o comando:

```bash
pytest --html=report.html --json-report
``` 

- Após isso os testes serão executados, e quando finalizados, irão gerar um relatório html que ficará na pasta "backend", junto com um relatório json.

Para realizar os testes no frontend, é preciso entrar na pasta "react" e executar o comando:

```bash
npm test
``` 

Após isso, os testes no frontend serão executados.

## Documentação

O sistema também possui uma documentação do backend feita com o Swagger.
É possivel acessar essa documentação entrando no endereço "http://localhost:5000/swagger/"

Nesse endereço é possível:
- Ver as APIs e seus endpoints.
- Fazer chamadas de verbos HTTP para testar as endpoints disponíveis.
- Ver uma breve descrição de como as endpoints funcionam e suas possíveis respostas.
- Ver o modelo do objeto json que é usado tanto como resposta quanto como requisição.

## Agredecimentos

Gostaria de agradecer a Eldorado pela oportunidade e qualquer dúvida sobre a execução do projeto ou instalação, estou a disposição para tentar resolver os problemas, sendo pelo email, telefone ou qualquer outro método de comunicação já fornecido anteriormente.
