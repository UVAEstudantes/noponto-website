import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Moon, Settings2, Sun, X } from "lucide-react";
import settingsAnimation from "react-useanimations/lib/settings";
import moonAnimation from "react-useanimations/lib/moon";
import sunAnimation from "react-useanimations/lib/sun";
import { AnimatedHover } from "./AnimatedIcon";
import {
  applyPreferences,
  defaults,
  readPreferences,
  savePreferences,
  type Preferences as Values,
} from "./preferences";

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function Preferences() {
  const [value, setValue] = useState(readPreferences);
  const dialog = useRef<HTMLDialogElement>(null);
  const dark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
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
  const toggleTheme = () =>
    setValue((current) => ({
      ...current,
      theme: dark ? "light" : "dark",
    }));
  return (
    <>
      <div className="preferences-actions">
        <AnimatedHover
          animation={dark ? sunAnimation : moonAnimation}
          interaction="hover-replay"
          size={20}
          fallback={dark ? <Sun size={20} /> : <Moon size={20} />}
        >
          {(icon, eventProps) => (
            <button
              {...eventProps}
              className="theme-trigger"
              aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
              title={dark ? "Ativar tema claro" : "Ativar tema escuro"}
              onClick={toggleTheme}
            >
              {icon}
            </button>
          )}
        </AnimatedHover>
        <AnimatedHover
          animation={settingsAnimation}
          interaction="hover"
          size={20}
          fallback={<Settings2 size={20} />}
        >
          {(icon, eventProps) => (
            <button
              {...eventProps}
              className="preferences-trigger"
              aria-label="Personalizar aparência e acessibilidade"
              onClick={() => dialog.current?.showModal()}
            >
              {icon}
            </button>
          )}
        </AnimatedHover>
      </div>
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
