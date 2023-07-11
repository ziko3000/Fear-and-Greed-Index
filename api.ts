import axios from 'axios';

export class FearGreedIndexAPI {
  async getFearGreedIndex() {
    const response = await axios.get('https://api.alternative.me/fng/');
    const fearGreedIndex = response.data.data[0].value;
    return fearGreedIndex;
  }
}


