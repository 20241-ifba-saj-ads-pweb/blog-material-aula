---
icon: edit
date: 2024-03-25 20:40:00.00 -3
category:
  - Aula
tag:
  - url
  - servidor
order: 2
---
# Servidores de Aplicação vs Servidores de Páginas

Antes de entrarmos nos detalhes sobre servidores de aplicação e servidores de páginas, é fundamental entender o conceito de servidor em si. 

::: info servidor

Um servidor é um sistema de computação que fornece serviços a outros computadores, conhecidos como clientes, através de uma rede.

:::

## Servidores de Páginas

Os servidores de páginas são responsáveis por hospedar e servir páginas web estáticas. Eles entregam o conteúdo exatamente como está armazenado, sem realizar nenhum processamento adicional.

### Características:

- Entrega de páginas estáticas (HTML, CSS, imagens).
- Menor capacidade de processamento.
- Não suportam linguagens de programação do lado do servidor.

### Exemplos Gratuitos:

- GitHub Pages
- Netlify
- Vercel

#### GitHub Pages:

É uma opção gratuita para hospedar páginas estáticas diretamente de repositórios do GitHub.

#### Netlify:

Oferece hospedagem gratuita para sites estáticos com integração contínua e outras funcionalidades.

#### Vercel:

Especializado em hospedar sites e aplicações front-end, oferece uma plataforma gratuita com integração contínua e deploy automático.

## Servidores de Aplicação

Os servidores de aplicação são projetados para executar aplicações web dinâmicas. Eles são capazes de processar código do lado do servidor, interagir com bancos de dados e fornecer conteúdo dinâmico.

### Características:

- Capacidade de processar e executar código do lado do servidor.
- Suporte a múltiplas linguagens de programação (PHP, Java, Python, Ruby, entre outras).
- Interage com bancos de dados.

### Exemplos Gratuitos:

- Heroku
- Glitch
- Google App Engine

#### Heroku:

Oferece um plano gratuito para hospedar aplicações web com suporte a diversas linguagens e frameworks. Possui uma interface amigável e é muito popular entre desenvolvedores.

#### Glitch:

É uma plataforma gratuita que permite criar, compartilhar e hospedar aplicações web de forma colaborativa. É ideal para projetos pequenos e experimentos.

#### Google App Engine:

Oferece hospedagem gratuita com escalabilidade automática para aplicações web. Suporta várias linguagens de programação e integra-se facilmente com outros serviços do Google.

## Diferenças Principais

**Conteúdo:** Servidores de páginas servem conteúdo estático, enquanto servidores de aplicação servem conteúdo dinâmico.

**Processamento:** Servidores de páginas realizam pouco ou nenhum processamento, enquanto servidores de aplicação executam e processam código do lado do servidor.

**Interação com Bancos de Dados:** Servidores de aplicação têm a capacidade de interagir com bancos de dados para fornecer conteúdo dinâmico, o que não é possível com servidores de páginas.

## URLs (Uniform Resource Locators)

Uma URL (Uniform Resource Locator) é um endereço único usado para localizar um recurso na internet, como uma página web, uma imagem ou um documento. Ela fornece uma forma de identificar e acessar recursos na web de maneira fácil e organizada.

### Estrutura de uma URL

Uma URL é composta por várias partes principais:

```bash
protocolo://domínio:porta/caminho?consulta#fragmento
```

- Protocolo: Especifica como o recurso deve ser acessado. Exemplos comuns são http, https, ftp, mailto.
- Domínio: Identifica o servidor onde o recurso está hospedado. Por exemplo, www.exemplo.com.
- Porta: Opcional. Indica o número da porta no servidor que está servindo o recurso. Geralmente, a porta padrão para http é 80 e para https é 443.
- Caminho: Especifica o local exato do recurso no servidor. Por exemplo, /pagina1/subpagina2/.
- Consulta: Opcional. Utilizado para enviar dados ao servidor, geralmente em formatos como chave=valor. Por exemplo, ?id=123&nome=Joao.
- Fragmento: Opcional. Utilizado para direcionar o navegador para uma parte específica da página. Por exemplo, #secao2.


#### Exemplos de URLs

URL Básica:

```bash
https://www.exemplo.com/pagina1/

```

URL com Porta Específica:

```bash
http://www.exemplo.com:8080/pagina2/
```

URL com Consulta:

```bash
https://www.exemplo.com/busca?q=termo

```

URL com Fragmento:
```bash

https://www.exemplo.com/pagina1#secao3
```


### Principais Protocolos

HTTP (HyperText Transfer Protocol): Protocolo padrão para transferência de dados na web. É comumente utilizado para acessar sites e serviços web.

HTTPS (HTTP Secure): Versão segura do HTTP, utiliza criptografia SSL/TLS para garantir a segurança dos dados transferidos entre o cliente e o servidor.

FTP (File Transfer Protocol): Utilizado para transferência de arquivos entre computadores na internet.

mailto: Utilizado para criar links de email. Quando clicado, abre o cliente de email padrão com o endereço de destino preenchido.

### Importância das URLs

Acessibilidade: Permitem fácil acesso a recursos na internet.

Organização: A estrutura clara das URLs ajuda na organização e identificação dos recursos na web.

SEO (Search Engine Optimization): URLs claras e descritivas podem melhorar a visibilidade e o ranking de um site nos mecanismos de busca.