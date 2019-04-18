# Comandos do .NETCORE

## Verificar versão

    dotnet --version

## Ajuda

    dotnet -h

## Criar novo projeto

    dotnet new <template> -n <nome_projeto>

### Exemplos de template

| Modelos                                      | Nome Curto | Idioma        | Marcas         |
|----------------------------------------------|------------|---------------|----------------|
| Console Application                          | console    | [C# ], F#, VB | Common/Console |
| ASP.NET Core Web App (Model-View-Controller) | mvc        | [C# ], F#     | Web/MVC        |
| ASP.NET Core Web API                         | webapi     | [C# ], F#     | Web/WebAPI     |

#### Para mais exemplos rodar o comando

    dotnet new -h

## Restaurar Projeto

    dotnet restore

## Rodar o Projeto (Aplicação)

    dotnet run

## Build do Projeto

    dotnet build


# EntityFramework

Para criação e manipulação do banco de dados o Entity deve ser adicionado no projeto, para isso execute o comando (no caso para usar o Banco SQL Lite)

    dotnet add package Microsoft.EntityFrameworkCore.Sqlite

## Utilizar o Entity

    dotnet ef

## Criar migrations

    dotnet ef migrations add <nome_da_migration>

## Atualizar o BD

    dotnet ef database update

## Modificar estrutura de uma tabela ou do BD

    Basta alterar os atributos da classe em Models e adicionar uma nova migrations e atualizar o BD

