import { Competitor } from '../../domain/entities/Competitor';
import { ICompetitorRepository } from '../../domain/repositories/ICompetitorRepository';
import { competitorsMock } from '../mock-data/competitors';

export class InMemoryCompetitorRepository implements ICompetitorRepository {
  private competitors: Competitor[] = competitorsMock;

  async findAll(): Promise<Competitor[]> {
    return this.competitors;
  }

  async findByState(uf: string): Promise<Competitor[]> {
    return this.competitors.filter(c => c.state === uf);
  }
}
