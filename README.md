# Corporate 👔

Gerador de alfinetadas corporativas em português do Brasil, com interface de chat e botão **Surpreenda-me**.

Descreva o contexto — a reunião que podia ser um e-mail, o deploy de sexta-feira, o "ajuste finho" — e receba a alfinetada perfeita, com toda a sinergia que o mercado exige.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [AI SDK](https://ai-sdk.dev) + [Vercel AI Gateway](https://vercel.com/docs/ai-gateway)
- Modelo: Google Gemini Flash (configurável via env `AI_MODEL`)

## Rodando localmente

```bash
npm install
vercel env pull   # obtém o token OIDC para autenticar no AI Gateway
npm run dev
```

Sem projeto Vercel vinculado, defina `AI_GATEWAY_API_KEY` no `.env.local`.

## Deploy

Hospedado na Vercel; o AI Gateway autentica automaticamente via OIDC — nenhuma chave de API é necessária em produção.

```bash
vercel --prod
```
