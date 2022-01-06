import axios from 'axios';
import { Result } from "RandomUser"

export interface IRandomUserService {
  Get: (count: number) => Promise<any>;
}

export class RandomUserService implements IRandomUserService {
  private static Instance: RandomUserService;

  public Get = async (count: number): Promise<any> => {
    const res = await axios.get<Result>(`https://randomuser.me/api/?nat=tr&results=${count}`);
    return res.data.results;
  };

  public static getInstance() {
    if (!RandomUserService.Instance) {
      RandomUserService.Instance = new RandomUserService();
    }

    return RandomUserService.Instance;
  }
}

export default RandomUserService.getInstance();

