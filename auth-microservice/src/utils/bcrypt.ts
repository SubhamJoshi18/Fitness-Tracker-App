import bcrypt from 'bcrypt';

class BcryptUtils {
  private async genSalt() {
    return await bcrypt.genSalt(10);
  }

  public async hashPassword(password: string) {
    const salt = await this.genSalt();
    console.log('This is a salt', salt);
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(oldPassword: string, newPassword: string) {
    return await bcrypt.compare(newPassword, oldPassword);
  }
}

export default new BcryptUtils();
