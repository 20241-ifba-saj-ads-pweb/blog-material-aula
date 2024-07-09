---
icon: edit
date: 2024-03-26 21:40:00.00 -3
category:
  - Aula
tag:
  - sdkman
  - mvn
  - quarkus
---
# Workspace

::: tabs

@tab Linux

## Sdkman


```bash
$ curl -s "https://get.sdkman.io" | bash
```

```bash
$ source "$HOME/.sdkman/bin/sdkman-init.sh"
```

```bash
$ sdk version
```

## Java

```bash
sdk install java
```

## maven

```bash
sdk install maven
```

## quarkus

```bash
sdk install quarkus
```

@tab Windows

## scoop


PowerShell terminal

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

## Java

```bash
scoop bucket add java
scoop install java/temurin-jdk
```

## maven

```bash
scoop bucket add main
scoop install main/maven
```

## quarkus

```bash
scoop bucket add main
scoop install main/quarkus-cli
```


:::


## code.quarkus

[https://code.quarkus.io/](https://code.quarkus.io/)

- selecionar a extensão **REST**
- selecionar a extensão **REST Jackson**
- selecionar java 21
- clicar em "Generate your application"
- fazer o download


## Server REST JSON HTML demo

[https://github.com/20241-ifba-saj-ads-pweb/javarestserver](https://github.com/20241-ifba-saj-ads-pweb/javarestserver)

