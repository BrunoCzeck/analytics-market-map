import { Competitor } from '../entities/Competitor';

export interface ICompetitorRepository {
  findAll(): Promise<Competitor[]>;
  findByState(uf: string): Promise<Competitor[]>;
}
