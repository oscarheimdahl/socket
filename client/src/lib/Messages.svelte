<script lang="ts">
  import MessageBubble from './MessageBubble.svelte';
  import { TOPICS } from '@root/topics';
  import { onTopic } from './socket';
  import type { Message } from './types';
  import { addMessage, subscribe } from './store/store';
  import { onMount } from 'svelte';

  let messageDiv: HTMLDivElement;
  let messages: Message[] = [];

  subscribe((store) => {
    messages = store.messages;
    scrollToBottom();
  });

  onTopic(TOPICS.NEW_MESSAGE, (data) => {
    addMessage({
      sentBy: 'other',
      senderName: data.from,
      senderId: data.senderId,
      message: data.message,
    });
  });

  function scrollToBottom() {
    if (!messageDiv) return;
    setTimeout(() => {
      messageDiv.scrollTop = messageDiv.scrollHeight;
    }, 0);
  }
  onMount(scrollToBottom);
</script>

<div
  bind:this={messageDiv}
  class="message-box relative bg-[#000000aa] sm:bg-black transition-all h-96 scroll-smooth w-full no-scrollbar border-gray-500 border overflow-y-scroll p-3 flex flex-col gap-2"
>
  <div class="h-96 shrink-0 w-full"></div>
  {#each messages as message, i}
    <MessageBubble
      sameSenderAsPreviousMessage={message.senderId ===
        messages[i - 1]?.senderId}
      {message}
    />
  {/each}
</div>

<style>
  /* .message-box::after {
    content: '';
    z-index: -1;
    animation: pulse 3s infinite;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0rem;
    left: 0rem;
    background: radial-gradient(
      circle at 50% 140%,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0) 50%
    );
  } */

  @keyframes pulse {
    0% {
      /* transform: scale(0.9); */
      /* opacity: 0.6; */
    }
    50% {
      /* transform: scale(0.9); */
      opacity: 0.6;
    }
    50% {
      /* transform: scale(0.9); */
      /* opacity: 0.6; */
    }
  }
</style>
