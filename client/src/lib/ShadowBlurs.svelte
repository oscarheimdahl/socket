<div class="bg z-0 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
  <div class="shadow-blur shadow-blur-1"></div>
  <div class="shadow-blur shadow-blur-2"></div>
  <div class="shadow-blur shadow-blur-3"></div>
  <div class="shadow-blur shadow-blur-4"></div>
  <div class="shadow-blur shadow-blur-5"></div>
</div>

<style>
  :root {
    --shadow-spread: 90px;
    --shadow-opacity: 1;
    --shadow-blur: 200px;
  }

  @media (min-width: 640px) {
    :root {
      --shadow-spread: 230px;
      --shadow-opacity: 0.1;
      --shadow-blur: 500px;
    }
  }

  .bg {
    animation: spin 50s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .shadow-blur {
    transition: box-shadow 0.5s;
  }

  .shadow-blur-1 {
    box-shadow: 100px 0px var(--shadow-blur) var(--shadow-spread)
      rgba(180, 16, 217, var(--shadow-opacity));
  }
  .shadow-blur-2 {
    box-shadow: 100px 50px var(--shadow-blur) var(--shadow-spread)
      rgba(248, 8, 8, var(--shadow-opacity));
  }
  .shadow-blur-3 {
    box-shadow: -100px -50px var(--shadow-blur) var(--shadow-spread) rgba(147, 16, 217, var(--shadow-opacity));
  }
  .shadow-blur-4 {
    box-shadow: -100px 70px var(--shadow-blur) var(--shadow-spread)
      rgba(170, 16, 217, var(--shadow-opacity));
  }
  .shadow-blur-5 {
    box-shadow: 0 -100px var(--shadow-blur) var(--shadow-spread) rgba(80, 8, 248, var(--shadow-opacity));
  }
</style>
