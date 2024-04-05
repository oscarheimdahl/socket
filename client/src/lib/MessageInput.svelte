<script lang="ts">
  import { TOPICS } from '@root/topics';
  import SendButton from './SendButton.svelte';

  import { onTopic, send } from './socket/socket';
  import { addMessage, subscribe } from './store/store';

  let input: HTMLInputElement;
  let displayName = '';
  let typeIndicators: string[] = [];

  subscribe((store) => {
    displayName = store.displayName;
  });

  async function handleClick() {
    if (!input.value.trim()) return;
    send(TOPICS.NEW_MESSAGE, input.value);
    addMessage({
      sentBy: 'self',
      senderId: 'self',
      message: input.value,
      senderName: displayName,
    });
    input.value = '';
    input.focus();
  }

  function handleInput() {
    send(TOPICS.USER_TYPE);
  }

  let clearTypeindicators: NodeJS.Timeout;
  onTopic(TOPICS.USER_TYPE, () => {
    clearTimeout(clearTypeindicators);
    const randomInt = Math.floor(Math.random() * 5);
    const colors = [
      '#DA47EF44',
      '#A955F744',
      '#3C82F644',
      '#EC489944',
      '#6B728044',
    ];
    typeIndicators = [...typeIndicators, colors[randomInt]];

    clearTypeindicators = setTimeout(() => {
      typeIndicators = [];
    }, 1000);
  });
</script>

<form
  on:submit|preventDefault={handleClick}
  class="group relative flex w-full gap-2"
>
  <input
    on:input={handleInput}
    class="rounded-none w-full outline-none p-1 bg-black text-white border border-gray-500"
    bind:this={input}
    type="text"
  />
  {#each typeIndicators as color}
    <div class={`-z-10 absolute pointer-events-none w-full h-full`}>
      <div
        style={`--color:${color}`}
        class="type-indicator absolute top-1/2 size-0 left-0"
      ></div>
      <div
        style={`--color:${color}`}
        class="type-indicator absolute top-1/2 size-0 right-0"
      ></div>
    </div>
  {/each}
  <SendButton />
</form>

<style>
  .type-indicator {
    box-shadow: 0px 0px 10px 5px var(--color);
    animation: grow 1s 1 ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes grow {
    0% {
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>
