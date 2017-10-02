export class Channel {
  id: number;
  name: string;
  favourite: boolean;
  archived: boolean;

  constructor(channel?: any) {
    if (!channel) channel = {};

    this.id = +channel.id;
    this.name = channel.name;
    this.archived = channel.archived;
    this.favourite = channel.favourite;
  }
}
