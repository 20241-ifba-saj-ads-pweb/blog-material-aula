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
package br.edu.ifba.saj.ads.pweb;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.annotations.QuarkusMain;
import io.vertx.core.Vertx;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;



@QuarkusMain
public class Main {
    
    @JsonSerialize
    public record Produto(Integer id, String nome, String categoria, String marca, Double preco) {}


    public static void main(String[] args) {
        Quarkus.run(args);
    }

    @Startup
    public void startup() throws Exception {
        Vertx vertx = Vertx.vertx();
        Router router = Router.router(vertx);

        router.get("/busca").handler(this::buscarProdutos);

        vertx.createHttpServer().requestHandler(router).listen(8080);
    }

    private void buscarProdutos(RoutingContext context) {
        String categoria = Optional.ofNullable(context.request().getParam("categoria")).orElse("TV");
        String marca = Optional.ofNullable(context.request().getParam("marca")).orElse("Samsung");

        // Lógica para buscar produtos no banco de dados
        // (Normalmente, isso envolveria consultar um banco de dados real)

        JsonArray jsonreturn = new JsonArray();
        
        List<Produto> produtos =  List.of(
                new Produto(1, "Smartphone Samsung Galaxy S20","Smartphone", "Samsung", 3500.00), 
                new Produto(2, "TV Samsung 50 polegadas","TV", "Samsung", 2500.00)
            );
        produtos.stream()
                    .filter(p -> p.categoria().equals(categoria) && p.marca().equals(marca))
                    .findAny()
                    .map(p -> jsonreturn.add(new JsonObject(Json.encode(p))));

        context.response()
                .putHeader("Content-Type", "application/json")
                .end(jsonreturn.encode());
    }
}
```

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>br.edu.ifba.saj.ads</groupId>
    <artifactId>poo</artifactId>
    <version>1.0.0-SNAPSHOT</version>

    <properties>
        <compiler-plugin.version>3.12.1</compiler-plugin.version>
        <maven.compiler.release>17</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <quarkus.platform.artifact-id>quarkus-bom</quarkus.platform.artifact-id>
        <quarkus.platform.group-id>io.quarkus.platform</quarkus.platform.group-id>
        <quarkus.platform.version>3.9.1</quarkus.platform.version>
        <skipITs>true</skipITs>
        <surefire-plugin.version>3.2.5</surefire-plugin.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>${quarkus.platform.group-id}</groupId>
                <artifactId>${quarkus.platform.artifact-id}</artifactId>
                <version>${quarkus.platform.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>${quarkus.platform.group-id}</groupId>
                <artifactId>quarkus-camel-bom</artifactId>
                <version>${quarkus.platform.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-arc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.camel.quarkus</groupId>
            <artifactId>camel-quarkus-smallrye-reactive-messaging</artifactId>
        </dependency>
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-jackson</artifactId>
        </dependency>
        <dependency>
            <groupId>io.quarkus</groupId>
            <artifactId>quarkus-junit5</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <defaultGoal>compile quarkus:dev</defaultGoal>
        <plugins>
            <plugin>
                <groupId>${quarkus.platform.group-id}</groupId>
                <artifactId>quarkus-maven-plugin</artifactId>
                <version>${quarkus.platform.version}</version>
                <extensions>true</extensions>
                <executions>
                    <execution>
                        <goals>
                            <goal>build</goal>
                            <goal>generate-code</goal>
                            <goal>generate-code-tests</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>${compiler-plugin.version}</version>
                <configuration>
                    <compilerArgs>
                        <arg>-parameters</arg>
                    </compilerArgs>
                </configuration>
            </plugin>
            <plugin>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>${surefire-plugin.version}</version>
                <configuration>
                    <systemPropertyVariables>
                        <java.util.logging.manager>org.jboss.logmanager.LogManager</java.util.logging.manager>
                        <maven.home>${maven.home}</maven.home>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
            <plugin>
                <artifactId>maven-failsafe-plugin</artifactId>
                <version>${surefire-plugin.version}</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>integration-test</goal>
                            <goal>verify</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <systemPropertyVariables>
                        <native.image.path>${project.build.directory}/${project.build.finalName}-runner</native.image.path>
                        <java.util.logging.manager>org.jboss.logmanager.LogManager</java.util.logging.manager>
                        <maven.home>${maven.home}</maven.home>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <profiles>
        <profile>
            <id>native</id>
            <activation>
                <property>
                    <name>native</name>
                </property>
            </activation>
            <properties>
                <skipITs>false</skipITs>
                <quarkus.package.type>native</quarkus.package.type>
            </properties>
        </profile>
    </profiles>
</project>

```
