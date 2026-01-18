
# Manual de Deploy - AWS S3 (Os 4 Passos)

**Status:** Passo 1 Concluído (Build)

Este guia detalha exatamente como colocar seu site no ar e configurar seu domínio profissional.

---

## ✅ PASSO 1: Build (Gerar Versão Final)
*Você já fez isso!*
1. Rodou `npm run build`.
2. O resultado foi gerado na pasta `dist` (ou no ZIP baixado).
3. **O que fazer:** Tenha essa pasta acessível. É o conteúdo de DENTRO dela que vai para a nuvem.

---

## ☁️ PASSO 2: Criar o Bucket S3 (Hospedagem)
*Aqui preparamos o terreno.*
1. Acesse o **Console AWS** -> **S3**.
2. Clique em **Criar bucket**.
3. **Nome:** Escolha um nome único (ex: `portfolio-cloud-edivaldo-v1`).
4. **Configurações de Segurança:**
   - ⚠️ Desmarque a opção "Bloquear todo o acesso público" (Block all public access).
   - Marque a caixa logo abaixo confirmando que você entende os riscos (é um site público).
5. Crie o bucket.
6. **Ativar Site Estático:**
   - Entre no bucket criado.
   - Vá na aba **Propriedades** -> Role até o final.
   - Em "Hospedagem de site estático", clique em **Editar** -> **Ativar**.
   - Em "Documento de índice", digite: `index.html`.
   - Salvar.
7. **Permissões de Leitura:**
   - Vá na aba **Permissões** -> **Política do bucket** -> Editar.
   - Cole o JSON abaixo (Substitua `NOME_DO_SEU_BUCKET` pelo nome real):
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": "*",
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::NOME_DO_SEU_BUCKET/*"
           }
       ]
   }
   ```

---

## 🚀 PASSO 3: Upload (Subir Arquivos)
*Colocando o site no ar.*
1. Entre na aba **Objetos** do seu bucket e clique em **Carregar** (Upload).
2. **IMPORTANTE:** Arraste TODO o conteúdo de dentro da sua pasta `dist` (o arquivo `index.html`, a pasta `assets`, etc).
   - *Não arraste a pasta dist em si, arraste o conteúdo dela.*
3. Clique em **Carregar**.
4. **Teste:** Vá em Propriedades -> Hospedagem de site estático -> Clique no "Link do bucket". O site deve abrir!

---

## 🌐 PASSO 4: Domínio & HTTPS (O Toque Profissional)
*Transformando `http://bucket...amazonaws.com` em `https://www.seunome.com`*

Para usar seu domínio próprio, você não aponta direto para o S3. Você usa o **CloudFront** na frente dele.

1. **Certificado Seguro (HTTPS):**
   - Vá no **AWS Certificate Manager (ACM)** (Use a região **us-east-1** N. Virgínia, é obrigatório para CloudFront).
   - Clique em "Solicitar certificado".
   - Digite seu domínio (ex: `edivaldocloud.com` e `*.edivaldocloud.com`).
   - Valide o certificado (se o domínio estiver no Route53, é só clicar no botão de criar registros DNS).

2. **Criar Distribuição CloudFront:**
   - Vá no **CloudFront** -> Criar distribuição.
   - **Origem:** Selecione seu bucket S3 na lista.
   - **Visualizador (Viewer):** Em "Viewer Protocol Policy", escolha **"Redirect HTTP to HTTPS"**.
   - **WAF:** Pode desativar (Enable security protections) se quiser economizar, ou deixar ativado.
   - **Configurações:** Em "Alternate domain name (CNAME)", adicione seu domínio (ex: `www.edivaldocloud.com`).
   - **Certificado SSL:** Escolha o certificado que você criou no ACM.
   - Crie a distribuição.

3. **Apontar o Domínio (DNS):**
   - Vá onde você comprou o domínio (Route 53, GoDaddy, Registro.br).
   - Crie um registro tipo **CNAME** (ou Alias no Route 53).
   - Nome: `www`
   - Valor/Destino: O endereço do CloudFront (ex: `d12345abcdef.cloudfront.net`).

**Pronto!** Agora você tem um site React hospedado de forma Serverless, com custo quase zero, domínio próprio e cadeado de segurança.
