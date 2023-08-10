import Icon from "../components/icon.jsx";
import { Head } from "naxtjs/runtime/mod.ts";

export default function index() {
  return (
    <>
      <Head>
        <title>Home | NaxtJS</title>
        <meta name="description" content="NaxtJS App" />
      </Head>
      <div class="title-container">
        <h1 class="title">
          Welcome to Naxt.js
          <span class="title-emoji">👋</span>
        </h1>
      </div>
      <div class="icon-container">
        <Icon />
      </div>
    </>
  );
}
