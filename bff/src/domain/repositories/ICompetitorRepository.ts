import { Competitor } from '../entities';

export interface ICompetitorRepository {
  findAll(): Promise<Competitor[]>;
  findByState(uf: string): Promise<Competitor[]>;
}
