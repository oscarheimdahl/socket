import { writable } from 'svelte/store';
import type { Message } from '../types';

export const messageStore = writable<{
  messages: Message[];
  displayName: string;
  userId: string;
}>({
  messages: [],
  displayName: '',
  userId: '',
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

export function setUserId(userId: string) {
  messageStore.update((self) => {
    if (self.userId) return self;
    return {
      ...self,
      userId,
    };
  });
}
