import { useRef } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function AppInfoModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="absolute bottom-0 m-3">
        <button
          className="btn glass btn-sm btn-circle"
          onClick={() => modalRef.current && modalRef.current.showModal()}
        >
          <InformationCircleIcon className="h-full" />
        </button>
      </div>

      <dialog id="my_modal_2" className="modal" ref={modalRef}>
        <div className="modal-box">
          <div className="flex justify-center">
            <img
              src="/android-chrome-192x192.png"
              alt="Translate Reader Logo"
            />
          </div>

          <h3 className="font-bold text-lg">About</h3>

          <p className="my-5">
            Welcome to the Arabic Reading Assistant. A tool to help intermediate
            and advanced Arabic students read and understand texts with greater
            ease.
          </p>

          <p className="my-5">
            It was built by me,&nbsp;
            <a className="link" href="https://rua-iri.com" target="_blank">
              Rory McGuigan
            </a>
            , and was inspired by the kind of tool I always wished I had while
            studying at university.
          </p>

          <p className="my-5">
            The full source code can be found in my&nbsp;
            <a
              className="link"
              href="https://github.com/rua-iri/AraDictImproved"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub repository.
            </a>
          </p>

          <p className="my-5">
            If you notice anything wrong with the site or would like a new
            feature introduced, please report it as{" "}
            <a
              href="https://github.com/rua-iri/AraDictImproved/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              an issue
            </a>
            .
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
