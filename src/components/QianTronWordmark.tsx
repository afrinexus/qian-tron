import wordmark from "@/assets/qiantron-wordmark.png.asset.json";

type Props = {
  className?: string;
  /** Kept for backward compat. Ignored — the wordmark is now an image asset. */
  accent?: string;
  title?: string;
};

/**
 * QIANTRON wordmark — brand image asset with an accessible label.
 */
export function QianTronWordmark({ className, title = "QIANTRON" }: Props) {
  return (
    <img
      src={wordmark.url}
      alt={title}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
