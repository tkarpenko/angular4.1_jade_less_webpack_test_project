import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let channels = [
      {id: 1, name: 'Item 1', price: '$19', favourite: false, archived: true},
      {id: 2, name: 'Item 2', price: '$23', favourite: true, archived: true},
      {id: 3, name: 'Item 3', price: '$60', favourite: false, archived: true},
      {id: 4, name: 'Item Arc 1', price: '$19', favourite: false, archived: false},
      {id: 5, name: 'Item Arc 2', price: '$23', favourite: true, archived: false},
      {id: 6, name: 'Item Arc 3', price: '$60', favourite: false, archived: false}
    ];

    let channelStat = [
      {
        'date' : '2017-04-19 02:00:00',
        'channel_id': 1,
        'requests': 590,
        'revenue': 5.4870001125336
      },
      {
        'date' : '2017-04-19 03:00:00',
        'channel_id': 2,
        'requests': 500,
        'revenue': 6.4870001125336
      },
      {
        'date' : '2017-04-19 04:00:00',
        'channel_id': 3,
        'requests': 520,
        'revenue': 4.4870001125336
      },
      {
        'date' : '2017-04-19 05:00:00',
        'channel_id': 4,
        'requests': 700,
        'revenue': 5.1870001125336
      },
      {
        'date' : '2017-04-19 06:00:00',
        'channel_id': 3,
        'requests': 980,
        'revenue': 3.4870001125336
      },
      {
        'date' : '2017-04-19 07:00:00',
        'channel_id': 4,
        'requests': 300,
        'revenue': 4.2070001125336
      },
      {
        'date' : '2017-04-19 08:00:00',
        'channel_id': 3,
        'requests': 400,
        'revenue': 6.0070001125336
      },
      {
        'date' : '2017-04-19 09:00:00',
        'channel_id': 6,
        'requests': 680,
        'revenue': 2.4870001125336
      }
    ];

    return { channels, channelStat };
  }
}
