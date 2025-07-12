import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  onMount,
  Show,
} from "solid-js";
import {
  cleanMultiline,
  formatToHTML,
  getPrintableContent,
  renderCode,
  renderCSV,
} from "./helpers";
import { toast } from "solid-toast";
import "./RenderMarkdown.scss";

export default function RenderMarkdown({
  content,
}: {
  content: Accessor<string>;
}) {
  const newContent = createMemo(() => {
    const renderedCSV = renderCSV(cleanMultiline(content()));
    const renderedCode = renderCode(renderedCSV);
    return formatToHTML(renderedCode);
  });

  let ref: HTMLDivElement | undefined;

  createEffect(() => {
    if (ref) {
      const formattedHTMLContent = document.createElement("div");
      formattedHTMLContent.innerHTML = newContent();
      ref.replaceChildren(formattedHTMLContent);
    }
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast.error("Not implemented yet");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [hitBottom, setHitBottom] = createSignal(false);

  onMount(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight) {
        setHitBottom(true);
      } else {
        setHitBottom(false);
      }
    });
  });

  return (
    <div class="print-page-wrapper">
      <div class="print-page-header">
        <button onClick={() => handlePrint()}>Print</button>
        <button onClick={() => handleDownloadPDF()}>Download </button>
      </div>
      <div class="print-page-container" id="printable-area">
        <div class="print-page" ref={ref} />
      </div>
      <Show when={hitBottom()}>
        <button onClick={() => scrollToTop()} class="scroll-to-top">
          TOP
        </button>
      </Show>
    </div>
  );
}
