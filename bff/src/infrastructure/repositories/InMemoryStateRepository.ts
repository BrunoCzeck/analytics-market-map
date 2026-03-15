import { State } from '../../domain/entities/State';
import { IStateRepository } from '../../domain/repositories/IStateRepository';
import { statesMock } from '../mock-data/states';

export class InMemoryStateRepository implements IStateRepository {
  private states: State[] = statesMock;

  async findAll(): Promise<State[]> {
    return this.states;
  }

  async findByUf(uf: string): Promise<State | null> {
    return this.states.find(s => s.uf === uf) ?? null;
  }

  async findByRegion(region: string): Promise<State[]> {
    return this.states.filter(s => s.region === region);
  }
}
