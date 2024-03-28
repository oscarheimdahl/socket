<script lang="ts">
  const socket = new WebSocket('ws://localhost:8080/connect');
  let input = '';
  let messages: string[] = [];

  socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
  });

  socket.addEventListener('message', (event) => {
    messages = messages.concat(event.data);
  });

  async function handleClick() {
    socket.send(input);
    messages = messages.concat(input);
    input = '';
  }
</script>

<main>
  <div class="container">
    <div class="messages">
      {#each messages as message}
        <p>{message}</p>
      {/each}
    </div>
    <div>
      <input bind:value={input} type="text" />
      <button on:click={handleClick}>Socket</button>
    </div>
  </div>
</main>

<style>
  main {
    display: grid;
    place-items: center;
    height: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }
  .messages {
    height: 20rem;
    overflow: scroll;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
