import axiod, {type IAxiodResponse} from "https://deno.land/x/axiod/mod.ts";
import { logger } from "../deps.ts";

/**
 * FearGreedIndexAPI class for fetching the Fear and Greed Index from the alternative.me API.
 */
export class FearGreedIndexAPI {
  static APIurl: string = 'https://api.alternative.me/fng/';

  /**
   * Static method to fetch the Fear and Greed Index.
   * @returns {Promise<string>} The Fear and Greed Index.
   * @throws {Error} When unable to fetch the index.
   */
  static async getFearGreedIndex(): Promise<string> {
    try {
      // Fetch the Fear and Greed Index from the alternative.me API
      const response: IAxiodResponse = await axiod.get(this.APIurl);
      const fearGreedIndex: string = response.data.data[0].value;
      logger.info(`Fear and Greed Index: ${fearGreedIndex}`);

      // Check if fearGreedIndex is a number
      if (isNaN(Number(fearGreedIndex))) {
        throw new Error(`Fear and Greed Index is not a number: ${fearGreedIndex}`);
      }

      return fearGreedIndex;
    } catch (error) {
      console.error(error);
    }
  }
}

// (async () => {
//   const fearGreedIndex = await FearGreedIndexAPI.getFearGreedIndex();
//   console.log(`Fear and Greed Index: ${fearGreedIndex}`);
// })();