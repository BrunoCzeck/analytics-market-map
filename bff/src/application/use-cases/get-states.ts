import { State } from '../../domain/entities/state';
import { IStateRepository } from '../../domain/repositories/IStateRepository';

interface GetStatesInput {
  region?: string;
  uf?: string;
}

export class GetStates {
  constructor(private readonly stateRepository: IStateRepository) {}

  async execute(input: GetStatesInput = {}): Promise<State | State[]> {
    if (input.uf) {
      return await this.stateRepository.findByUf(input.uf) ?? [];
    }
    if (input.region) {
      return await this.stateRepository.findByRegion(input.region);
    }
    return await this.stateRepository.findAll();
  }
}
