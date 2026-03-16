import { Competitor } from '../../domain/entities';
import { ICompetitorRepository } from '../../domain/repositories';
import { competitorsMock } from '../mock-data';

export class InMemoryCompetitorRepository implements ICompetitorRepository {
  private competitors: Competitor[] = competitorsMock;

  async findAll(): Promise<Competitor[]> {
    return this.competitors;
  }

  async findByState(uf: string): Promise<Competitor[]> {
    return this.competitors.filter(c => c.state === uf);
  }
}
