"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p style={{ margin: "1rem 0", color: "#666" }}>{error.message}</p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1.5rem",
          background: "#003d7a",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
