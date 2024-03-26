---
icon: edit
date: 2024-03-25 21:40:00.00 -3
category:
  - Aula
tag:
  - url
  - front
  - back
order: 2
---
# Busca de Produtos em um E-commerce

```bash
https://www.exemplo.com/busca?categoria=eletronicos&marca=samsung
```

## Frontend (Cliente):

```javascript
// Função para fazer a requisição ao backend
function buscarProdutos() {
    const categoria = document.getElementById('categoria').value;
    const marca = document.getElementById('marca').value;
    
    const url = `https://www.exemplo.com/busca?categoria=${categoria}&marca=${marca}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Atualiza a interface com os produtos encontrados
            mostrarProdutos(data);
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
}

```

## Backend (Servidor):

```java
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.annotations.QuarkusMain;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

@QuarkusMain
public class Main {

    public static void main(String... args) {
        Quarkus.run(args);
    }

    @io.quarkus.runtime.Startup
    public void startup() {
        Router router = Router.router(io.vertx.core.Vertx.vertx());

        router.get("/busca").handler(this::buscarProdutos);

        Quarkus.vertx().createHttpServer()
            .requestHandler(router)
            .listen(8080);
    }

    private void buscarProdutos(RoutingContext context) {
        String categoria = context.request().getParam("categoria");
        String marca = context.request().getParam("marca");

        // Lógica para buscar produtos no banco de dados
        // (Normalmente, isso envolveria consultar um banco de dados real)

        JsonArray produtos = new JsonArray()
            .add(new JsonObject().put("id", 1).put("nome", "Smartphone Samsung Galaxy S20").put("preco", 3500.00))
            .add(new JsonObject().put("id", 2).put("nome", "TV Samsung 50 polegadas").put("preco", 2500.00));

        context.response()
            .putHeader("Content-Type", "application/json")
            .end(produtos.encode());
    }
}

```