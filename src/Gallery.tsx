import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Maximize2, X } from "lucide-react";
import maximize2 from "react-useanimations/lib/maximize2";
import { AnimatedHover } from "./AnimatedIcon";
import { asset, screenshots } from "./content";
import { Eyebrow } from "./ui";
import { placePreview } from "./galleryLayout";

type Preview = ReturnType<typeof placePreview> & {
  index: number;
  closing: boolean;
};

export function Gallery() {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<Preview | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const dismissPreview = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setPreview(null);
  }, []);

  const closePreview = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setPreview((current) =>
      current && !current.closing ? { ...current, closing: true } : current,
    );
    closeTimer.current = window.setTimeout(() => setPreview(null), 170);
  }, []);

  useEffect(() => {
    if (!preview) return;
    const hide = () => closePreview();
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, [preview, closePreview]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openPreview = (
    event: React.PointerEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (
      event.pointerType !== "mouse" ||
      document.documentElement.dataset.motion === "reduce"
    )
      return;
    const image = event.currentTarget.querySelector<HTMLElement>(
      ".gallery-image",
    );
    if (!image) return;
    const id = screenshots[index][0];
    // shortcut: only 011/012 are wide; use naturalWidth if more wide shots arrive.
    const ratio =
      id === "011" ? 260 / 1080 : id === "012" ? 650 / 1080 : 1200 / 540;
    const rect = image.getBoundingClientRect();
    window.clearTimeout(closeTimer.current);
    setPreview({
      index,
      closing: false,
      ...placePreview(
        { top: rect.top, bottom: rect.bottom, left: rect.left, width: rect.width },
        { width: window.innerWidth, height: window.innerHeight },
        ratio,
      ),
    });
  };

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
          <AnimatedHover
            key={id}
            animation={maximize2}
            interaction="hover-replay"
            size={20}
            fallback={<Maximize2 size={20} />}
          >
            {(icon, eventProps) => (
              <button
                {...eventProps}
                className={`gallery-item ${Number(id) > 10 ? "wide-shot" : ""}`}
                onPointerEnter={(event) => {
                  eventProps.onPointerEnter?.(event);
                  openPreview(event, i);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") closePreview();
                }}
                onClick={() => {
                  dismissPreview();
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
                  <span>{icon}</span>
                </div>
                <span className="gallery-index">
                  {String(i + 1).padStart(2, "0")} / APLICATIVO
                </span>
                <strong>{title}</strong>
                <p>{description}</p>
              </button>
            )}
          </AnimatedHover>
        ))}
      </div>
      <div className="gallery-bottom">
        <span>DESLIZE PARA EXPLORAR</span>
        <ArrowRight size={20} />
      </div>
      {preview &&
        createPortal(
          <div
            className={`gallery-preview ${preview.closing ? "closing" : ""}`}
            style={{
              left: preview.left,
              top: preview.top,
              width: preview.width,
            }}
            aria-hidden="true"
          >
            <img
              src={asset(`${screenshots[preview.index][0]}.webp`)}
              alt=""
              draggable={false}
            />
            <span className="gallery-preview-hint">
              <Maximize2 size={13} /> AMPLIAR
            </span>
          </div>,
          document.body,
        )}
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
