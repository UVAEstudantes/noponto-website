# NoPonto · site oficial

Presença web do aplicativo de mobilidade do Rio de Janeiro. Estático, público e independente do backend operacional. React, TypeScript, Vite, CSS responsivo, Lucide, qrcode.react e react-markdown. Animações CSS respeitam movimento reduzido; sem dependência de animação ou Tailwind desnecessária.

## Desenvolvimento

Node.js 22 ou superior. `npm ci`, `npm run dev`. Build: `npm run build`. Testes: `npm test`. A saída está em `dist/`, com base `/noponto-website/`. Navegação por âncoras dispensa roteamento de SPA.

## Publicação

Push em `main` executa testes, build e publicação pelas actions oficiais de Pages em `.github/workflows/pages.yml`. Em Settings → Pages → Build and deployment, selecionar **GitHub Actions**. URL: https://uvaestudantes.github.io/noponto-website/ . Nunca inserir tokens em arquivos ou no frontend.

## APK e QR Code automáticos

`src/releases.ts` consulta a API pública `repos/UVAEstudantes/.github/releases?per_page=30`, sem token. Ignora drafts, datas inválidas e publicações sem APK válido, aceita prereleases e ordena por `published_at` decrescente (desempate por id). Não compara versões textuais nem usa `/latest`. APKs exigem tamanho positivo, estado uploaded e URL HTTPS do diretório oficial de downloads retornada em `browser_download_url`.

Com vários APKs: nome exato opcional `preferredApkName`, depois universal, nome em ordem lexical e id. Não se presume nome fixo. Beta é identificado pelo campo prerelease **ou** por nome/tag; publicações atuais têm Beta no texto mas prerelease false. Botão e QR recebem a mesma release e URL, atualizando juntos. Histórico inclui publicações elegíveis anteriores; Markdown não permite HTML arbitrário.

Cache local de 15 minutos, validado novamente ao ler, com revalidação ao expirar e enquanto a página permanece aberta. Armazenamento bloqueado não impede uso. Falha de rede, limite de consultas ou resposta vazia mostram link para releases; nenhum APK é inventado. Publicar um APK na origem atualiza o site automaticamente após o cache expirar, sem deploy.

A API pública limita requisições por IP; apenas as 30 publicações consultadas são consideradas. GitHub Pages serve arquivos estáticos e não oferece backend, autenticação ou consulta operacional. Nenhum serviço do aplicativo é acessado.

## Conteúdo e imagens

Links, textos editoriais e catálogo em `src/content.ts`; seções em `src/App.tsx`, galeria em `src/Gallery.tsx`, downloads/histórico em `src/Downloads.tsx`, elementos comuns em `src/ui.tsx`. Tema e animações em `src/style.css`. Serviço e hook de releases separados.

As capturas 001–012 e a marca são assets do projeto NoPonto / UVAEstudantes, copiados de `.github/imgs/` e conferidos visualmente com o README atual e código mobile. Originais preservados em `public/images`; WebP usados na página. `node optimize.mjs` regenera os WebP e imagem social, usando sharp apenas no desenvolvimento. Não substituir por capturas antigas. Atualize alt e legendas no catálogo. 006 (estatísticas) e 009 (Rotinas) são demonstrações, nunca dados reais. Telas 011 e 012 são notificações Android.

## Recomendações para próximas releases (sem alterar as existentes)

- Tag: `v5.4.0-beta`.
- Título: `NoPonto v5.4.0 Beta — Nome da atualização`.
- APK: `NoPonto-v5.4.0-beta.apk`.
- Marcar prerelease quando for beta.

Modelo de descrição:

```markdown
# NoPonto v5.4.0 Beta — Nome da atualização

## Novidades

- Recursos entregues, distinguindo demonstrações.

## Melhorias

- Melhorias de experiência e desempenho.

## Correções

- Problemas corrigidos.

## Instalação

Baixe NoPonto-v5.4.0-beta.apk nos arquivos desta publicação.
Abra no Android e autorize somente o navegador utilizado se solicitado.
Mantenha as proteções do Android ativas.

## Limitações conhecidas

- Cobertura e estimativas dependem das fontes disponíveis.
```

Hoje há duas publicações v5.3 Beta com tags diferentes, nomes de APK variados e beta não marcado no campo prerelease. A descrição da publicação mais recente menciona app-release.apk, enquanto o asset é NoPonto.apk. O site usa o asset real e a data publicada, permanecendo compatível com o padrão antigo e o sugerido. A migração deve valer apenas para novas publicações: **preservar tags, assets e URLs antigos**, evitando quebrar instalações e links compartilhados. Nenhuma release existente foi modificada.

## Validação

Testes focados em seleção por publicação, ausência de APK, beta, nomes semelhantes, nome variável, resposta vazia/malformada, URLs inválidas, múltiplos APKs, falhas de rede/rate limit, cache e sincronização do QR com download. Build TypeScript + Vite valida caminhos do subdiretório. Layout com pontos de ajuste para celular, tablet e desktop; menu por teclado, diálogo nativo com Escape, foco visível e alternativas textuais ao QR.

### Inventário observado em 16/11/2026

| Tag existente          | APK publicado                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `v5.3-beta`            | `NoPonto.apk`                                                                        |
| `noponto-v5.3-beta`    | `NoPonto.apk`                                                                        |
| `onboarding-v1.0-beta` | `NoPonto-Release-feature-onboarding-interativo-3062d55646de-20261113-161406-985.apk` |
| `radar-v5.3-beta`      | `app-release.apk`                                                                    |
| `radar-v5.2-beta`      | `app-release.apk`                                                                    |
| `radar-v5.1-beta`      | `app-release.apk`                                                                    |

Há prefixos e esquemas de versão misturados; os nomes públicos não identificam sempre o APK, e Beta consta no texto sem prerelease. Se desejado futuramente, títulos e descrições podem ser revisados mantendo tags e assets intactos. Renomear ou excluir tags/assets rompe URLs: preservar os antigos e adotar o padrão recomendado nas próximas publicações. Este inventário é somente recomendação; as releases não foram alteradas.

## V2 em revisão

A branch `feat/website-v2-refinamentos` preserva a composição original e acrescenta seções editoriais de Rotinas e Perfil. O conteúdo foi conferido em `noponto-frontend/NoPonto/src/services/rotinasDemo.ts` e `features/perfil/perfilLocal.ts`: configuração local e etapas ilustrativas de Rotinas; perfil local com nome/cor/iniciais e favoritos. Histórico, estatísticas, retrospectivas e comunidade são visão futura, não coleta já implementada.

O botão de ajustes no header abre um diálogo nativo acessível. Aparência: claro, escuro ou sistema (padrão, acompanha mudanças ao vivo). Movimento: sistema ou redução manual. Texto: padrão, maior e muito maior. `Restaurar padrão` retorna às preferências do sistema. Seleções ficam em `noponto-site-preferences`, apenas neste navegador/site; armazenamento bloqueado não impede uso. O script inicial em `index.html` aplica as preferências antes da renderização; `src/preferences.ts` valida os valores e `src/SitePreferences.tsx` acompanha mudanças do sistema. Não afeta o Android. O QR mantém fundo branco nos dois temas.

Os ícones dos modais são distintos: ônibus e trem Lucide; BRT articulado e metrô com túnel em SVG próprio. Microanimações curtas aparecem somente ao interagir com localização, sino do Radar, trajeto, perfil e download. Tanto o sistema quanto a preferência manual removem movimentos decorativos. Alto contraste adicional não foi introduzido; os dois temas têm foco e contraste próprios.

Validação V2: `npm test` (17 casos), `npm run build`, Edge/Playwright nas larguras 360/390/768/1440 nos dois temas, maior tamanho de texto nas quatro larguras, persistência após recarga, mudanças de sistema ao vivo, restauração, menu mobile e galeria/Escape. Capturas comparativas locais `qa-before-*.png`, `qa-v2-light-*.png`, `qa-v2-dark-*.png` e `qa-v2-large-*.png` são ignoradas pelo Git. Para visualizar: `npm ci`, `npm run dev`, abra a URL informada e use o botão de ajustes. O workflow continua restrito a push na main; esta branch não substitui a publicação antes do merge aprovado.
