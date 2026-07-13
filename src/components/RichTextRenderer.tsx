import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export default function RichTextRenderer({ content }: Props) {
  return (
    <div role="article">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
