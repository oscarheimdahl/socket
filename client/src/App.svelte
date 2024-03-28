<script lang="ts">
  async function handleClick() {
    const socket = new WebSocket('ws://localhost:8080/connect');

    socket.addEventListener('open', (event) => {
      socket.send('Hello Server!');
    });

    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
    });

    setTimeout(() => {
      socket.send('Hello Server!');
    }, 2000);
  }
</script>

<main>
  <button on:click={handleClick}>Socket</button>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
