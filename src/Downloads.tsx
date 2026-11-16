import { Download, ArrowUpRight, ArrowDown, ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Markdown from "react-markdown";
import { links } from "./content";
import { date, size, type Release } from "./releases";
import { DownloadLink, Eyebrow } from "./ui";
export function DownloadPanel({
  release,
  loading,
  error,
}: {
  release?: Release;
  loading: boolean;
  error: string;
}) {
  return (
    <section id="download" className="download-section wrap">
      <div className="download-card">
        <div className="download-copy">
          <Eyebrow>PRÓXIMA PARADA: SEU CELULAR</Eyebrow>
          <h2>
            Leve o NoPonto
            <br />
            com você.
          </h2>
          <p>
            Disponível como APK para Android.
            <br />
            Ainda fora da Play Store, já perto do seu caminho.
          </p>
          {loading ? (
            <p role="status">Consultando a versão mais recente…</p>
          ) : release ? (
            <>
              <div className="release-meta">
                <span className="beta">
                  {release.beta ? "BETA" : "VERSÃO PÚBLICA"}
                </span>
                <strong>{release.name}</strong>
                <span>
                  {date(release.published)} · {size(release.apk.size)}
                </span>
              </div>
              <DownloadLink release={release} />
              <a className="text-link" href={release.url}>
                Notas desta versão <ArrowUpRight size={16} />
              </a>
              <details className="current-notes">
                <summary>O que há de novo</summary>
                <div className="markdown">
                  <Markdown skipHtml>{release.body}</Markdown>
                </div>
              </details>
            </>
          ) : (
            <div className="api-error" role="status">
              <strong>Vamos encontrar seu download.</strong>
              <p>
                {error || "Nenhum APK válido foi encontrado no momento."} Acesse
                as publicações oficiais para conferir a disponibilidade.
              </p>
              <a className="button" href={links.releases}>
                Ver versões no GitHub <ArrowUpRight size={18} />
              </a>
            </div>
          )}
          <p className="small">
            Versão em testes: dados e funcionalidades podem apresentar
            limitações.
          </p>
        </div>
        <div className="qr-area">
          {release ? (
            <>
              <div className="qr-frame">
                <QRCodeSVG
                  value={release.apk.url}
                  size={200}
                  level="M"
                  marginSize={4}
                  title={`Baixar ${release.name} para Android`}
                />
              </div>
              <strong>Do computador para o seu Android.</strong>
              <p>
                Aponte a câmera do celular
                <br />
                para baixar este mesmo APK.
              </p>
              <a href={release.apk.url}>
                Abrir link do APK <ArrowUpRight size={14} />
              </a>
            </>
          ) : (
            <div className="qr-placeholder">
              <Download size={48} />
              <p>
                O QR Code aparece quando
                <br />
                um APK válido está disponível.
              </p>
            </div>
          )}
          <a className="history-link" href="#novidades">
            Procurando uma versão anterior? <ArrowDown size={16} />
          </a>
        </div>
      </div>
      <div className="install-guide">
        <span className="install-number">i</span>
        <div>
          <h3>Como instalar com tranquilidade</h3>
          <p>
            Baixe o APK no Android e abra o arquivo. Se o sistema solicitar,
            permita a instalação por este navegador apenas para concluir a
            instalação e depois revogue a permissão. Mantenha as proteções do
            Android ativas. Em outros sistemas, conheça o app aqui e compartilhe
            o link com seu celular Android.
          </p>
        </div>
      </div>
    </section>
  );
}
export function History({
  releases,
  loading,
  error,
}: {
  releases: Release[];
  loading: boolean;
  error: string;
}) {
  return (
    <section id="novidades" className="history wrap">
      <div className="section-heading">
        <Eyebrow>CADA VERSÃO, UM NOVO TRECHO</Eyebrow>
        <h2>O NoPonto em movimento.</h2>
        <p>Veja o que mudou nas publicações anteriores.</p>
      </div>
      <div className="release-list">
        {releases.slice(1).map((r) => (
          <details key={r.id}>
            <summary>
              <span className="timeline-dot" />
              <span className="history-title">
                <strong>{r.name}</strong>
                <small>{date(r.published)}</small>
              </span>
              <span className="tag">{r.beta ? "Beta" : "Pública"}</span>
              <ChevronRight size={20} />
            </summary>
            <div className="history-body">
              <div className="markdown">
                <Markdown skipHtml>
                  {r.body || "Consulte os detalhes desta publicação no GitHub."}
                </Markdown>
              </div>
              <div className="actions">
                <a className="button secondary" href={r.apk.url}>
                  <Download size={16} />
                  Baixar APK · {size(r.apk.size)}
                </a>
                <a href={r.url}>
                  Ver no GitHub <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </details>
        ))}
      </div>
      {!loading && releases.length < 2 && (
        <p>
          {error
            ? "Histórico temporariamente indisponível."
            : "As versões anteriores aparecerão aqui quando estiverem disponíveis."}
        </p>
      )}
      <a className="text-link" href={links.releases}>
        Todas as publicações no GitHub <ArrowUpRight size={17} />
      </a>
    </section>
  );
}
