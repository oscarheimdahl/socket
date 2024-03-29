export type Message = {
  sentBy: 'self' | 'other';
  message: string;
  senderName: string; //sender's name
  senderId: string;
};
