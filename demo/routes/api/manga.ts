import { Context } from "$naxtjs/types/args.ts";
import { mangas } from './../../private/mangas.ts';


export default function Manga(context: Context) {

  return context.json({
    name: mangas[Math.floor(Math.random() * mangas.length)],
  });
}
