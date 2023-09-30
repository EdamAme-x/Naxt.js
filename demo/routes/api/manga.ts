import { Context } from "$naxtjs/types/args.ts";

const mangas = [
  "Naruto",
  "One Piece",
  "Dragon Ball",
  "Hunter x Hunter",
  "Bleach",
  "Death Note",
];

export default function Manga(context: Context) {

  return context.json({
    name: mangas[Math.floor(Math.random() * mangas.length)],
  });
}
