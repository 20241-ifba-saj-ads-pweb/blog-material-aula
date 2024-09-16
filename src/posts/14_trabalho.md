---
icon: edit
date: 2024-09-16 20:20:00.00 -3
category:
  - atividade
tag:
  - entrega
order: 14
---


# Trabalho semestral 

## Descrição do Trabalho

Um sistema ERP (Enterprise Resource Planning) é uma solução integrada que auxilia na gestão de processos empresariais, fornecendo uma visão unificada das atividades da empresa.

Cada aluno deverá implementar um módulo do sistema ERP, utilizando a tecnologia Java (Spring Boot ou Quarkus) para o backend, e deve expor pelo menos uma funcionalidade através de uma API REST. Além disso, o módulo deverá fazer pelo menos uma requisição a um serviço externo por meio de um cliente REST no backend.

Para o desenvolvimento do front-end, o aluno possui liberdade para optar por qualquer framework JavaScript ou CSS, desenvolver a aplicação utilizando JavaScript puro (vanilla) ou até mesmo criar uma solução sem a utilização de JavaScript.

### Requisitos Funcionais
   
Na implementação do módulo escolhido deve conter as seguintes funcionalidades:
   - **CRUD (Create, Read, Update, Delete)**: Implementação completa das operações de cadastro das entidades do módulo
   - **API REST**: Expor pelo menos uma funcionalidade via endpoint REST. Exemplo: 
     - listar todos os clientes cadastrados 
     - buscar um produto pelo código, etc.
   - **Cliente REST**: O sistema deve consumir pelo menos um serviço REST externo. Exemplo: 
     - consultar a taxa de câmbio de uma API pública para um sistema financeiro, 
     - consultar informações tributárias, etc.

### Requisitos Não Funcionais
   - **Validações de Dados**: O módulo deve realizar validações adequadas dos dados (ex: validação de CPF/CNPJ no cadastro de clientes ou fornecedores).
   - **Persistência de Dados**: Utilizar um banco de dados relacional, como PostgreSQL, MySQL ou H2, para armazenar os dados do módulo.

### Tecnologias Obrigatórias
   - **Backend**: Java com Spring Boot ou Quarkus.
   - **Banco de Dados**: Relacional (PostgreSQL, MySQL ou H2).
   - **API REST**: Expor pelo menos uma funcionalidade com REST.
   - **Cliente REST**: Pelo menos uma integração com um serviço REST externo.
   - **Front-end**: HTML, CSS e JavaScript(com ou sem frameworks). 



### Lista de módulos

O módulo deverá ser implementado de forma isolada, mas de maneira que possa se integrar a outros módulos de um sistema ERP completo.

#### Cadastro de Clientes

Armazena informações sobre os clientes, como dados de contato, condições de pagamento, histórico de compras, entre outros.

<figure>

```plantuml
@startuml

skinparam classFontColor automatic
skinparam classHeaderBackgroundColor #444
class Cliente {
    +Long id
    +String nome
    +TipoCliente tipoCliente
    +String cpfCnpj
    +String email
    +String telefone
    +LocalDate dataCadastro
    +Boolean status
    +Endereco enderecoPrincipal
    +List<Endereco> enderecos
    +List<Documento> documentos
}

class Endereco #Technology{
    +Long id
    +Cliente cliente
    +TipoEndereco tipoEndereco
    +String logradouro
    +String numero
    +String complemento
    +String bairro
    +String cidade
    +String estado
    +String cep
    +String pais
}

class Documento {
    +Long id
    +Cliente cliente
    +TipoDocumento tipoDocumento
    +String numero
    +LocalDate dataEmissao
    +String orgaoEmissor
}

class Contato #Technology{
    +Long id
    +Cliente cliente
    +String nome
    +String email
    +String telefone
    +String cargo
}

class TipoCliente <<enumeration>> {
    PESSOA_FISICA
    PESSOA_JURIDICA
}

class TipoEndereco <<enumeration>> {
    RESIDENCIAL
    COMERCIAL
    FATURAMENTO
    ENTREGA
}

class TipoDocumento <<enumeration>> {
    RG
    CNH
    INSCRICAO_ESTADUAL
    PASSAPORTE
}

Cliente --> "1" Endereco : enderecoPrincipal
Cliente --> "0..*" Endereco : enderecos
Cliente --> "0..*" Documento : documentos
Cliente --> "0..*" Contato : contatos
Endereco --> "1" Cliente
Documento --> "1" Cliente
Contato --> "1" Cliente

TipoCliente <-- Cliente
TipoEndereco <-- Endereco
TipoDocumento <-- Documento
@enduml
```

<figcaption>Cadastro de Clientes</figcaption>
</figure>

#### Cadastro de Fornecedores

Inclui informações sobre os fornecedores da empresa, como dados de contato, condições de fornecimento, formas de pagamento e produtos/serviços oferecidos.

<figure>


  ```plantuml
  	
  @startuml
  skinparam classFontColor automatic
  skinparam classHeaderBackgroundColor #444
  
  
  class Fornecedor #Technology{
      + Long id
      + String nome
      + String cnpj
      + String email
      + String telefone
      + LocalDate dataCadastro
      + Boolean status
      + Endereco enderecoPrincipal
      + List<Endereco> enderecos
  }

  class Endereco #Business{
      + Long id
      + Fornecedor fornecedor
      + TipoEndereco tipoEndereco
      + String logradouro
      + String numero
      + String complemento
      + String bairro
      + String cidade
      + String estado
      + String cep
      + String pais
  }

  class Contato #Business{
      + Long id
      + Fornecedor fornecedor
      + String nome
      + String email
      + String telefone
      + String cargo
  }

  class TipoEndereco <<enumeration>> {
      RESIDENCIAL
      COMERCIAL
      FATURAMENTO
      ENTREGA
  }

  Fornecedor --> "1" Endereco : enderecoPrincipal
  Fornecedor --> "0..*" Endereco : enderecos
  Fornecedor --> "0..*" Contato : contatos
  Endereco --> "1" Fornecedor
  Contato -> "1" Fornecedor
  TipoEndereco <- Endereco
  @enduml
  ```

<figcaption>Cadastro de Fornecedores</figcaption>
</figure>

#### Cadastro de Produtos

Contém dados sobre os produtos vendidos ou fabricados pela empresa, incluindo descrições, categorias, códigos de barras, preços e informações de estoque.

<figure>

```plantuml
@startuml
skinparam classFontColor automatic
skinparam classHeaderBackgroundColor #444
class Produto #Technology{
    + Long id
    + String nome
    + String descricao
    + String codigoBarras
    + Double preco
    + String unidadeMedida
    + CategoriaProduto categoria
    + Boolean ativo
    + LocalDate dataCadastro
    + List<Fornecedor> fornecedores
}

class CategoriaProduto {
    + Long id
    + String nome
    + String descricao
}

class Fornecedor #Business{
}

class Estoque #Technology{
    + Long id
    + Produto produto
    + int quantidade
    + LocalDate dataUltimaAtualizacao
    + String localizacao
}

class HistoricoPreco {
    + Long id
    + Produto produto
    + Double precoAntigo
    + Double precoNovo
    + LocalDate dataAlteracao
    + String usuarioResponsavel
}

Produto --> "1" CategoriaProduto : categoria
Produto --> "0..*" Fornecedor : fornecedores
Produto --> "1" Estoque : estoque
Produto --> "0..*" HistoricoPreco : historicoPreco
Estoque --> "1" Produto
HistoricoPreco --> "1" Produto
@enduml

```

<figcaption>Cadastro de Produtos</figcaption>
</figure>

#### Cadastro de Serviços

Mantém informações sobre os serviços oferecidos, como descrição, custo, tempo estimado de execução e preço.

<figure>

```plantuml

@startuml
class Servico #Technology{
    + Long id
    + String nome
    + String descricao
    + Double preco
    + String unidadeMedida
    + CategoriaServico categoria
    + Boolean ativo
    + LocalDate dataCadastro
    + List<PrestadorServico> prestadores
}

class CategoriaServico {
    + Long id
    + String nome
    + String descricao
}

class PrestadorServico {
    + Long id
    + String nome
    + String cpfCnpj
    + String email
    + String telefone
    + LocalDate dataCadastro
    + List<Servico> servicosPrestados
}


Servico --> "1" CategoriaServico : categoria
Servico --> "0..*" PrestadorServico : prestadores
PrestadorServico --> "0..*" Servico : servicosPrestados
@enduml

```
<figcaption>Cadastro de Serviços</figcaption>
</figure>

#### Cadastro de Funcionários

Armazena dados dos colaboradores, incluindo informações pessoais, cargos, salários, departamento, histórico de férias e contratos.

<figure>

```plantuml
@startuml
class Funcionario #Technology{
    + Long id
    + String nome
    + String cpf
    + String email
    + String telefone
    + LocalDate dataNascimento
    + LocalDate dataAdmissao
    + Double salario
    + Boolean ativo
    + Cargo cargo
    + Endereco endereco
    + Departamento departamento
}

class Cargo {
    + Long id
    + String nome
    + String descricao
    + Double salarioBase
}

class Departamento {
    + Long id
    + String nome
    + String descricao
    + Funcionario gerente
}

class Endereco #Business{
    + Long id
    + String logradouro
    + String numero
    + String complemento
    + String bairro
    + String cidade
    + String estado
    + String cep
    + String pais
}

class HistoricoSalario {
    + Long id
    + Funcionario funcionario
    + Double salarioAntigo
    + Double salarioNovo
    + LocalDate dataAlteracao
    + String usuarioResponsavel
}

class HistoricoCargo {
    + Long id
    + Funcionario funcionario
    + Cargo cargoAntigo
    + Cargo cargoNovo
    + LocalDate dataAlteracao
    + String usuarioResponsavel
}

Funcionario --> "1" Cargo : cargo
Funcionario --> "1" Departamento : departamento
Funcionario --> "1" Endereco : endereco
Funcionario --> "0..*" HistoricoSalario : historicoSalario
Funcionario --> "0..*" HistoricoCargo : historicoCargo
Departamento --> "1" Funcionario : gerente
HistoricoSalario --> "1" Funcionario
HistoricoCargo --> "1" Funcionario
@enduml

```
<figcaption>Cadastro de Funcionários</figcaption>
</figure>

#### Cadastro de Transportadoras

Registra informações das empresas responsáveis pelo transporte de mercadorias, com contatos, tipos de serviço e regiões atendidas.

<figure>

```plantuml
@startuml
class Transportadora #Technology {
    + Long id
    + String nome
    + String cnpj
    + String email
    + String telefone
    + LocalDate dataCadastro
    + Boolean ativo
    + Endereco endereco
    + List<Veiculo> veiculos
}

class Endereco #Business{
    + Long id
    + String logradouro
    + String numero
    + String complemento
    + String bairro
    + String cidade
    + String estado
    + String cep
    + String pais
}

class Veiculo #Technology{
    + Long id
    + String placa
    + String modelo
    + String marca
    + String ano
    + String tipoVeiculo
    + Transportadora transportadora
}

class TipoVeiculo <<enumeration>> {
    CAMINHAO
    VAN
    CARRETA
    UTILITARIO
}

Transportadora --> "1" Endereco : endereco
Transportadora --> "0..*" Veiculo : veiculos
Veiculo --> "1" Transportadora : transportadora
Veiculo --> "1" TipoVeiculo : tipo
Veiculo --> "0..*" HistoricoVeiculo : historico
@enduml

```

<figcaption>Cadastro de Transportadoras</figcaption>
</figure>

#### Cadastro de Impostos e Tributações

Armazena informações sobre tributos aplicáveis às operações da empresa, como ICMS, ISS, IPI e suas respectivas alíquotas.

<figure>

```plantuml
@startuml
class Imposto {
    + Long id
    + String nome
    + String descricao
    + Double aliquota
    + TipoImposto tipo
    + LocalDate dataCadastro
    + List<Tributacao> tributacoes
}

class Tributacao #Technology{
    + Long id
    + Imposto imposto
    + String descricao
    + Double valor
    + LocalDate dataInicio
    + LocalDate dataFim
}

class TipoImposto <<enumeration>> {
    ICMS
    ISS
    IPI
    PIS
    COFINS
}

Imposto --> "0..*" Tributacao : tributacoes
Tributacao --> "1" Imposto : imposto
@enduml

```
<figcaption>Cadastro de Impostos e Tributações</figcaption>
</figure>

#### Cadastro de Pedidos de Venda

Registra e gerencia os pedidos realizados por clientes, com detalhes sobre produtos, quantidades, valores e prazos de entrega.

<figure>


```plantuml
@startuml
class PedidoVenda #Technology {
    + Long id
    + String numeroPedido
    + LocalDate dataPedido
    + LocalDate dataEntrega
    + Cliente cliente
    + List<ItemPedido> itens
    + Double valorTotal
    + StatusPedido status
}

class ItemPedido {
    + Long id
    + PedidoVenda pedidoVenda
    + Produto produto
    + Integer quantidade
    + Double precoUnitario
    + Double valorTotal
}

class Cliente #Business{
    + Long id
    + String nome
    + String cpfCnpj
    + String email
    + String telefone
    + Endereco endereco
}

class Endereco #Business{
    + Long id
    + String logradouro
    + String numero
    + String complemento
    + String bairro
    + String cidade
    + String estado
    + String cep
    + String pais
}

class Produto #Business{
    + Long id
    + String nome
    + String descricao
    + String codigoBarras
    + Double preco
    + String unidadeMedida
}

class StatusPedido <<enumeration>> {
    PENDENTE
    APROVADO
    ENVIADO
    ENTREGUE
    CANCELADO
}

PedidoVenda --> "0..*" ItemPedido : itens
PedidoVenda --> "1" Cliente : cliente
ItemPedido --> "1" PedidoVenda : pedidoVenda
ItemPedido --> "1" Produto : produto
Cliente --> "1" Endereco : endereco
@enduml

```

<figcaption>Cadastro de Impostos e Tributações</figcaption>
</figure>

#### Cadastro de Ordens de Compra

<figure>

Registra as ordens de compra emitidas para fornecedores, contendo informações sobre os produtos/serviços adquiridos, valores e prazos de entrega.

```plantuml
@startuml
class OrdemCompra #Technology{
    + Long id
    + String numeroOrdem
    + LocalDate dataOrdem
    + LocalDate dataEntrega
    + Fornecedor fornecedor
    + List<ItemOrdemCompra> itens
    + Double valorTotal
    + StatusOrdemCompra status
}

class ItemOrdemCompra {
    + Long id
    + OrdemCompra ordemCompra
    + Produto produto
    + Integer quantidade
    + Double precoUnitario
    + Double valorTotal
}

class Fornecedor #Business{
    + Long id
    + String nome
    + String cnpj
    + String email
    + String telefone
    + Endereco endereco
}

class Endereco #Business{
    + Long id
    + String logradouro
    + String numero
    + String complemento
    + String bairro
    + String cidade
    + String estado
    + String cep
    + String pais
}

class Produto #Business{
    + Long id
    + String nome
    + String descricao
    + String codigoBarras
    + Double preco
    + String unidadeMedida
}

class StatusOrdemCompra <<enumeration>> {
    PENDENTE
    APROVADO
    ENVIADO
    RECEBIDO
    CANCELADO
}

OrdemCompra --> "0..*" ItemOrdemCompra : itens
OrdemCompra --> "1" Fornecedor : fornecedor
ItemOrdemCompra --> "1" OrdemCompra : ordemCompra
ItemOrdemCompra --> "1" Produto : produto
Fornecedor --> "1" Endereco : endereco
@enduml

```

<figcaption>Cadastro de Ordens de Compra</figcaption>
</figure>

#### Cadastro de Ordens de Produção 


Organiza e acompanha a produção de bens, com informações sobre matérias-primas, quantidades, prazos e fases do processo produtivo.

<figure>

```plantuml
@startuml
class OrdemProducao #Technology {
    + Long id
    + String numeroOrdem
    + LocalDate dataOrdem
    + LocalDate dataConclusao
    + Produto produto
    + Integer quantidade
    + StatusOrdemProducao status
    + List<ItemOrdemProducao> itens
    + List<RecursoProducao> recursos
}

class ItemOrdemProducao {
    + Long id
    + OrdemProducao ordemProducao
    + Produto produto
    + Integer quantidade
    + Double custoUnitario
    + Double valorTotal
}

class RecursoProducao {
    + Long id
    + String nome
    + String tipo
    + Integer quantidadeDisponivel
    + Double custoUnitario
    + List<OrdemProducao> ordensUtilizadas
}

class Produto #Business{
    + Long id
    + String nome
    + String descricao
    + String codigoBarras
    + Double preco
    + String unidadeMedida
}

class StatusOrdemProducao <<enumeration>> {
    PENDENTE
    EM_PRODUCAO
    CONCLUIDA
    CANCELADA
}

OrdemProducao --> "0..*" ItemOrdemProducao : itens
OrdemProducao --> "1" Produto : produto
OrdemProducao --> "0..*" RecursoProducao : recursos
ItemOrdemProducao --> "1" OrdemProducao : ordemProducao
ItemOrdemProducao --> "1" Produto : produto
RecursoProducao --> "0..*" OrdemProducao : ordensUtilizadas
@enduml

```
<figcaption>Cadastro de Ordens de Produção</figcaption>
</figure>


#### Cadastro de Promoções e Descontos

Define e gerencia regras de promoções e descontos oferecidos pela empresa, seja por períodos específicos, campanhas ou para clientes selecionados.

<figure>

```plantuml
@startuml
class Promocao #Technology{
    + Long id
    + String nome
    + String descricao
    + TipoPromocao tipo
    + Double valorDesconto
    + LocalDate dataInicio
    + LocalDate dataFim
    + Boolean ativo
    + List<Produto> produtos
}

class Produto #Business{
    + Long id
    + String nome
    + String descricao
    + String codigoBarras
    + Double preco
    + String unidadeMedida
}

class TipoPromocao <<enumeration>> {
    DESCONTO_PORCENTUAL
    DESCONTO_FIXO
    COMPROU_LEVE
    FRETE_GRATIS
}

class RequisitoPromocao {
    + Long id
    + Promocao promocao
    + String descricao
    + String tipoRequisito
}

Promocao --> "0..*" Produto : produtos
Promocao --> "0..*" RequisitoPromocao : requisitos
Produto <-- "0..*" Promocao : produtos
RequisitoPromocao --> "1" Promocao : promocao
@enduml

```
<figcaption>Cadastro de Promoções e Descontos</figcaption>
</figure>


## Entrega
- Código-fonte em repositório [Git](https://classroom.github.com/a/q0dfvJ58).
- Arquivo README com instruções de como rodar o projeto e informações sobre as dependências.
  
## Prazo: 30/09/2024.
