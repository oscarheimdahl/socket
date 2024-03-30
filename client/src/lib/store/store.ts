import { writable } from 'svelte/store';
import type { Message } from '../types';

export const messageStore = writable<{
  messages: Message[];
  displayName: string;
}>({
  messages: [],
  displayName: '',
});

export const subscribe = messageStore.subscribe;

export function addMessage(message: Message) {
  messageStore.update((self) => ({
    ...self,
    messages: [...self.messages, message],
  }));
}

export function updateDisplayName(displayName: string) {
  messageStore.update((self) => ({
    ...self,
    displayName,
  }));
}
