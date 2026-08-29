import { useRef } from "react";
import OptionsMenu from "./Modals/OptionsMenu.js";
import CustomButton from "./CustomButton.js";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function TitleHeader() {
  const optionsRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <header className="w-full bg-neutral text-neutral-content rounded-b-lg mb-2 lg:mb-10">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <img
              src="/android-chrome-192x192.png"
              alt="Arabic Reading Assistant logo"
              className="h-12 w-12 rounded-lg bg-neutral-content p-1"
            />
            <div>
              <h1 className="text-2xl font-serif tracking-wide leading-tight">
                Arabic Reading Assistant
              </h1>
              <p className="text-sm text-neutral-content/70 tracking-widest mt-0.5">
                مساعد القراءة العربية
              </p>
            </div>
          </div>
          <CustomButton
            textContent="Options"
            icon={<Cog6ToothIcon className="h-5 w-5" />}
            style="btn btn-primary btn-sm"
            handleClick={() => {
              if (optionsRef.current) optionsRef.current.showModal();
            }}
          />
        </div>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />
      </header>

      <OptionsMenu optionsRef={optionsRef} />
    </>
  );
}
