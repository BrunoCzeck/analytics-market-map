import { State } from '../entities';

export interface IStateRepository {
  findAll(): Promise<State[]>;
  findByUf(uf: string): Promise<State | null>;
  findByRegion(region: string): Promise<State[]>;
}
