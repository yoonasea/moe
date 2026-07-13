interface Props {
  html: string;
}

export default function RichTextRenderer({ html }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      role="article"
    />
  );
}
