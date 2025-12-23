import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HMIF ITATS",
    short_name: "HMIF",
    description: "Website resmi Himpunan Mahasiswa Informatika ITATS.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    icons: [
      {
        src: "/hmif.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/hmif.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
