import { useState, useRef } from "react";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { asset, screenshots } from "./content";
import { Eyebrow } from "./ui";
export function Gallery() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <section id="aplicativo" className="gallery wrap">
      <div className="gallery-heading">
        <div>
          <Eyebrow>SEM FILTRO. É O APP MESMO.</Eyebrow>
          <h2>Conheça por dentro.</h2>
        </div>
        <p>
          Explore as telas reais do NoPonto.
          <br />
          Toque em uma imagem para ver de perto.
        </p>
      </div>
      <div className="gallery-track">
        {screenshots.map(([id, title, description], i) => (
          <button
            className={`gallery-item ${Number(id) > 10 ? "wide-shot" : ""}`}
            key={id}
            onClick={() => {
              setSelected(i);
              dialog.current?.showModal();
            }}
            aria-label={`Ampliar: ${title}`}
          >
            <div className="gallery-image">
              <img
                src={asset(`${id}.webp`)}
                width="540"
                height="1200"
                loading="lazy"
                alt={description}
              />
              <span>
                <ArrowUpRight size={20} />
              </span>
            </div>
            <span className="gallery-index">
              {String(i + 1).padStart(2, "0")} / APLICATIVO
            </span>
            <strong>{title}</strong>
            <p>{description}</p>
          </button>
        ))}
      </div>
      <div className="gallery-bottom">
        <span>DESLIZE PARA EXPLORAR</span>
        <ArrowRight size={20} />
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Galeria de telas do aplicativo"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="close-dialog"
          onClick={() => dialog.current?.close()}
          aria-label="Fechar imagem"
        >
          <X />
        </button>
        <img
          src={asset(`${screenshots[selected][0]}.webp`)}
          alt={screenshots[selected][2]}
        />
        <p>
          {screenshots[selected][1]} — {screenshots[selected][2]}
        </p>
        <div className="lightbox-controls">
          <button
            onClick={() =>
              setSelected(
                (selected + screenshots.length - 1) % screenshots.length,
              )
            }
          >
            Anterior
          </button>
          <button
            onClick={() => setSelected((selected + 1) % screenshots.length)}
          >
            Próxima
          </button>
        </div>
      </dialog>
    </section>
  );
}
