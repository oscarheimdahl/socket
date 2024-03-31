<div
  class="opacity-100 sm:opacity-30 transition-opacity bg z-0 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
>
  <div class="shadow-blur"></div>
  <div class="shadow-blur-2"></div>
  <div class="shadow-blur-3"></div>
  <div class="shadow-blur-4"></div>
  <div class="shadow-blur-5"></div>
</div>

<style>
  .bg {
    animation: spin 10s linear infinite;
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
    box-shadow: 100px 0px 300px 130px rgba(180, 16, 217, 0.8);
  }
  .shadow-blur-2 {
    box-shadow: 100px 50px 600px 130px rgba(248, 8, 8, 0.8);
  }
  .shadow-blur-3 {
    box-shadow: -100px -50px 300px 130px rgba(147, 16, 217, 0.8);
  }
  .shadow-blur-4 {
    box-shadow: -100px 70px 500px 130px rgba(170, 16, 217, 0.8);
  }
  .shadow-blur-5 {
    box-shadow: 0 -100px 1000px 130px rgba(80, 8, 248, 0.5);
  }
</style>
