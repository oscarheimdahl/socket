<script lang="ts">
  import MessageBubble from './MessageBubble.svelte';
  import { TOPICS } from '../../../topics';
  import { onTopic } from './socket';
  import type { Message } from './types';
  import { addMessage, subscribe } from './store/store';

  let messageDiv: HTMLDivElement;
  let messages: Message[] = [];

  subscribe((store) => {
    messages = store.messages;
    scrollToBottom();
  });

  onTopic(TOPICS.NEW_MESSAGE, (data) => {
    console.log(`adding`);
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
</script>

<div
  bind:this={messageDiv}
  class="h-96 scroll-smooth w-full no-scrollbar bg-black border-gray-500 border p-4 overflow-y-scroll flex flex-col gap-2"
>
  {#each messages as message, i}
    <MessageBubble
      sameSenderAsPreviousMessage={message.senderId ===
        messages[i - 1]?.senderId}
      {message}
    />
  {/each}
</div>
