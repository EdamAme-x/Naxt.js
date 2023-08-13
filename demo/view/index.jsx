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
        <Icon class="icon" width={240} />
        <div class="icon-shadow"></div>
        <div class="icon-shadow2"></div>
      </div>
      <div class="howtodo-container">
        <a href="https://github.com/edamame-x/naxt.js" class="howtodo">
          <h2>Naxt.js GitHub Repository</h2>
          <div class="howtodo-contents">
            <p>
              We would be happy if you could press the star ★.
            </p>
            <div class="howtodo-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                strokewidth="2"
                class="tabler-icon tabler-icon-brand-github"
              >
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5">
                </path>
              </svg>
            </div>
            <p>
              Please also do Contribute.
            </p>
          </div>
        </a>
      </div>
    </>
  );
}
