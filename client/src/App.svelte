<script lang="ts">
  type Message = {
    sentBy: 'self' | 'other';
    message: string;
  };
  const socket = new WebSocket('ws://localhost:8080/connect');
  let input = '';
  let messages: Message[] = [];

  socket.addEventListener('open', (event) => {
    socket.send('1');
  });

  socket.addEventListener('message', (event) => {
    if (event.data === '1')
      return (messages = messages.concat({
        sentBy: 'other',
        message: 'Someone joined!',
      }));
    if (event.data === '2')
      return (messages = messages.concat({
        sentBy: 'other',
        message: 'Someone Left!',
      }));
    messages = messages.concat({
      sentBy: 'other',
      message: event.data,
    });
  });

  async function handleClick() {
    socket.send(input);
    messages = messages.concat({
      sentBy: 'self',
      message: input,
    });
    input = '';
  }
</script>

<main>
  <div class="container">
    <div class="messages">
      {#each messages as message}
        <p class={message.sentBy}>{message.message}</p>
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
    flex-direction: column;
    justify-items: flex-end;
  }
  .messages p:first-child {
    margin-top: auto;
  }
  .messages p.self {
    text-align: right;
  }
</style>
