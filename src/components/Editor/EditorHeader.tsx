import { Format, formatOptions } from "./helpers";
import "./EditorHeader.scss";

export default function EditorHeader({
  onClickToFormat,
  onClickToSave,
}: {
  onClickToFormat: (format: Format) => void;
  onClickToSave: () => void;
}) {
  return (
    <div class="editor-header">
      {formatOptions.map((option) => (
        <button
          onClick={() => {
            onClickToFormat(option.format);
          }}
        >
          {option.label}
        </button>
      ))}
      <button onClick={onClickToSave}>Salvar</button>
    </div>
  );
}
