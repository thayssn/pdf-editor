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
    if (!printWindow) return;

    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch {
          return "";
        }
      })
      .join("\n");

    const content = ref?.innerHTML || "";

    printWindow.document.write(`
      <html>
        <head>
          <style>${styles}</style>
        </head>
        <body>
          <div id="printable-area" class="preview-pane">
            ${content}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div class="preview-pane-wrapper">
      <button onClick={() => handlePrint()}>Print</button>
      <div class="preview-pane" id="printable-area" ref={ref} />
    </div>
  );
}
