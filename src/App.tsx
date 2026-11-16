import { Preferences } from "./SitePreferences";
import { Routines, Profile } from "./Editorial";
import { BrtIcon, MetroIcon } from "./ModalIcons";
import { Gallery } from "./Gallery";
import { DownloadPanel, History } from "./Downloads";
import { DownloadLink, Eyebrow } from "./ui";
import { useState, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Menu,
  X,
  MapPin,
  Route,
  BellRing,
  Heart,
  BusFront,
  TrainFront,
  Radio,
  ChevronRight,
  Check,
  Volume2,
  Github,
  ArrowRight,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Markdown from "react-markdown";
import { asset, links, screenshots, future } from "./content";
import { date, size, type Release } from "./releases";
import { useReleases } from "./useReleases";
function Phone({
  id,
  alt,
  priority = false,
}: {
  id: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="phone">
      <img
        src={asset(`${id}.webp`)}
        alt={alt}
        width="540"
        height="1200"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
function Header({ release }: { release?: Release }) {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <a className="brand" href="#inicio" aria-label="NoPonto, início">
        <img src={asset("logo.webp")} width="40" height="40" alt="" />
        NoPonto
      </a>
      <button
        className="menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <Preferences />
      <nav
        id="navigation"
        className={open ? "open" : ""}
        onClick={() => setOpen(false)}
      >
        <a href="#funcionalidades">Funcionalidades</a>
        <a href="#rotinas">Rotinas</a>
        <a href="#perfil">Perfil</a>
        <a href="#aplicativo">O aplicativo</a>
        <a href="#novidades">Novidades</a>
        <a href="#codigo">Código aberto</a>
        <DownloadLink release={release} />
      </nav>
    </header>
  );
}
function Hero({ release }: { release?: Release }) {
  return (
    <section id="inicio" className="hero wrap">
      <div className="hero-copy">
        <Eyebrow>FEITO PARA QUEM MOVE O RIO</Eyebrow>
        <h1>
          O transporte
          <br />
          do Rio, mais
          <br />
          <span>perto de você.</span>
        </h1>
        <p className="lead">
          Menos incerteza no ponto.
          <br />
          Mais cidade no seu caminho.
        </p>
        <p className="hero-description">
          Linhas, veículos, paradas e estimativas de chegada. O NoPonto aproxima
          as informações que você precisa para se movimentar.
        </p>
        <div className="actions">
          <DownloadLink release={release} />
          <a className="text-link" href="#aplicativo">
            Conhecer o app <ArrowDown size={17} />
          </a>
        </div>
        <p className="small muted">
          Disponível atualmente para Android · Versão Beta
        </p>
      </div>
      <div className="hero-stage">
        <svg
          className="route-art"
          viewBox="0 0 650 760"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="route-shadow"
            d="M-80 600H80Q130 600 130 550V160Q130 90 200 90H470Q540 90 540 160V620Q540 680 600 680H750"
          />
          <path
            className="route-line"
            d="M-80 600H80Q130 600 130 550V160Q130 90 200 90H470Q540 90 540 160V620Q540 680 600 680H750"
          />
          <circle
            cx="130"
            cy="410"
            r="13"
            fill="#faf9f4"
            stroke="#FFC107"
            strokeWidth="7"
          />
          <circle
            cx="540"
            cy="310"
            r="13"
            fill="#faf9f4"
            stroke="#FFC107"
            strokeWidth="7"
          />
        </svg>
        <div className="orbit-label">
          <span className="live-dot" /> Seu próximo movimento começa aqui.
        </div>
        <div className="hero-phone">
          <Phone
            id="004"
            alt="Mapa real do NoPonto com itinerários e veículos no Rio"
            priority
          />
        </div>
        <div className="floating arrival">
          <span className="icon-tile">
            <MapPin className="animate-pin" size={21} />
          </span>
          <div>
            <strong>O seu ponto de partida.</strong>
            <small>A cidade cabe no seu bolso.</small>
          </div>
        </div>
        <div className="floating radar-chip">
          <Radio size={21} />
          <div>
            <strong>Radar de Espera</strong>
            <small>Acompanhe sem olhar o mapa.</small>
          </div>
          <span className="live-dot" />
        </div>
        <span className="stage-caption">TELA REAL DO APLICATIVO ↗</span>
      </div>
      <a className="scroll-cue" href="#modais">
        <span>PRÓXIMA PARADA: UMA CIDADE CONECTADA</span>
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
function Modals() {
  const items = [
    [
      "01",
      "Ônibus",
      "Itinerários, paradas, veículos e chegadas conforme os dados disponíveis.",
      BusFront,
      "Disponível",
    ],
    [
      "02",
      "BRT",
      "Linhas e acompanhamento sujeitos à integração de cada fonte.",
      BrtIcon,
      "Integração parcial",
    ],
    [
      "03",
      "Trem",
      "Ramais, estações e dados operacionais. Posições podem ser inferidas.",
      TrainFront,
      "Cobertura parcial",
    ],
    [
      "04",
      "Metrô",
      "Parte da proposta multimodal. Integração operacional em evolução.",
      MetroIcon,
      "Em evolução",
    ],
  ] as const;
  return (
    <section id="modais" className="modals">
      <div className="wrap">
        <div className="section-heading">
          <Eyebrow>VÁRIOS CAMINHOS. UM SÓ LUGAR.</Eyebrow>
          <h2>
            O Rio não se move
            <br />
            de um jeito só.
          </h2>
          <p>
            Uma experiência que conecta diferentes transportes, respeitando o
            que cada fonte consegue oferecer.
          </p>
        </div>
        <div className="modal-grid">
          {items.map(([n, title, description, Icon, status]) => (
            <article key={title}>
              <div className="modal-top">
                <span>{n}</span>
                <Icon size={30} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className={`status status-${n}`}>{status}</span>
            </article>
          ))}
        </div>
        <p className="small muted coverage">
          Informações e estimativas dependem das fontes. Cobertura e atualização
          variam entre os modais.
        </p>
      </div>
    </section>
  );
}
function Features() {
  return (
    <section id="funcionalidades" className="wrap features">
      <div className="section-heading">
        <Eyebrow>INFORMAÇÃO QUE VAI COM VOCÊ</Eyebrow>
        <h2>
          Do “será que vem?”
          <br />
          ao “já está chegando”.
        </h2>
      </div>
      <div className="feature-layout">
        <div className="feature-visual">
          <Phone
            id="002"
            alt="Próximas chegadas das linhas 855 e 838 na parada Fragoso"
          />
          <span className="visual-note">
            <MapPin size={16} /> O ponto certo para começar.
          </span>
        </div>
        <div className="feature-list">
          {[
            [
              MapPin,
              "01",
              "A cidade, na sua mão",
              "Explore o mapa, veja itinerários, sentidos, veículos e detalhes operacionais.",
            ],
            [
              Route,
              "02",
              "Sua linha. Seu sentido.",
              "Consulte linhas e paradas, descubra as opções do seu caminho e salve suas favoritas.",
            ],
            [
              Radio,
              "03",
              "Uma espera mais informada",
              "Veja as próximas aproximações na parada, com estimativas quando disponíveis.",
            ],
            [
              Heart,
              "04",
              "Um app com o seu ritmo",
              "Temas claro e escuro, perfil local e tutorial interativo para chegar junto desde o primeiro uso.",
            ],
          ].map(([Icon, n, title, body]) => {
            const I = Icon as typeof MapPin;
            return (
              <article key={String(n)}>
                <span className="feature-icon">
                  <I size={23} />
                </span>
                <div>
                  <span className="small muted">
                    {String(n)} / NO SEU DIA A DIA
                  </span>
                  <h3>{String(title)}</h3>
                  <p>{String(body)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Radar() {
  return (
    <section className="radar-section">
      <div className="wrap radar-layout">
        <div>
          <Eyebrow>RADAR DE ESPERA</Eyebrow>
          <h2>
            Olhe para a cidade.
            <br />
            <span>A gente te avisa.</span>
          </h2>
          <p className="lead">
            Sua linha se aproxima.
            <br />O aviso acompanha você.
          </p>
          <p>
            Selecione as linhas de uma parada e escolha a antecedência dos
            avisos. O Radar acompanha as chegadas com notificações Android e
            recursos de voz, sem exigir que você fique olhando o mapa o tempo
            todo.
          </p>
          <ul className="check-list">
            <li>
              <Check />
              Escolha as linhas que importam
            </li>
            <li>
              <Check />
              Ajuste quando quer receber o aviso
            </li>
            <li>
              <Check />
              Controle o Radar pela notificação
            </li>
          </ul>
          <p className="small muted">
            Disponível para testes no Android. Depende de conexão, permissões,
            configuração do aparelho e previsões disponíveis.
          </p>
        </div>
        <div className="radar-visual">
          <div className="radar-rings" aria-hidden="true" />
          <div className="radar-setup">
            <Phone
              id="003"
              alt="Configuração do Radar de Espera com linhas e antecedência"
            />
          </div>
          <div className="notification-stack">
            <span className="notification-label">
              <BellRing className="animate-bell" size={16} /> O AVISO CHEGA ATÉ
              VOCÊ
            </span>
            <img
              src={asset("011.webp")}
              width="1080"
              height="260"
              loading="lazy"
              alt="Notificação compacta do Radar com as linhas 838 e 855"
            />
            <img
              src={asset("012.webp")}
              width="1080"
              height="650"
              loading="lazy"
              alt="Notificação expandida: chegadas e ações Parar radar e Silenciar voz"
            />
            <span className="small">
              <Volume2 size={14} /> Também com avisos por voz.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Future() {
  return (
    <section className="future">
      <div className="wrap future-layout">
        <div className="future-heading">
          <Eyebrow>O CAMINHO CONTINUA</Eyebrow>
          <h2>
            A próxima parada
            <br />é só o começo.
          </h2>
          <p>
            O NoPonto está em construção. Estas são direções que queremos
            explorar, sem datas prometidas ou recursos apresentados como
            prontos.
          </p>
          <span className="planned">EM DESENVOLVIMENTO / PLANEJADO</span>
        </div>
        <div className="future-stops">
          {future.map(([title, description], i) => (
            <article key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Code() {
  return (
    <section id="codigo" className="code-section">
      <div className="wrap">
        <div className="code-heading">
          <div>
            <Eyebrow>ABERTO PARA IR ALÉM</Eyebrow>
            <h2>
              Feito de código.
              <br />
              Movido por propósito.
            </h2>
          </div>
          <div>
            <p>
              Da universidade para as ruas: tecnologia para tornar o transporte
              do Rio mais compreensível. Conheça como o NoPonto é construído e
              acompanhe sua evolução.
            </p>
            <a className="text-link" href={links.org}>
              Conheça a organização <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="repo-links">
          <a href={links.frontend}>
            <Github />
            <div>
              <small>O APLICATIVO</small>
              <h3>noponto-frontend</h3>
              <p>React Native · Expo · TypeScript</p>
            </div>
            <ArrowUpRight />
          </a>
          <a href={links.backend}>
            <Github />
            <div>
              <small>OS BASTIDORES</small>
              <h3>noponto-backend</h3>
              <p>ASP.NET Core · PostgreSQL/PostGIS · Redis · SignalR</p>
            </div>
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
export default function App() {
  const { releases, loading, error } = useReleases();
  const release = releases[0];
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header release={release} />
      <main id="conteudo">
        <Hero release={release} />
        <Modals />
        <Features />
        <Radar />
        <Routines />
        <Profile />
        <Gallery />
        <Future />
        <DownloadPanel release={release} loading={loading} error={error} />
        <History releases={releases} loading={loading} error={error} />
        <Code />
      </main>
      <footer className="wrap">
        <div className="footer-top">
          <a className="brand" href="#inicio">
            <img src={asset("logo.webp")} width="40" height="40" alt="" />
            NoPonto
          </a>
          <p>
            O transporte do Rio,
            <br />
            mais perto de você.
          </p>
          <a href={links.org}>
            GitHub <ArrowUpRight size={16} />
          </a>
          <a href="#download">
            Baixar o aplicativo <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            Nascido como TCC de Ciência da Computação da Universidade Veiga de
            Almeida.
            <br />
            Um projeto em evolução, para além de sua origem acadêmica.
          </p>
          <span>FEITO PARA O RIO. EM MOVIMENTO.</span>
        </div>
      </footer>
    </>
  );
}
