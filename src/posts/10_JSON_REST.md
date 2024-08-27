---
icon: edit
date: 2024-08-26 20:20:00.00 -3
category:
  - aula
tag:
  - javascript
order: 9
---


# REST e JSON

## Surgimento da API REST

A API REST (_Representational State Transfer_) foi introduzida por Roy Fielding em sua tese de doutorado em 2000 [^REST]. Fielding, um dos principais autores do protocolo HTTP, buscava uma maneira eficiente e escalável de comunicação entre sistemas na web. A REST se baseia em princípios arquiteturais que permitem a interação entre componentes distribuídos de forma simples e padronizada.

### Princípios Fundamentais

1. **Recursos**: Tudo na REST é considerado um recurso, identificado por uma URL única.
2. **Métodos HTTP**: Utiliza métodos como GET, POST, PUT e DELETE para operações CRUD (Create, Read, Update, Delete).
3. **Stateless**: Cada requisição é independente, sem armazenamento de estado no servidor.
4. **Cacheabilidade**: Respostas podem ser armazenadas em cache para melhorar a eficiência.
5. **Interface Uniforme**: Simplifica a arquitetura, permitindo que diferentes sistemas interajam de maneira consistente.

### Onde utilizar 

A API REST é essencial em diversas situações, especialmente quando:

1. **Integração entre Sistemas**: Facilita a comunicação entre diferentes aplicações, como um aplicativo móvel e um servidor backend.
2. **Escalabilidade**: Ideal para sistemas que precisam crescer e atender a um grande número de requisições simultâneas.
3. **Desenvolvimento Web**: Amplamente usada em aplicações web modernas devido à sua simplicidade e compatibilidade com HTTP.
4. **Microserviços**: Permite que diferentes serviços de uma arquitetura de microserviços se comuniquem de forma eficiente.


## Surgimento do JSON**

JSON (JavaScript Object Notation) surgiu no início dos anos 2000 como uma alternativa leve e fácil de usar para a troca de dados entre um servidor e um cliente. Criado por Douglas Crockford, JSON foi projetado para ser uma forma simples de representar estruturas de dados complexas de maneira legível tanto para humanos quanto para máquinas. Sua sintaxe é baseada em um subconjunto da linguagem de programação JavaScript, o que facilita sua adoção em ambientes web.

### Onde utilizar

1. **Comunicação Cliente-Servidor**: JSON é amplamente utilizado em APIs RESTful para a troca de dados entre servidores e clientes. Sua estrutura simples e legível facilita a serialização e desserialização de dados.

2. **Armazenamento de Dados**: JSON é frequentemente usado para armazenar configurações e dados em arquivos devido à sua simplicidade e facilidade de leitura. Muitos bancos de dados NoSQL, como MongoDB, utilizam JSON para armazenar documentos.

3. **Configuração de Aplicações**: Arquivos de configuração em JSON são comuns em diversas aplicações, permitindo que desenvolvedores definam parâmetros de forma clara e organizada.

4. **Interoperabilidade**: JSON é uma escolha popular para a interoperabilidade entre diferentes sistemas e linguagens de programação, devido à sua natureza independente de linguagem.

**Exemplo de Estrutura JSON**

```json
{
  "nome": "João",
  "idade": 30,
  "profissão": "Desenvolvedor",
  "habilidades": ["JavaScript", "Python", "SQL"]
}
```

## Construindo o HTML no navegador

Disparando uma requisição via JavaScript para um servidor, ele irá responder com um JSON contendo os dados necessários. A partir dessa resposta, podemos dinamicamente construir o HTML no navegador. Aqui está um exemplo de como isso pode ser feito:

[^Fetch]

1. **Fazendo a Requisição**:
   ```javascript
   fetch('https://api.exemplo.com/dados')
     .then(response => response.json())
     .then(data => construirHTML(data))
     .catch(error => console.error('Erro:', error));
   ```

2. **Função para Construir o HTML**:
   ```javascript
   function construirHTML(dados) {
     const container = document.getElementById('container');
     dados.forEach(item => {
       const div = document.createElement('div');
       div.className = 'item';
       div.innerHTML = `
         <h2>${item.titulo}</h2>
         <p>${item.descricao}</p>
       `;
       container.appendChild(div);
     });
   }
   ```

3. **Estrutura HTML Inicial**:
   ```html
   <!DOCTYPE html>
   <html lang="pt-BR">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Exemplo de Construção de HTML</title>
     <style>
       .item {
         border: 1px solid #ccc;
         padding: 10px;
         margin: 10px 0;
       }
     </style>
   </head>
   <body>
     <div id="container"></div>
     <script src="script.js"></script>
   </body>
   </html>
   ```

Neste exemplo, a função `fetch` é usada para fazer uma requisição para um servidor. Quando a resposta JSON é recebida e convertida para Objetos, a função `construirHTML` é chamada para criar e inserir elementos HTML no DOM com base nos dados recebidos.



### Atividade Prática

- **Objetivo**: Fazer uma requisição a uma API pública e exibir os dados no HTML. [^JSONPlaceholder]
- **Passos**:
  1. Escolher uma API pública (ex: https://jsonplaceholder.typicode.com/posts).
  2. Fazer a requisição usando `fetch`.
  3. Manipular os dados JSON recebidos.
  4. Criar elementos HTML dinamicamente para exibir os dados.

[Entrega](https://classroom.github.com/a/6CFmY5WW)


<!-- @include: ../bib/bib.md -->