# Barber Pro

# Sobre o projeto

Este projeto é um sistema de uma barbearia que o usuário consegue registrar um modelo de corte definindo o preço e pode atualizar depois.
Também é possivel registrar os clientes informando o nome e o modelo de corte que vai ser realizado. Na agenda pode verificar todos os clientes registrados e é possível abrir um registro e finalizar o serviço.
O sistema possui uma opção de comprar um plano premium, foi utilizado Stripe como um sistema de pagamentos.

## Layout Web 

<div style="display: flex; flex-wrap: wrap;">
<img src="./public/barberpro.gif" alt="Layout Barber Pro">

</div>

## Layout Mobile

<div style="display: flex; flex-wrap: wrap;">
    <img src="./public/login.png" alt="Login" style='width:250px'/>
    <img src="./public/cadastro.png" alt="Cadastro" style='width:250px'/>
    <img src="./public/menu-lateral.png" alt="Menu lateral" style='width:250px'/>
    <img src="./public/agenda.png" alt="Agenda Barber Pro" style='width:250px'/>
    <img src="./public/minha-conta.png" alt="Minha Conta" style='width:250px'/>
    <img src="./public/modelos-de-corte.png" alt="Modelos de corte" style='width:250px'/>
    <img src="./public/cadastrar-modelo.png" alt="Cadastrar modelo" style='width:250px'/> 
    <img src="./public/planos.png" alt="Planos" style='width:250px'/>
</div>


# Tecnologias utilizadas 

- Next.Js
- React.Js
- TypeScript
- Stripe
- Chakra UI

# Pré requisitos

 - Node.js e sistema backend rodando: 

```bash
 # Baixar backend
 git clone https://github.com/leowingss/backend-barberpro.git

 # Instalar dependências e executar o projeto
 yarn install 
 yarn dev
```


# Como rodar o projeto

```bash 
git clone https://github.com/leowingss/sistema-barbearia.git

# Entrar na pasta
cd sistema-barbearia

# Instalar dependências
yarn install ou npm install

# Executar o projeto
yarn dev ou npm run dev

# Abrir projeto

Entrar no http://localhost:3000

``` 