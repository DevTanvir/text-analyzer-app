import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Text } from '../entities/text.entity';

@Injectable()
export class TextRepository extends Repository<Text> {
  constructor(private dataSource: DataSource) {
    super(Text, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<Text> {
    const text = await this.findOne({ where: { id } });
    if (!text) {
      throw new NotFoundException();
    }

    return text;
  }
}
