import {
  Route,
  Footprints,
  BusFront,
  ArrowRightLeft,
  MapPin,
  Heart,
  UserRound,
  Flag,
} from "lucide-react";
import { asset } from "./content";
import { Eyebrow } from "./ui";
export function Routines() {
  return (
    <section id="rotinas" className="editorial routines wrap">
      <div className="editorial-copy">
        <Eyebrow>TODO DIA, UM CAMINHO</Eyebrow>
        <h2>Seu caminho não termina no ponto.</h2>
        <p className="lead">
          O NoPonto quer acompanhar mais do que a sua espera. Quer fazer parte
          do caminho inteiro.
        </p>
        <p>
          Ir para a faculdade. Voltar do trabalho. Reencontrar a cidade no
          trajeto de sempre. A ideia das Rotinas é conectar o primeiro passo à
          última parada.
        </p>
        <div className="editorial-now">
          <span className="tag">HOJE · PRÉVIA DEMONSTRATIVA</span>
          <h3>Um primeiro olhar para a jornada.</h3>
          <p>
            A tela atual permite experimentar a configuração de origem, destino,
            dias e horários, salva localmente. As etapas de caminhada, embarque
            e integração são ilustrativas: ainda não há planejamento multimodal
            nem acompanhamento operacional completo.
          </p>
        </div>
        <div className="editorial-next">
          <Route className="animate-route" />
          <div>
            <span className="small">VISÃO FUTURA</span>
            <h3>Do primeiro passo até a última parada.</h3>
            <p>
              Planejar caminhos com transporte e caminhada; entender onde
              embarcar, integrar e descer. Receber orientações da próxima etapa,
              com a proposta de conectar Radar, notificações e voz aos trajetos
              habituais.
            </p>
            <p>
              Alternativas de caminho, acessibilidade e colaboração também fazem
              parte dessa direção. Sem datas de lançamento prometidas.
            </p>
          </div>
        </div>
      </div>
      <div className="editorial-art">
        <div className="editorial-phone">
          <img
            src={asset("009.webp")}
            width="540"
            height="1200"
            loading="lazy"
            alt="Tela real de Rotinas: uma prévia demonstrativa dos deslocamentos habituais"
          />
        </div>
        <div className="journey">
          <span className="small">
            EXEMPLO CONCEITUAL · NÃO É UMA ROTA CALCULADA
          </span>
          <ol>
            {[
              [Footprints, "Primeiro passo"],
              [BusFront, "Embarque"],
              [ArrowRightLeft, "Integração"],
              [MapPin, "Seu destino"],
            ].map(([Icon, title]) => {
              const I = Icon as typeof Route;
              return (
                <li key={String(title)}>
                  <I size={20} />
                  <span>{String(title)}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
export function Profile() {
  return (
    <section id="perfil" className="profile-section">
      <div className="wrap editorial profile-layout">
        <div className="profile-art">
          <div className="editorial-phone">
            <img
              src={asset("005.webp")}
              width="540"
              height="1200"
              loading="lazy"
              alt="Perfil real do NoPonto com avatar, personalização local e favoritos"
            />
          </div>
          <figure className="stats-preview">
            <img
              src={asset("006.webp")}
              width="540"
              height="1200"
              loading="lazy"
              alt="Tela de estatísticas ilustrativas do aplicativo, sem histórico real de viagens"
            />
            <figcaption>
              ESTATÍSTICAS DEMONSTRATIVAS
              <br />
              Não representam viagens registradas.
            </figcaption>
          </figure>
        </div>
        <div className="editorial-copy">
          <Eyebrow>SEU CAMINHO TEM HISTÓRIA</Eyebrow>
          <h2>A cidade faz parte da sua história.</h2>
          <p className="lead">
            Cada linha, cada trajeto e cada descoberta fazem parte da forma como
            você vive o Rio.
          </p>
          <div className="editorial-now">
            <span className="tag">HOJE · PERFIL LOCAL, SEM CRIAR CONTA</span>
            <h3>Um app com a sua marca.</h3>
            <p>
              Personalize seu nome e a cor do avatar com iniciais, acesse suas
              linhas favoritas e deixe o NoPonto mais seu. A interface de
              estatísticas é demonstrativa: não há um histórico real de viagens
              por trás desses números.
            </p>
          </div>
          <div className="profile-visions">
            <span className="small">O QUE QUEREMOS EXPLORAR</span>
            <article>
              <UserRound className="animate-profile" />
              <div>
                <h3>Sua mobilidade em perspectiva.</h3>
                <p>
                  Histórico pessoal e estatísticas reais de tempo, distância,
                  linhas, deslocamentos e modais. Uma retrospectiva para
                  revisitar e, quem sabe, compartilhar seus caminhos.
                </p>
              </div>
            </article>
            <article>
              <Flag />
              <div>
                <h3>Experiências que se conectam.</h3>
                <p>
                  Conquistas e insígnias leves, sem transformar viagens em
                  competição. Relatos e colaboração sobre linhas, paradas e
                  estações para ajudar outros passageiros.
                </p>
              </div>
            </article>
          </div>
          <p className="privacy-note">
            <Heart size={18} />
            Essa visão ainda depende de implementação, consentimento e controles
            de privacidade. Não significa que o app já registre automaticamente
            seus deslocamentos.
          </p>
        </div>
      </div>
    </section>
  );
}
