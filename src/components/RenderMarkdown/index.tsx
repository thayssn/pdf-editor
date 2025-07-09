import { Accessor, createEffect, createMemo } from "solid-js";
import "./RenderMarkdown.scss";
import { formatTags, renderCode, renderCSV } from "./helpers";

export default function RenderMarkdown({
  content,
}: {
  content: Accessor<string>;
}) {
  const newContent = createMemo(() => {
    const renderedCSV = renderCSV(content());
    const renderedCode = renderCode(renderedCSV);
    return formatTags(renderedCode);
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
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(ref?.innerHTML ?? "");
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div class="preview-pane-wrapper">
      <button onClick={() => handlePrint()}>Print</button>
      <div class="preview-pane" ref={ref} />
    </div>
  );
}
