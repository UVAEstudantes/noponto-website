import { useEffect, useRef, useState } from "react";
import { Settings2, X } from "lucide-react";
import {
  applyPreferences,
  defaults,
  readPreferences,
  savePreferences,
  type Preferences as Values,
} from "./preferences";
export function Preferences() {
  const [value, setValue] = useState(readPreferences);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dark = matchMedia("(prefers-color-scheme: dark)"),
      motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => applyPreferences(value, dark.matches, motion.matches);
    update();
    savePreferences(value);
    dark.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      dark.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, [value]);
  const select = (
    key: keyof Values,
    label: string,
    options: [string, string][],
  ) => (
    <label className="preference-field">
      {label}
      <select
        aria-label={label}
        value={value[key]}
        onChange={(e) => setValue({ ...value, [key]: e.target.value })}
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <>
      <button
        className="preferences-trigger"
        aria-label="Personalizar aparência e acessibilidade"
        onClick={() => dialog.current?.showModal()}
      >
        <Settings2 size={20} />
      </button>
      <dialog
        className="preferences-dialog"
        ref={dialog}
        aria-labelledby="preferences-title"
      >
        <div className="preferences-heading">
          <h2 id="preferences-title">Do seu jeito.</h2>
          <button
            aria-label="Fechar preferências"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <p>Preferências deste site. Elas não alteram o aplicativo Android.</p>
        {select("theme", "Aparência", [
          ["light", "Claro"],
          ["dark", "Escuro"],
          ["system", "Sistema"],
        ])}
        {select("motion", "Movimento", [
          ["system", "Seguir o sistema"],
          ["reduce", "Reduzir animações"],
        ])}
        {select("text", "Tamanho do texto", [
          ["standard", "Padrão"],
          ["large", "Maior"],
          ["larger", "Muito maior"],
        ])}
        <button
          className="button secondary"
          onClick={() => setValue({ ...defaults })}
        >
          Restaurar padrão
        </button>
      </dialog>
    </>
  );
}
