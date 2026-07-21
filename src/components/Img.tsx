import NextImage, { type ImageProps } from "next/image";

// With `output: export` + `unoptimized`, next/image does not prepend basePath
// to the src. When the site is hosted under a sub-path (GitHub project pages),
// prefix absolute "/images/..." sources with the configured base path.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Img({ src, ...props }: ImageProps) {
  const resolved =
    typeof src === "string" && src.startsWith("/") ? `${BASE_PATH}${src}` : src;
  return <NextImage src={resolved} {...props} />;
}
