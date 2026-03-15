import { Competitor } from '../../domain/entities/Competitor';
import { ICompetitorRepository } from '../../domain/repositories/ICompetitorRepository';

interface GetCompetitorsInput {
  state?: string;
}

export class GetCompetitors {
  constructor(private readonly competitorRepository: ICompetitorRepository) {}

  async execute(input: GetCompetitorsInput = {}): Promise<Competitor[]> {
    if (input.state) {
      return await this.competitorRepository.findByState(input.state);
    }
    return await this.competitorRepository.findAll();
  }
}
