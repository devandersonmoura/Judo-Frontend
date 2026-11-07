# Judo-Frontend

Site do cadastro de faixas de judô, em React. A API fica em [Judo-Backend](https://github.com/devandersonmoura/Judo-Backend).

- `/`: formulário, sem login
- `/professor`: lista de adultos e infantil, resumo para encomendar, exclusão e planilha CSV

## Rodar no computador

Com a API rodando na porta 3001:

```bash
npm install
npm run dev
```

Abra http://localhost:5177.

## Publicar na Railway

1. Crie um serviço a partir deste repositório.
2. Em **Settings > Networking**, clique em **Generate Domain**.
3. Em **Variables**, cadastre `VITE_API_URL` com o domínio da API, com `https://`.
4. Na API, confira se `FRONTEND_URL` tem o domínio deste site.

`VITE_API_URL` entra no site na hora do build. Se mudar o valor, faça um novo deploy.
