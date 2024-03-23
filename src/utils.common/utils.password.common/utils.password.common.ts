import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ExceptionResponseDetail } from '../utils.exception.common/utils.exception.common';

export class Password {
  private password: string;

  constructor(password?: string) {
    this.password = password;
  }

  static async bcryptPassword(password: string): Promise<string> {
    if (!password) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          'password không hợp lệ!',
        ),
        HttpStatus.OK,
      );
    } else {
      const saltRound: number = 10;
      const salt: string = await bcrypt.genSaltSync(saltRound);
      const hash: string = await bcrypt.hashSync(password, salt);
      return hash;
    }
  }

  /**
   *
   * @param password là password nguyên bản mà client nhập (ví dụ: 123456)
   * @param bcryptPassword là password đã được mã hóa thành bcrypt
   * @returns boolean
   */
  static async comparePassword(
    password: string,
    bcryptPassword: string,
  ): Promise<boolean> {
    if (!password || !bcryptPassword) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          'password không hợp lệ!',
        ),
        HttpStatus.OK,
      );
    } else {
      const comParePassword: boolean = await bcrypt.compareSync(
        password,
        bcryptPassword,
      );
      return comParePassword;
    }
  }
}
