import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { writeFile, mkdir } from 'fs/promises';

@Injectable()
export class UploadsService {
  private readonly uploadPath: string;

  constructor() {
    this.uploadPath = join(process.cwd(), 'uploads');
  }

  async create(image: {
    fileName: string;
    fileType: string;
    body: Buffer;
  }): Promise<{ name: string }> {
    const name = `${randomUUID()}${extname(image.fileName)}`;
    const filePath = join(this.uploadPath, name);

    try {
      await mkdir(this.uploadPath, { recursive: true });

      await writeFile(filePath, image.body);

      return { name };
    } catch (error) {
      throw new InternalServerErrorException(`File upload failed: ${error.message}`);
    }
  }
}