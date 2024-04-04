export type Message = {
  sentBy: 'self' | 'other';
  message: string;
  senderName: string; //sender's name
  senderId: string;
};

export type User = {
  name: string;
  id: string;
};
